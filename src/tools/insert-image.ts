import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';

export const InsertImage: Tool = {
  name: '插入图片',
  icon: 'image',
  action: (editor: TheEditor) => {
    const template = `
      <div style="display: flex; align-items: center;">
        <label for="the_editor--tool_image--des" class="the_editor--label">图片描述</label>
        <input style="flex: auto;" id="the_editor--tool_image--des" class="the_editor--input">
      </div>
      <div style="margin-top: 8px; display: flex; align-items: center;">
        <label for="the_editor--tool_image--url" class="the_editor--label">图片链接</label>
        <input style="flex: auto;" id="the_editor--tool_image--url" class="the_editor--input" value="https://">
      </div>
      <div style="margin-top: 8px; text-align: right;">
        <label for="the_editor--tool_image--file_input" class="the_editor--label_file_input">上传图片</label>
        <input id="the_editor--tool_image--file_input" style="display: none;" type="file" accept="image/*" >
      </div>
    `

    const container = document.createElement('div')
    container.innerHTML = template
    const imageDesInput = container.querySelector<HTMLInputElement>('#the_editor--tool_image--des')!
    const imageUrlInput = container.querySelector<HTMLInputElement>('#the_editor--tool_image--url')!
    const fileInput = container.querySelector<HTMLInputElement>('#the_editor--tool_image--file_input')!;
    fileInput.addEventListener('input', () => {
      const adaptor = editor.options.imageUploadAdaptor;
      if (typeof adaptor?.upload !== 'function') {
        window.alert('没有imageUploadAdaptor！')
        return;
      }
      const file = fileInput.files![0]
      const res = adaptor.upload([file])
      if (res instanceof Promise) {
        res.then(urls => {
          imageUrlInput.value = urls[0]
        })
      } else {
        imageUrlInput.value = res[0]
      }
    })
    editor.openDialog({
      title: '插入图片',
      content: container,
      actions: [
        {
          title: '确定',
          action: () => {
            const cm = editor.codemirrorEditor;
            cm.replaceSelection(`![${imageDesInput.value}](${imageUrlInput.value})`)
            editor.closeDialog();
          }
        }
      ]
    });
  }
}
