import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';

export const Undo: Tool = {
  name: '撤销',
  icon: 'undo',
  action: (editor: TheEditor) => {
    editor.codemirrorEditor.execCommand('undo');
  }
}
