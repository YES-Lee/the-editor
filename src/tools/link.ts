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
        <input style="flex: auto;" id="the_editor--tool_link--url" class="the_editor--input" value="https://">
      </div>
    `
    const container = document.createElement('div')
    container.innerHTML = template
    editor.openDialog({
      title: '添加链接',
      content: container,
      actions: [
        {
          title: '确定',
          action: () => {
            const title = container.querySelector<HTMLInputElement>('#the_editor--tool_link--title')?.value || ''
            const url = container.querySelector<HTMLInputElement>('#the_editor--tool_link--url')?.value || ''
            const str = `[${title || url}](${url})`
            editor.codemirrorEditor.replaceSelection(str)
            editor.closeDialog()
          }
        }
      ]
    });
  }
};
