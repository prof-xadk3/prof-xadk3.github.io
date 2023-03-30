import { ComponentOptionsMixin, DefineComponent, PropType, StyleValue, Ref } from 'vue';

declare const Preloader: DefineComponent<
  {
    
    /**
     * Component's HTML Element
     */
    component: {
      type: StringConstructor;
      default: 'span';
    };

    /**
     * Tailwind CSS size classes
     */
    size: {
      type: StringConstructor;
      default: 'w-8 h-8';
    };

    /**
     * Object with Tailwind CSS colors classes
     */
    colors: {
      type: PropType<{
    
        /**
         *
         * @default 'text-primary'
         */
        iconIos?: string;
        /**
         *
         * @default 'text-md-light-primary dark:text-md-dark-primary'
         */
        iconMaterial?: string;
      
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

export default Preloader;