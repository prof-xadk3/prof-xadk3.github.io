import { ComponentOptionsMixin, DefineComponent, PropType, StyleValue, Ref } from 'vue';

declare const Panel: DefineComponent<
  {
    
    /**
     * Component's HTML Element
     */
    component: {
      type: StringConstructor;
      default: 'div';
    };

    /**
     * Tailwind CSS size classes
     */
    size: {
      type: StringConstructor;
      default: 'w-72 h-screen';
    };

    /**
     * Panel side
     */
    side: {
      type: PropType<'left' | 'right'>;
      default: 'left';
    };

    /**
     * Allows to open/close Panel and set its initial state
     */
    opened: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * When enabled opened panel will have extra spaces from sides
     */
    floating: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Enables Panel backdrop (dark semi transparent layer behind)
     */
    backdrop: {
      type: BooleanConstructor;
      default: true;
    };

    /**
     * Object with Tailwind CSS colors classes
     */
    colors: {
      type: PropType<{
    
        /**
         * Panel bg color
         *
         * @default 'bg-white dark:bg-black'
         */
        bg?: string;
      
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
     * Click handler on backdrop element
     */
    backdropclick: (e: any) => void;
    
  }
>;

export default Panel;