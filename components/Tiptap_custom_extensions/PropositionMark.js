import { Mark, mergeAttributes } from '@tiptap/core';

const PropositionMark = Mark.create({
  name: 'propositionMark',

  addAttributes() {
    return {
      proposition: {
        default: null,
        parseHTML: element => element.getAttribute('proposition'),
        renderHTML: attributes => {
          if (!attributes.proposition) {
            return {}
          }

          return {
            'assistant': attributes.assistant,
            'proposition': attributes.proposition,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[proposition]',
        tag: 'span[assistant]'
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },
})

export default PropositionMark;