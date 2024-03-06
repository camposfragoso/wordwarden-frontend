import { Mark, mergeAttributes } from '@tiptap/core';

const PropositionMark = Mark.create({
  name: 'propositionMark',

  addAttributes() {
    return {
      proposition: {
        default: null,
        parseHTML: element => element.getAttribute('data-custom'),
        renderHTML: attributes => {
          if (!attributes.proposition) {
            return {}
          }

          return {
            'data-custom': attributes.proposition,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[proposition]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },
})

export default PropositionMark;