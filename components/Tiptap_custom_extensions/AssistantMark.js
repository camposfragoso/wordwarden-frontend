import { Mark, mergeAttributes } from '@tiptap/core';

const AssistantMark = Mark.create({
  name: 'assistantMark',

  addAttributes() {
    return {
      assistant: {
        default: null,
        parseHTML: element => element.getAttribute('data-custom'),
        renderHTML: attributes => {
          if (!attributes.assistant) {
            return {}
          }

          return {
            'data-custom': attributes.assistant,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[assistant]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },
})

export default AssistantMark;