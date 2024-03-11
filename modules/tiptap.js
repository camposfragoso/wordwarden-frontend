const replaceText = (editor, excerpt, proposition) => {
  editor.state.doc.descendants((node, pos) => {
    if (node.isText && node.text.includes(excerpt)) {
      const startIndex = node.text.indexOf(excerpt) + pos;
      const endIndex = startIndex + excerpt.length;

      editor.chain().setTextSelection({ from: startIndex, to: endIndex })
        .unsetMark('assistantMark')
        .unsetHighlightCustom()
        .deleteSelection()
        .insertContent(proposition)
        .run();
      
    }
  })
};

const setAllHightlights = (editor, assistants, llmAnswer, minImportance) => {
  // Sort by excerpt
  let llmAnswerTmp = {};
  Object.entries(llmAnswer).forEach(([assistant, content]) => {
    // Only if assistant is chosen
    if (assistants.includes(assistant)) {
      content.forEach(({excerpt, proposition, importance}) => {
        if (importance >= minImportance) {
          if (!llmAnswerTmp[excerpt]) {
            llmAnswerTmp[excerpt] = {};
          }
          llmAnswerTmp[excerpt][assistant] = proposition;
        }
      })
    }
  })

  // Set highlights
  Object.entries(llmAnswerTmp).forEach(([excerpt, content]) => {
    setHighlightTextByExcerpt(editor, excerpt, content)
  })
};

const setHighlightTextByExcerpt = (editor, excerpt, content) => {
  editor.state.doc.descendants((node, pos) => {
    if (node.isText && node.text.includes(excerpt)) {
      const startIndex = node.text.indexOf(excerpt) + pos;
      const endIndex = startIndex + excerpt.length;

      const keys = Object.keys(content)
      let color 
      keys.length > 1 ? color = `var(--multipleAssistants)` : color = `var(--${keys[0]})`
      editor.chain().setTextSelection({ from: startIndex, to: endIndex })
        .setMark('assistantMark', {
          propositions: (JSON.stringify(content)),
        })
        .setHighlightCustom({ color })
        .blur()
        .run();
    }
  });
};

const unsetAllHighlights = (editor) => {
  if (!editor || !editor.state) return;

  // Créer une transaction pour enlever tous les marks 'assistantMark'
  const trForHighlightCustom = editor.state.tr;
  let modifiedHighlightCustom = false; // Pour suivre si des modifications ont été faites

  editor.state.doc.descendants((node, pos) => {
    if (!node.isText) return;

    // Trouver tous les marks 'assistantMark' dans le noeud de texte
    const marks = node.marks.filter(mark => mark.type.name === 'highlightCustom');
    if (marks.length > 0) {
      // Pour chaque 'assistantMark', l'enlever
      marks.forEach(mark => {
        const from = pos;
        const to = pos + node.nodeSize;
        trForHighlightCustom.removeMark(from, to, mark);
        modifiedHighlightCustom = true;
      });
    }
  });

  // Si des modifications ont été faites, appliquer la transaction
  if (modifiedHighlightCustom) {
    editor.view.dispatch(trForHighlightCustom);
  }

  // Créer une transaction pour enlever tous les marks 'assistantMark'
  const trForAssistantMarks = editor.state.tr;
  let modifiedAssistantMarks = false; // Pour suivre si des modifications ont été faites

  editor.state.doc.descendants((node, pos) => {
    if (!node.isText) return;

    // Trouver tous les marks 'assistantMark' dans le noeud de texte
    const marks = node.marks.filter(mark => mark.type.name === 'assistantMark');
    if (marks.length > 0) {
      // Pour chaque 'assistantMark', l'enlever
      marks.forEach(mark => {
        const from = pos;
        const to = pos + node.nodeSize;
        trForAssistantMarks.removeMark(from, to, mark);
        modifiedAssistantMarks = true;
      });
    }
  });

  // Si des modifications ont été faites, appliquer la transaction
  if (modifiedAssistantMarks) {
    editor.view.dispatch(trForAssistantMarks);
  }
};

export { replaceText, unsetAllHighlights, setHighlightTextByExcerpt, setAllHightlights }