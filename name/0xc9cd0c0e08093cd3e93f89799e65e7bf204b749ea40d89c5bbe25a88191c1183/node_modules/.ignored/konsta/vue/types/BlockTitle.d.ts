import { ComponentOptionsMixin, DefineComponent, PropType, StyleValue, Ref } from 'vue';

declare const BlockTitle: DefineComponent<
  {
    
    /**
     * Component's HTML Element
     */
    component: {
      type: StringConstructor;
      default: 'div';
    };

    /**
     * Useful to disable when there is no Block or List component right after the Block Title
     */
    withBlock: {
      type: BooleanConstructor;
      default: true;
    };

    /**
     * Medium sized block title
     */
    medium: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Large sized block title
     */
    large: {
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
         * @default ''
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

export default BlockTitle;