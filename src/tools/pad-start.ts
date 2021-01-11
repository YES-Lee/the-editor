import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';

export class PadStart implements Tool {
  name: string;
  icon?: string | undefined;
  action?: any;

  constructor(name: string, key: string, icon?: string) {
    this.name = name;
    this.icon = icon;

    this.action = (editor: TheEditor) => {
      editor.codemirrorEditor.replaceRange(key, {
        line: editor.codemirrorEditor.getCursor().line,
        ch: 0
      })
    }
  }
}
