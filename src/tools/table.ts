import { TheEditor } from '../editor';
import { Tool } from '../interfaces/tool';

export const Table: Tool = {
  name: '表格',
  icon: 'table',
  action: (editor: TheEditor) => {
    const template = `
      <div style="display: flex; align-items: center;">
        <label for="the_editor--tool_table--row" class="the_editor--label">行</label>
        <input name="row" style="flex: auto;" id="the_editor--tool_table--row" class="the_editor--input" type="number" value="1" min="1">
        <div style="width: 1rem; flex: none;"></div>
        <label for="the_editor--tool_table--column" class="the_editor--label">行</label>
        <input name="column" style="flex: auto;" id="the_editor--tool_table--column" class="the_editor--input" type="number" value="2" min="2">
      </div>
      <div style="margin-top: 1rem;">
        <label class="the_editor--label">对齐方式</label>
        <input name="align" value="justify" style="flex: auto;" type="radio" checked id="the_editor--tool_table--align_justify" class="the_editor--input">
        <label for="the_editor--tool_table--align_justify" class="the_editor--label fa fa-align-justify"></label>
        <input name="align" value="left" style="flex: auto;" type="radio" id="the_editor--tool_table--align_left" class="the_editor--input">
        <label for="the_editor--tool_table--align_left" class="the_editor--label fa fa-align-left"></label>
        <input name="align" value="center" style="flex: auto;" type="radio" id="the_editor--tool_table--align_center" class="the_editor--input">
        <label for="the_editor--tool_table--align_center" class="the_editor--label fa fa-align-center"></label>
        <input name="align" value="right" style="flex: auto;" type="radio" id="the_editor--tool_table--align_right" class="the_editor--input">
        <label for="the_editor--tool_table--align_right" class="the_editor--label fa fa-align-right"></label>
      </div>
    `

    const container = document.createElement('form')
    container.innerHTML = template;
    editor.openDialog({
      title: '插入表格',
      content: container,
      actions: [
        {
          title: '确定',
          action: () => {
            const alignTokens: Record<string, string> = {
              justify: '---',
              left: ':---',
              center: ':---:',
              right: '---:'
            }
            const formData = new FormData(container)
            const row = +formData.get('row')!;
            const column = +formData.get('column')!;
            const align = <string>formData.get('align')!;
            const table: string[][] = new Array(row + 2)
            table[0] = new Array(column).fill('标题')
            table[1] = new Array(column).fill(alignTokens[align])
            for (let i = 2; i < column + 2; i++) {
              table[i] = new Array(column).fill('  ')
            }
            const tableStr = table.map(r => `|${r.join('|')}|`).join('\n')
            editor.codemirrorEditor.replaceSelection(tableStr)
            editor.closeDialog();
          }
        }
      ]
    })
  }
}
