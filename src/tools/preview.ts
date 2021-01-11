import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';

export const Preview: Tool = {
  name: '预览',
  icon: 'eye-slash',
  action: (editor: TheEditor, el: HTMLElement) => {
    editor.previewer?.toggleVisible();
    if (editor.previewer?.visible) {
      el.classList.remove('fa-eye')
      el.classList.add('fa-eye-slash')
    } else {
      el.classList.remove('fa-eye-slash')
      el.classList.add('fa-eye')
    }
  }
};
