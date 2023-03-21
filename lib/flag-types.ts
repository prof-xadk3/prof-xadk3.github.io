import { once } from './deps.ts'
import { MissingFlag, ConflictFlags, MissingValue, UnexpectedFlag, ValueParsingFailure } from './flag-errors.ts'
import { FlagType, ValueType, ArgvItem } from './types.ts'
import { ok, err, flagPrefix, findFlags } from './utils.ts'

const listFlags = <Name extends string>(
  name: Name,
  descriptor: {
    readonly alias?: Iterable<string>
  },
): [Name, ...string[]] => [name, ...descriptor.alias || []]

const fmtTitle = (name: string, descriptor: {
  readonly alias?: Iterable<string>
}): string =>
  listFlags(name, descriptor)
    .map(flag => flagPrefix(flag) + flag)
    .join(', ')

const fmtTypeHelp = (help?: () => string) => help ? '\n' + help() : ''

type FlagHelpFunc = FlagType<any, any>['help']
const FlagHelpFunc = (
  name: string,
  descriptor: {
    readonly alias?: readonly string[]
    readonly describe?: string
  },
): FlagHelpFunc =>
  once(() => ({
    title: fmtTitle(name, descriptor),
    description: descriptor.describe,
  }))

const sharedProps = (
  typeName: string,
  descriptor?: {
    readonly type: ValueType<any, any>
  },
) => ({
  [Symbol.toStringTag]: typeName + (
    descriptor ? `(${descriptor.type[Symbol.toStringTag]})` : ''
  ),
})

interface FlagDescriptorSharedProps {
  /** Flag aliases */
  readonly alias?: readonly string[]
  /** Flag description */
  readonly describe?: string
}

/**
 * Declare a flag that terminates the program
 */
export const EarlyExitFlag = <Name extends string>(
  name: Name,
  descriptor: EarlyExitDescriptor,
): FlagType<Name, void> => ({
  name,
  extract(args) {
    const findRes = findFlags(args, listFlags(name, descriptor))
    if (findRes.length) return descriptor.exit()
    return ok({ value: undefined, consumedFlags: new Set<never>() })
  },
  help: FlagHelpFunc(name, descriptor),
  ...sharedProps('EarlyExitFlag'),
})

/**
 * Interface of descriptor of {@link EarlyExitFlag}
 */
export interface EarlyExitDescriptor extends FlagDescriptorSharedProps {
  /**
   * Exit function to call
   */
  readonly exit: () => never
}

/**
 * Declare a binary flag:
 * * value is `true` if the flag is found in argument list once or multiple times
 * * value is `false` if the flag isn't found in argument list
 */
export const BinaryFlag = <Name extends string>(
  name: Name,
  descriptor: FlagDescriptor = {},
): FlagType<Name, boolean> => ({
  name,
  extract(args) {
    const findRes = findFlags(args, listFlags(name, descriptor))
    return ok({
      value: Boolean(findRes.length),
      consumedFlags: new Set(findRes),
    })
  },
  help: FlagHelpFunc(name, descriptor),
  ...sharedProps('BinaryFlag'),
})

export { BinaryFlag as Flag }

/**
 * Declare a count flag: Value is number of occurrences
 */
export const CountFlag = <Name extends string>(
  name: Name,
  descriptor: FlagDescriptor = {},
): FlagType<Name, number> => ({
  name,
  extract(args) {
    const allNames = listFlags(name, descriptor)
    const findRes = findFlags(args, allNames)
    const value = findRes
      .map(flag =>
        flag.type === 'single-flag' ? 1 : flag.name
          .filter(name => allNames.includes(name))
          .length
      )
      .reduce((acc, cur) => acc + cur, 0)
    return ok({
      value,
      consumedFlags: new Set(findRes),
    })
  },
  help: FlagHelpFunc(name, descriptor),
  ...sharedProps('CountFlag'),
})

/**
 * Interface of descriptor of {@link BinaryFlag} and {@link CountFlag}
 */
export interface FlagDescriptor extends FlagDescriptorSharedProps {}

/**
 * Declare an option, including:
 * * A flag
 * * A value right after the flag
 */
export const Option = <Name extends string, Value>(
  name: Name,
  descriptor: OptionDescriptor<Value>,
): FlagType<Name, Value> => ({
  name,
  extract(args) {
    const flags = listFlags(name, descriptor)
    const findRes = findFlags(args, flags)
    if (!findRes.length) return err(new MissingFlag(name))
    if (findRes.length !== 1) return err(new ConflictFlags(flags))
    const [res] = findRes
    const valPos = res.index + 1
    if (args.length <= valPos) return err(new MissingValue(res.name))
    const val = args[valPos]
    if (val.type !== 'value') return err(new UnexpectedFlag(res.name, val.raw))
    const parseResult = descriptor.type.extract([val.raw])
    if (!parseResult.tag) {
      return err(new ValueParsingFailure(res.name, parseResult.error))
    }
    return ok({
      value: parseResult.value,
      consumedFlags: new Set([res, val]),
    })
  },
  help: once(() => ({
    title: `${fmtTitle(name, descriptor)} <${descriptor.type.getTypeName()}>`,
    description: (descriptor.describe || '') +
      fmtTypeHelp(descriptor.type.help),
  })),
  ...sharedProps('Option', descriptor),
})

/**
 * Interface of descriptor of {@link Option}
 * @template Value Type of value
 */
export interface OptionDescriptor<Value> extends FlagDescriptorSharedProps {
  /** Value parser and type */
  readonly type: ValueType<Value, [string]>
}

/**
 * Turn an option partial:
 * * If the option does not have a value, return default value
 * * If the option has a value, return that value
 */
