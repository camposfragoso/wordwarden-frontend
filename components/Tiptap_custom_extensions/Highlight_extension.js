import { Extension, Mark } from '@tiptap/core';

export const CustomHighlightExtension = Mark.create({
  name: 'CustomHighlightExtension',

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          highlightColor: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.highlightColor) return {};
              return {
                style: `background-color: ${attributes.highlightColor};`,
                title: attributes.hoverTitle ? `${attributes.hoverTitle}: ${attributes.hoverContent}` : '',
              };
            },
            parseHTML: element => ({
              highlightColor: element.style.backgroundColor,
              hoverTitle: element.getAttribute('title').split(': ')[0],
              hoverContent: element.getAttribute('title').split(': ')[1],
            }),
          },
        },
      },
    ];
  },
});