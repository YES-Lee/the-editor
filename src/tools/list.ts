import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';
import { getSelectedLines } from './utils';

export class List implements Tool {
  name: string;
  icon?: string | undefined;
  action?: any;

  constructor(name: string, type: 'ul' | 'ol') {
    this.name = name;
    this.icon = 'list-' + type

    this.action = (editor: TheEditor) => {
      const lines = getSelectedLines(editor.codemirrorEditor.listSelections())
      lines.forEach(line => {
        line.forEach((l, idx) => {
          if (type === 'ul') {
            editor.codemirrorEditor.replaceRange('- ', {
              line: l,
              ch: 0
            })
          }
          if (type === 'ol') {
            editor.codemirrorEditor.replaceRange(`${idx + 1}. `, {
              line: l,
              ch: 0
            })
          }
        })
      })
    }
  }
}
