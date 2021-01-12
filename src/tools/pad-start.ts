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
      const cm = editor.codemirrorEditor;
      cm.replaceRange(key, {
        line: cm.getCursor().line,
        ch: 0
      })
    }
  }
}
