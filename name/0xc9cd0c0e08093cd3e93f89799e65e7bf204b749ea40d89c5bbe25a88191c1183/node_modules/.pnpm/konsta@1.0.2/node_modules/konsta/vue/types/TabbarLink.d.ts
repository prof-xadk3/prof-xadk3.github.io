import { ComponentOptionsMixin, DefineComponent, PropType, StyleValue, Ref } from 'vue';

declare const TabbarLink: DefineComponent<
  {
    
    /**
     * Makes this tabbar link active
     */
    active: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Component's HTML Element
     */
    component: {
      type: StringConstructor;
      default: 'a';
    };

    /**
     * Link label content
     */
    label: {
      type: StringConstructor;
      
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

export default TabbarLink;