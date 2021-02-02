import { TheEditor } from '../editor';
import { Tool } from '../interfaces';

export const Undo: Tool = {
  name: '撤销',
  icon: 'undo',
  action: (editor: TheEditor) => {
    editor.$codemirror.execCommand('undo');
  }
}
