import { ComponentOptionsMixin, DefineComponent, PropType, StyleValue, Ref } from 'vue';

declare const Progressbar: DefineComponent<
  {
    
    /**
     * Component's HTML Element
     */
    component: {
      type: StringConstructor;
      default: 'span';
    };

    /**
     * Determinate progress (from 0 to 1)
     */
    progress: {
      type: NumberConstructor;
      default: 0;
    };

    /**
     * Object with Tailwind CSS colors classes
     */
    colors: {
      type: PropType<{
    
        /**
         *
         * @default 'bg-primary'
         */
        bgIos?: string;
        /**
         *
         * @default 'bg-md-light-primary dark:bg-md-dark-primary'
         */
        bgMaterial?: string;
      
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

export default Progressbar;