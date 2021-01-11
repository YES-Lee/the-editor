import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';

export const Redo: Tool = {
  name: '重做',
  icon: 'redo',
  action: (editor: TheEditor) => {
    editor.codemirrorEditor.execCommand('redo');
  }
}
