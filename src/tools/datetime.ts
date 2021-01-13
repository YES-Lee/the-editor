import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';

export const Datetime: Tool = {
  name: '插入时间',
  icon: 'clock',
  action: (editor: TheEditor) => {
    const cm = editor.codemirrorEditor;
    const date = new Date();
    cm.replaceSelection(date.toLocaleString())
  }
}
