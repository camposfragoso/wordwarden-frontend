import { Mark, mergeAttributes } from '@tiptap/core';

const AssistantMark = Mark.create({
  name: 'assistantMark',

  addAttributes() {
    return {
      assistant: {
        default: null,
        parseHTML: element => element.getAttribute('assistant'),
        renderHTML: attributes => {
          if (!attributes.assistant) {
            return {}
          }

          return {
            'assistant': attributes.assistant,
          }
        },
      },
      proposition: {
        default: null,
        parseHTML: element => element.getAttribute('proposition'),
        renderHTML: attributes => {
          if (!attributes.proposition) {
            return {}
          }

          return {
            'proposition': attributes.proposition,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[assistant][proposition]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },
})

export default AssistantMark;