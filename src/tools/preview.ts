import { TheEditor } from '../editor';
import { Tool } from '../interfaces';
import { Previewer } from '../plugins/previewer';

export const Preview: Tool = {
  name: '预览',
  icon: 'eye-slash',
  action: (editor: TheEditor, el: HTMLElement) => {
    const previewer: Previewer = <Previewer>editor.plugins.get('Previewer');
    previewer?.toggleVisible();
    if (previewer?.visible) {
      el.classList.remove('fa-eye');
      el.classList.add('fa-eye-slash');
    } else {
      el.classList.remove('fa-eye-slash');
      el.classList.add('fa-eye');
    }
  },
};
