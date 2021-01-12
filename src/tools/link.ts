import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';

export const Link: Tool = {
  name: '链接',
  icon: 'link',
  action: (editor: TheEditor) => {
    const template = `
      <div style="display: flex; align-items: center;">
        <label for="the_editor--tool_link--title" class="the_editor--label">链接标题</label>
        <input style="flex: auto;" id="the_editor--tool_link--title" class="the_editor--input">
      </div>
      <div style="margin-top: 8px; display: flex; align-items: center;">
        <label for="the_editor--tool_link--url" class="the_editor--label">链接地址</label>
        <input style="flex: auto;" id="the_editor--tool_link--url" class="the_editor--input" value="http://">
      </div>
    `
    const container = document.createElement('div')
    container.innerHTML = template
    const modal = editor.openModal({
      title: '添加链接',
      content: container,
      actions: [
        {
          title: '确定',
          action: () => {
            const title = (container.querySelector('#the_editor--tool_link--title') as HTMLInputElement )?.value || ''
            const url = (container.querySelector('#the_editor--tool_link--url') as HTMLInputElement)?.value || ''
            const str = `[${title || url}](${url})`
            editor.codemirrorEditor.replaceSelection(str)
            modal.close()
          }
        }
      ]
    });
  }
};
