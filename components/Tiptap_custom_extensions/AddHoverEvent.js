import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export const HoverExtension = Extension.create({
  name: 'hoverExtension',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('hover'),
        props: {
          handleDOMEvents: {
            mouseover(view, event) {
              // console.log(event.target)
              // console.log(view)
            },
            click(view, event) {
              console.log(event.target)
              // console.log(view)
            }
          }
        },
      }),
    ]
  },
})