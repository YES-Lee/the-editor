import { TheEditor } from '../editor';
import { Tool } from '../interfaces';

export const CodeBlock: Tool = {
  name: '代码块',
  icon: 'file-code',
  action: (editor: TheEditor) => {
    const cm = editor.$codemirror;
    const cursor = cm.getCursor()
    const selection = cm.getSelection()
    cm.replaceSelection('```\n' + selection + '\n```')
    if (selection === '') {
      cm.setCursor(cursor.line + 1, 0)
    }
  }
}
