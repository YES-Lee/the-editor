import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';

export class Enclose implements Tool {
  name: string;
  icon?: string | undefined;
  action?: any;

  constructor(name: string, key: string, icon?: string) {
    this.name = name;
    this.icon = icon;

    this.action = (editor: TheEditor) => {
      const cm = editor.codemirrorEditor;
      const cursor = cm.getCursor()
      const selections = cm.getSelections()
      cm.replaceSelections(selections.map(s => `${key}${s}${key}`))
      if (selections.length === 1) {
        cm.setCursor(cursor.line, cursor.ch + key.length)
      }
    }
  }
}
