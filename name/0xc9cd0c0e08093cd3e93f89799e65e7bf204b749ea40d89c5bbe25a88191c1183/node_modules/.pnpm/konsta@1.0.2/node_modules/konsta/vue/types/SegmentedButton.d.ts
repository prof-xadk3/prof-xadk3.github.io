import { ComponentOptionsMixin, DefineComponent, PropType, StyleValue, Ref } from 'vue';

declare const SegmentedButton: DefineComponent<
  {
    
    /**
     * Component's HTML Element
     */
    component: {
      type: StringConstructor;
      default: 'button';
    };

    /**
     * Highlights button as active
     */
    active: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Makes strong segmented button (should be used within `<Segmented strong>`)
     */
    strong: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Makes segmented button rounded (should be used within `<Segmented rounded>`)
     */
    rounded: {
      type: BooleanConstructor;
      default: false;
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

export default SegmentedButton;