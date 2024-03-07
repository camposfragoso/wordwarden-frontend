import { Mark, mergeAttributes } from '@tiptap/core';

const AssistantMark = Mark.create({
  name: 'assistantMark',

  addAttributes() {
    return {
      propositions: {
        default: null,
        parseHTML: element => element.getAttribute('propositions'),
        renderHTML: attributes => {
          if (!attributes.propositions) {
            return {}
          }

          return { propositions: attributes.propositions };
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[propositions]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    let props = {};
    if (HTMLAttributes.propositions) {
      try {
        props = JSON.parse(HTMLAttributes.propositions);
      } catch (e) {
        console.error("Error parsing propositions attribute:", e);
      }
    }

    const dynamicAttributes = {};
    Object.keys(props).forEach(key => {
      dynamicAttributes[key] = props[key];
    });

    return ['span', mergeAttributes(dynamicAttributes), 0];
  },
});

export default AssistantMark;









// import { Mark, mergeAttributes } from '@tiptap/core';

// const AssistantMark = Mark.create({
//   name: 'assistantMark',

//   addAttributes() {
//     return {
//       assistant: {
//         default: null,
//         parseHTML: element => element.getAttribute('assistant'),
//         renderHTML: attributes => {
//           if (!attributes.assistant) {
//             return {}
//           }

//           return {
//             'assistant': attributes.assistant,
//           }
//         },
//       },
//       proposition: {
//         default: null,
//         parseHTML: element => element.getAttribute('proposition'),
//         renderHTML: attributes => {
//           if (!attributes.proposition) {
//             return {}
//           }

//           return {
//             'proposition': attributes.proposition,
//           }
//         },
//       },
//     }
//   },

//   parseHTML() {
//     return [
//       {
//         tag: 'span[assistant][proposition]',
//       },
//     ]
//   },

//   renderHTML({ HTMLAttributes }) {
//     return ['span', mergeAttributes(HTMLAttributes), 0]
//   },
// })

// export default AssistantMark;