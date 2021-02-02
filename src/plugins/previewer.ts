import { ScrollInfo } from 'codemirror';
import { TheEditor } from '../editor';
import { Plugin } from '../interfaces';

export class Previewer implements Plugin {
  name = 'Previewer';
  previewer: HTMLElement = document.createElement('div');
  editor: TheEditor;
  visible: boolean = true;
  enabled: boolean = true;

  constructor() {}

  install(editor: TheEditor, options: Record<string, any>) {
    this.editor = editor;
    this.previewer.classList.add('the_editor--previewer', 'markdown-body')
    editor.host.classList.add('the_editor_width_previewer')
    editor.host.appendChild(this.previewer)
    editor.on('change', () => {
      this.previewer.innerHTML = editor.getHTML();
    })
    this.initScroll();
  }

  initScroll(): void {
    const onEditorScroll = (scrollInfo: ScrollInfo) => {
      const r = scrollInfo.top / (scrollInfo.height - scrollInfo.clientHeight)
      this.previewer.scrollTo({
        top: (this.previewer.scrollHeight - this.previewer.clientHeight) * r
      })
    }
    const onPreviewerScroll = () => {
      this.editor.scrollToPercent(this.previewer.scrollTop / (this.previewer.scrollHeight - this.previewer.clientHeight));
    }
    this.editor.on('scroll', onEditorScroll);
    this.previewer.addEventListener('mouseover', () => {
      this.editor.off('scroll', onEditorScroll);
      this.previewer.addEventListener('scroll', onPreviewerScroll);
    })
    this.previewer.addEventListener('mouseout', () => {
      this.editor.on('scroll', onEditorScroll);
      this.previewer.removeEventListener('scroll', onPreviewerScroll);
    })
  }

  toggleVisible(): void {
    this.visible = !this.visible;
    if (this.visible) {
      this.previewer.style.display = 'block';
    } else {
      this.previewer.style.display = 'none';
    }
  }

  enable() {}

  disable() {}
}
