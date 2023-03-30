import { ComponentOptionsMixin, DefineComponent, PropType, StyleValue, Ref } from 'vue';

declare const ActionsButton: DefineComponent<
  {
    
    /**
     * Component's HTML Element
     */
    component: {
      type: StringConstructor;
      default: 'button';
    };

    /**
     * Link's `href` attribute, when specified will also be rendered as `<a>` element
     */
    href: {
      type: StringConstructor;
      
    };

    /**
     * Makes button text bold. Overwrites `boldIos` and `boldMaterial`
     */
    bold: {
      type: BooleanConstructor;
      default: undefined;
    };

    /**
     * Makes button text bold in iOS theme
     */
    boldIos: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Makes button text bold in Material theme
     */
    boldMaterial: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Button text font size in iOS theme
     */
    fontSizeIos: {
      type: StringConstructor;
      default: 'text-xl';
    };

    /**
     * Button text font size in Material theme
     */
    fontSizeMaterial: {
      type: StringConstructor;
      default: 'text-base';
    };

    /**
     * Enables touch ripple effect in Material theme
     */
    touchRipple: {
      type: BooleanConstructor;
      default: true;
    };

    /**
     * Renders button outer hairlines (borders). If not specified, will be enabled for iOS theme
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
         * @default 'active:bg-neutral-200 dark:active:bg-neutral-700'
         */
        activeBgIos?: string;
        /**
         *
         * @default ''
         */
        activeBgMaterial?: string;
        /**
         *
         * @default 'text-primary'
         */
        textIos?: string;
        /**
         *
         * @default 'text-md-light-on-surface dark:text-md-dark-on-surface'
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

export default ActionsButton;