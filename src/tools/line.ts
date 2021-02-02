import { TheEditor } from '../editor';
import { Tool } from '../interfaces';

export const Line: Tool = {
  name: '横线',
  icon: 'minus',
  action: (editor: TheEditor) => {
    const cm = editor.$codemirror;
    cm.replaceSelection('\n\n---\n\n')
  }
}
