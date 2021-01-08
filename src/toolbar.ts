import { TheEditor } from './editor';

export class Toolbar {

  constructor(editor: TheEditor) {
    const toolbar = document.createElement('div')
    toolbar.className = 'the_editor--toolbar'
    editor.host.classList.add('the_editor_width_toolbar')
    editor.host.insertBefore(toolbar, editor.host.firstChild)
  }
}
