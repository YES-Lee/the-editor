import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';

export const Line: Tool = {
  name: '横线',
  icon: 'minus',
  action: (editor: TheEditor) => {
    const cm = editor.codemirrorEditor;
    cm.replaceSelection('\n\n------------\n\n')
  }
}
