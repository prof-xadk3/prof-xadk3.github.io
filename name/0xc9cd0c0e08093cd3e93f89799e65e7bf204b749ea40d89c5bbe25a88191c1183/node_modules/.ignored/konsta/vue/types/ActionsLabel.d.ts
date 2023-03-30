import { ComponentOptionsMixin, DefineComponent, PropType, StyleValue, Ref } from 'vue';

declare const ActionsLabel: DefineComponent<
  {
    
    /**
     * Component's HTML Element
     */
    component: {
      type: StringConstructor;
      default: 'div';
    };

    /**
     * Button text font size in iOS theme
     */
    fontSizeIos: {
      type: StringConstructor;
      default: 'text-sm';
    };

    /**
     * Button text font size in Material theme
     */
    fontSizeMaterial: {
      type: StringConstructor;
      default: 'text-sm';
    };

    /**
     * Renders button outer hairlines (borders). If not specified, will be enabled in iOS theme
     */
    dividers: {
      type: BooleanConstructor;
      default: undefined;
    };

    /**
     * Object with Tailwind CSS colors classes
     */
    colors: {
      type: PropType<{
    
        /**
         *
         * @default 'bg-white dark:bg-neutral-800'
         */
        bgIos?: string;
        /**
         *
         * @default 'bg-md-light-surface-3 dark:bg-md-dark-surface-3'
         */
        bgMaterial?: string;
        /**
         *
         * @default 'text-black text-opacity-55 dark:text-white dark:text-opacity-55'
         */
        textIos?: string;
        /**
         *
         * @default 'text-md-light-primary dark:text-md-dark-primary'
         */
        textMaterial?: string;
      
      }>;
      
    };
  },
  () => JSX.Element,
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {
    
  }
>;

export default ActionsLabel;