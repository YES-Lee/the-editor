import { TheEditor } from './editor';
import { Tool } from './interfaces/tool';
import { builtinTools } from './tools';

export class Toolbar {
  private editor: TheEditor;
  private toolbar: HTMLElement;

  constructor(editor: TheEditor) {
    this.editor = editor;
    const toolbar = document.createElement('div')
    this.toolbar = toolbar;
    toolbar.className = 'the_editor--toolbar'
    editor.host.classList.add('the_editor_width_toolbar')
    editor.host.insertBefore(toolbar, editor.host.firstChild)
    this.createTools(editor.options.toolbar!.items.map(item => builtinTools.get(item) || item).filter(item => !!item));
  }

  createTools(tools: Array<string | Tool>): void {
    tools.forEach(tool => {
      const toolEl = document.createElement('span')
      if (tool === '|') {
        toolEl.className = 'tool_gutter'
      } else {
        toolEl.className = 'tool_item'
        if (typeof tool === 'string') {
          toolEl.innerText = tool
          toolEl.title = tool
        } else {
          toolEl.title = tool.name;
          if (tool.icon) {
            toolEl.classList.add(`fa`, `fa-${tool.icon}`)
          } else {
            toolEl.innerText = tool.name;
          }
          if (typeof tool.action === 'function') {
            toolEl.addEventListener('click', () => {
              tool.action(this.editor, toolEl);
            })
          }
        }
      }
      this.toolbar.appendChild(toolEl);
    })
  }
}
