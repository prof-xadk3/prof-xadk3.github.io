import { ComponentOptionsMixin, DefineComponent, PropType, StyleValue, Ref } from 'vue';

declare const Toggle: DefineComponent<
  {
    
    /**
     * Component's HTML Element
     */
    component: {
      type: StringConstructor;
      default: 'label';
    };

    /**
     * Defines whether the toggle input is checked or not, for the case if it is uncontrolled component
     */
    defaultChecked: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Defines whether the toggle input is checked or not
     */
    checked: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Toggle input name
     */
    name: {
      type: StringConstructor;
      
    };

    /**
     * Toggle input value
     */
    value: {
      type: any;
      
    };

    /**
     * Defines whether the toggle input is disabled or not
     */
    disabled: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Defines whether the toggle input is readonly or not
     */
    readonly: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Enables touch ripple effect in Material theme
     */
    touchRipple: {
      type: BooleanConstructor;
      default: true;
    };

    /**
     * Object with Tailwind CSS colors classes
     */
    colors: {
      type: PropType<{
    
        /**
         *
         * @default 'bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-20'
         */
        bgIos?: string;
        /**
         *
         * @default 'bg-primary'
         */
        checkedBgIos?: string;
        /**
         *
         * @default 'bg-white'
         */
        thumbBgIos?: string;
        /**
         *
         * @default 'bg-white'
         */
        checkedThumbBgIos?: string;
        /**
         *
         * @default 'bg-md-light-surface-variant dark:bg-md-dark-surface-variant'
         */
        bgMaterial?: string;
        /**
         *
         * @default 'bg-md-light-primary dark:bg-md-dark-primary'
         */
        checkedBgMaterial?: string;
        /**
         *
         * @default 'border-md-light-outline dark:border-md-dark-outline'
         */
        borderMaterial?: string;
        /**
         *
         * @default 'border-md-light-primary dark:border-md-dark-primary'
         */
        checkedBorderMaterial?: string;
        /**
         *
         * @default 'bg-md-light-outline dark:bg-md-dark-outline'
         */
        thumbBgMaterial?: string;
        /**
         *
         * @default 'bg-md-light-on-primary dark:bg-md-dark-on-primary'
         */
        checkedThumbBgMaterial?: string;
      
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
    
    /**
     * Toggle input `change` event handler
     */
    change: (e: any) => void;
    
  }
>;

export default Toggle;