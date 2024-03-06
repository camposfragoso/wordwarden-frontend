import { Extension } from '@tiptap/core';

export const CustomHighlight = Extension.create({
  name: 'customHighlight',
  defaultOptions: {
    types: ['textStyle'],
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          highlightColor: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.highlightColor) {
                return {};
              }
              return {
                style: `background-color: ${attributes.highlightColor}`,
              };
            },
            parseHTML: element => ({
              highlightColor: element.style.backgroundColor,
            }),
          },
          hoverTitle: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.hoverTitle) {
                return {};
              }
              return {
                title: attributes.hoverTitle,
              };
            },
            parseHTML: element => ({
              hoverTitle: element.getAttribute('title'),
            }),
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setHighlight: options => ({ chain }) => {
        return chain().setMark('textStyle', options).run();
      },
      unsetHighlight: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { highlightColor: null, hoverTitle: null })
          .removeEmptyTextStyle()
          .run();
      },
    };
  },
});
