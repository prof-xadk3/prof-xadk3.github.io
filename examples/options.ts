import { args, FiniteNumber, Choice, Option, EarlyExitFlag, PARSE_FAILURE } from '../lib/index.ts'

const parser = args
  .describe('Add or subtract two numbers')
  .with(
    EarlyExitFlag('help', {
      describe: 'Show help',
      exit() {
        console.log(parser.help())
        return Deno.exit()
      },
    }),
  )
  .with(
    Option('a', {
      type: FiniteNumber,
      describe: 'Value of a',
    }),
  )
  .with(
    Option('b', {
      type: FiniteNumber,
      describe: 'Value of b',
    }),
  )
  .with(
    Option('operator', {
      type: Choice<'add' | 'sub'>(
        {
          value: 'add',
          describe: 'Add two numbers',
        },
        {
          value: 'sub',
          describe: 'Subtract two numbers',
        },
      ),
      alias: ['o'],
      describe: 'Operator to use',
    }),
  )

const res = parser.parse(Deno.args)

if (res.tag === PARSE_FAILURE) { // Alternatively, `if (res.error) {`
  console.error('Failed to parse CLI arguments')
  console.error(res.error.toString())
  Deno.exit(1)
} else {
  const { a, b, operator } = res.value
  switch (operator) {
    case 'add':
      console.log(a + b)
      break
    case 'sub':
      console.log(a - b)
      break
  }
}