export const Partial = <Name extends string, Value, Default>(
  x: FlagType<Name, Value>,
  def: Default,
  descDef: string = String(def),
): FlagType<Name, Value | Default> => ({
  name: x.name,
  extract(args) {
    const result = x.extract(args)
    if (result.tag) return result
    if (result.error instanceof MissingFlag) {
      return ok({
        value: def,
        consumedFlags: new Set<never>(),
      })
    }
    return result
  },
  help: once(() => {
    const { title, description } = x.help()
    return {
      title: `${title} [default: ${descDef}]`,
      description,
    }
  }),
  ...sharedProps(`Partial(${x[Symbol.toStringTag]})`),
})

/**
 * Declare a partial option:
 * * If a value is found, return that value
 * * If not, return default value
 */
export const PartialOption = <Name extends string, Value, Default>(
  name: Name,
  descriptor: PartialOptionDescriptor<Value, Default>,
): FlagType<Name, Value | Default> =>
  Partial(
    Option(name, descriptor),
    descriptor.default,
    descriptor.describeDefault,
  )

/**
 * Interface of descriptor of {@link PartialOption}
 * @template Value Type of value
 * @template Default Type of default value
 */
export interface PartialOptionDescriptor<Value, Default> extends OptionDescriptor<Value> {
  /** Default value */
  readonly default: Default
  /** Default value description */
  readonly describeDefault?: string
}

/**
 * Declare an option that collects value after flags
 *
 * CLI example: `--opt foo --opt bar --opt baz` → `["foo", "bar", "baz"]`
 */
export const CollectOption = <Name extends string, Value>(
  name: Name,
  descriptor: CollectOptionDescriptor<Value>,
): FlagType<Name, Value[]> => ({
  name,
  extract(args) {
    const flags = listFlags(name, descriptor)
    const findRes = findFlags(args, flags)
    const value: Value[] = []
    const consumedFlags = new Set<ArgvItem>()
    // TODO: Return multiple errors at once
    for (const item of findRes) {
      const valPos = item.index + 1
      if (args.length <= valPos) return err(new MissingValue(item.name))
      const val = args[valPos]
      if (val.type !== 'value') {
        return err(new UnexpectedFlag(item.name, val.raw))
      }
      const parseResult = descriptor.type.extract([val.raw])
      if (!parseResult.tag) return parseResult
      value.push(parseResult.value)
      consumedFlags.add(item).add(val)
    }
    return ok({
      value,
      consumedFlags,
    })
  },
  help: once(() => {
    const typeName = descriptor.type.getTypeName()
    const titleSection = `${fmtTitle(name, descriptor)} <${typeName}>`
    const title = `${titleSection} [${titleSection} ...]`
    const description = (descriptor.describe || '') +
      fmtTypeHelp(descriptor.type.help)
    return { title, description }
  }),
  ...sharedProps('CollectOption', descriptor),
})

/**
 * Interface of descriptor of {@link CollectOption}
 * @template Value Type of values
 */
export interface CollectOptionDescriptor<Value> extends OptionDescriptor<Value> {}

/**
 * Declare an option that drains all arguments after the flag
 *
 * CLI example: `--opt abc def ghi` → `['abc', 'def', 'ghi']`
 */
export const DrainOption = <Name extends string, Value>(
  name: Name,
  descriptor: DrainOptionDescriptor<Value>,
): FlagType<Name, Value[]> => ({
  name,
  extract(args) {
    const flags = listFlags(name, descriptor)
    const findRes = findFlags(args, flags)
    if (!findRes.length) {
      return ok({
        value: [],
        consumedFlags: new Set<never>(),
      })
    }
    if (findRes.length !== 1) return err(new ConflictFlags(flags))
    const [res] = findRes
    const consumedFlags = new Set<ArgvItem>([res])
    // TODO: Return multiple errors at once
    const values: Value[] = []
    for (let i = res.index + 1; i < args.length; ++i) {
      const item = args[i]
      if (!descriptor.while(item)) break
      const valRes = descriptor.type.extract([item.raw])
      if (!valRes.tag) return valRes
      values.push(valRes.value)
      consumedFlags.add(item)
    }
    return ok({
      value: values,
      consumedFlags,
    })
  },
  help: once(() => {
    const typeName = descriptor.type.getTypeName()
    const title = `${fmtTitle(name, descriptor)} [${typeName} ...]`
    const description = (descriptor.describe || '') +
      fmtTypeHelp(descriptor.type.help)
    return { title, description }
  }),
  ...sharedProps('CollectOption', descriptor),
})

/**
 * Interface of descriptor of {@link DrainOption}
 * @template Value Type of values
 */
export interface DrainOptionDescriptor<Value> extends OptionDescriptor<Value> {
  /** When to take an argument, it takes all by default */
  readonly while: DrainOptionWhile
}

/** Type of `while` of descriptor of {@link DrainOption} */
export interface DrainOptionWhile {
  /**
   * Filter function
   * @param arg Concerning argument
   * @returns Whether draining should continues
   */
  (arg: ArgvItem): boolean
}

/** Type of return value of {@link DrainOptionFilterFunc} */
export interface DrainOptionFilterReturn {
  /** Whether to take the argument */
  readonly take: boolean
  /** Whether to stop further draining */
  readonly done: boolean
}

/** Set `filter` option to this value to make {@link DrainOption} only consumes all until flags */
export const DRAIN_UNTIL_FLAG: DrainOptionWhile = arg => arg.type === 'value'

/** Set `filter` option to this value make {@link DrainOption} consumes all including flags */
export const DRAIN_ALL: DrainOptionWhile = () => true
