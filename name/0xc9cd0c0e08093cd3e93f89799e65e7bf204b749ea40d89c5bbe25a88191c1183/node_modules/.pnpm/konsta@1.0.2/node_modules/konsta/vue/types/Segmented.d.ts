import { ComponentOptionsMixin, DefineComponent, PropType, StyleValue, Ref } from 'vue';

declare const Segmented: DefineComponent<
  {
    
    /**
     * Component's HTML Element
     */
    component: {
      type: StringConstructor;
      default: 'div';
    };

    /**
     * Makes segmented raised
     */
    raised: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Makes segmented outline
     */
    outline: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Makes segmented strong
     */
    strong: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Makes segmented rounded
     */
    rounded: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Object with Tailwind CSS colors classes
     */
    colors: {
      type: PropType<{
    
        /**
         *
         * @default 'bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-10'
         */
        strongBgIos?: string;
        /**
         *
         * @default 'bg-md-light-surface-variant dark:bg-md-dark-surface-variant'
         */
        strongBgMaterial?: string;
        /**
         *
         * @default 'border-primary'
         */
        borderIos?: string;
        /**
         *
         * @default 'border-md-light-outline dark:border-md-dark-outline'
         */
        borderMaterial?: string;
        /**
         *
         * @default 'divide-primary'
         */
        divideIos?: string;
        /**
         *
         * @default 'divide-md-light-outline dark:divide-md-dark-outline'
         */
        divideMaterial?: string;
      
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

export default Segmented;