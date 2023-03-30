import { ComponentOptionsMixin, DefineComponent, PropType, StyleValue, Ref } from 'vue';

declare const Dialog: DefineComponent<
  {
    
    /**
     * Component's HTML Element
     */
    component: {
      type: StringConstructor;
      default: 'div';
    };

    /**
     * Tailwind CSS size classes for iOS theme
     */
    sizeIos: {
      type: StringConstructor;
      default: 'w-[16.875rem]';
    };

    /**
     * Tailwind CSS size classes for Material theme
     */
    sizeMaterial: {
      type: StringConstructor;
      default: 'w-[19.5rem]';
    };

    /**
     * Tailwind CSS classes for title font size iOS theme
     */
    titleFontSizeIos: {
      type: StringConstructor;
      default: 'text-[18px]';
    };

    /**
     * Tailwind CSS classes for title font size Material theme
     */
    titleFontSizeMaterial: {
      type: StringConstructor;
      default: 'text-[24px]';
    };

    /**
     * Makes Dialog background translucent (with `backdrop-filter: blur`) in iOS theme
     */
    translucent: {
      type: BooleanConstructor;
      default: true;
    };

    /**
     * Dialog title content
     */
    title: {
      type: PropType<string | number>;
      
    };

    /**
     * Dialog main content
     */
    content: {
      type: PropType<string | number>;
      
    };

    /**
     * Dialog buttons content
     */
    buttons: {
      type: PropType<string | number>;
      
    };

    /**
     * Allows to open/close Popup and set its initial state
     */
    opened: {
      type: BooleanConstructor;
      default: false;
    };

    /**
     * Enables Popup backdrop (dark semi transparent layer behind)
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
         * Dialog bg color in iOS theme
         *
         * @default 'bg-white dark:bg-neutral-800'
         */
        bgIos?: string;
        /**
         * Dialog bg color in iOS theme
         *
         * @default 'bg-md-light-surface-3 dark:bg-md-dark-surface-3'
         */
        bgMaterial?: string;
        /**
         * Title text color in iOS theme
         *
         * @default ''
         */
        titleIos?: string;
        /**
         * Title text color in Material theme
         *
         * @default 'text-md-light-on-surface dark:text-md-dark-on-surface'
         */
        titleMaterial?: string;
        /**
         * Content text color in iOS theme
         *
         * @default ''
         */
        contentTextIos?: string;
        /**
         * Content text color in Material theme
         *
         * @default 'text-md-light-on-surface-variant dark:text-md-dark-on-surface-variant'
         */
        contentTextMaterial?: string;
      
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

export default Dialog;