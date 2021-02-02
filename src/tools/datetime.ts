import { TheEditor } from '../editor';
import { Tool } from '../interfaces';

export const Datetime: Tool = {
  name: '插入时间',
  icon: 'clock',
  action: (editor: TheEditor) => {
    const cm = editor.$codemirror;
    const date = new Date();
    cm.replaceSelection(date.toLocaleString())
  }
}
