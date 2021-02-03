import ResizeObserver from 'resize-observer-polyfill';
import { TheEditor } from '../editor';
import { Plugin, Tool } from '../interfaces';
import { builtinTools } from '../tools';

export class Toolbar implements Plugin {
  static builtinTools: Map<string, Tool> = builtinTools;
  name: string = 'Toolbar';
  enabled: boolean;
  private editor: TheEditor;
  private toolbar: HTMLElement = document.createElement('div');

  constructor() {}
  install(editor: TheEditor, options: Record<string, any>): void {
    this.editor = editor;
    this.toolbar.className = 'the_editor--toolbar';
    editor.host.classList.add('the_editor_width_toolbar');
    const resizeOb = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const height = entry.target.getBoundingClientRect().height;
      editor.host.style.paddingTop = height + 'px';
    });
    resizeOb.observe(this.toolbar);
    editor.host.insertBefore(this.toolbar, editor.host.firstChild);
    this.createTools(
      options.items
        .map((item) => builtinTools.get(item) || item)
        .filter((item) => !!item)
    );
  }
  enable(): void {
    throw new Error('Method not implemented.');
  }
  disable(): void {
    throw new Error('Method not implemented.');
  }

  createTools(tools: Array<string | Tool>): void {
    tools.forEach((tool) => {
      const toolEl = document.createElement('span');
      if (tool === '|') {
        toolEl.className = 'tool_gutter';
      } else {
        toolEl.className = 'tool_item';
        if (typeof tool === 'string') {
          toolEl.innerText = tool;
          toolEl.title = tool;
        } else {
          toolEl.title = tool.name;
          if (tool.icon) {
            toolEl.classList.add(`fa`, `fa-${tool.icon}`);
          } else {
            toolEl.innerText = tool.name;
          }
          if (typeof tool.action === 'function') {
            toolEl.addEventListener('click', () =>
              this.onClickTool(tool, toolEl)
            );
          }
        }
      }
      this.toolbar.appendChild(toolEl);
    });
  }

  private onClickTool(tool: Tool, toolEl: HTMLElement) {
    tool.action(this.editor, toolEl);
    this.editor.$codemirror.focus();
  }
}
