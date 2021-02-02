import { TheEditor } from '../editor';
import { Tool } from '../interfaces';

export const Redo: Tool = {
  name: '重做',
  icon: 'redo',
  action: (editor: TheEditor) => {
    editor.$codemirror.modeOption.a = 123
    editor.$codemirror.execCommand('redo');
  }
}
