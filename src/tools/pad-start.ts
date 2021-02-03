import { TheEditor } from '../editor';
import { Tool } from '../interfaces';

export class PadStart implements Tool {
  name: string;
  icon?: string | undefined;
  action?: any;

  constructor(name: string, key: string, icon?: string) {
    this.name = name;
    this.icon = icon;

    this.action = (editor: TheEditor) => {
      const cm = editor.$codemirror;
      cm.replaceRange(key, {
        line: cm.getCursor().line,
        ch: 0,
      });
    };
  }
}
