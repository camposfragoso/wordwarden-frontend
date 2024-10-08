import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/core'

const inputRegex = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))$/
const pasteRegex = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))/g

export const HighlightCustom = Mark.create({
  name: 'highlightCustom',

  addOptions() {
    return {
      multicolor: true,
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    if (!this.options.multicolor) {
      return {}
    }

    return {
      color: {
        default: null,
        parseHTML: element => element.getAttribute('data-color') || element.style.backgroundColor,
        renderHTML: attributes => {
          if (!attributes.color) {
            return {}
          }

          const style = `background-color: ${attributes.color.replace(')', 'Bg)')}; color: inherit; border-radius: 2px; border-bottom: 1.5px solid ${attributes.color}; cursor: pointer;`
          return {
            'data-color': attributes.color,
            style: style,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'mark[color][colorBg]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setHighlightCustom: attributes => ({ commands }) => {
        return commands.setMark(this.name, attributes)
      },
      toggleHighlightCustom: attributes => ({ commands }) => {
        return commands.toggleMark(this.name, attributes)
      },
      unsetHighlightCustom: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-h': () => this.editor.commands.toggleHighlight(),
    }
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ]
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
      }),
    ]
  },
})
