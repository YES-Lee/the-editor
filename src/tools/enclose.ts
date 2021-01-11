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
      const selections = editor.codemirrorEditor.getSelections()
      editor.codemirrorEditor.replaceSelections(selections.map(s => `${key}${s}${key}`))
    }
  }
}
