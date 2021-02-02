import { TheEditor } from '../editor';
import { Tool } from '../interfaces';

export class List implements Tool {
  name: string;
  icon?: string | undefined;
  action?: any;

  constructor(name: string, type: 'ul' | 'ol') {
    this.name = name;
    this.icon = 'list-' + type

    this.action = (editor: TheEditor) => {
      const cm = editor.$codemirror;
      const selection = cm.getSelection();

      if (selection === '') {
        if (type === 'ul') cm.replaceSelection('- ' + selection);
        if (type === 'ol') cm.replaceSelection('1. ' + selection);
      } else {
        const selectionText = selection.split("\n");

        for (let i = 0, len = selectionText.length; i < len; i++) {
          if (type === 'ul') {
            selectionText[i] = (selectionText[i] === '') ? '' : '- ' + selectionText[i];
          }
          if (type === 'ol') {
            selectionText[i] = (selectionText[i] === '') ? '' : `${i + 1}. ` + selectionText[i];
          }
        }

        cm.replaceSelection(selectionText.join("\n"));
      }
    }
  }
}
