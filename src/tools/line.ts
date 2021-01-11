import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';

export const Line: Tool = {
  name: '横线',
  icon: 'minus',
  action: (editor: TheEditor) => {
    editor.codemirrorEditor.replaceRange(['', '------------', '', ''], {
      line: editor.codemirrorEditor.getCursor().line + 1,
      ch: 0
    })
  }
}
