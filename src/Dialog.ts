export type DialogConfig = {
  title: string;
  content: string | HTMLElement;
  actions?: Array<{
    title: string;
    action?: () => void;
  }>;
  onClose?: () => void;
};

export class Dialog {
  config: DialogConfig;
  container: HTMLElement;
  dialog: HTMLElement;

  constructor(config: DialogConfig) {
    this.config = config;
    this.container = document.createElement('div');
    this.container.className = 'the_editor_dialog';
    this.dialog = this.create();
    this.container.appendChild(this.dialog);
    document.body.appendChild(this.container);

    const rect = this.dialog.getBoundingClientRect();
    this.dialog.style.left = `${(window.innerWidth - rect.width) / 2}px`;
    this.dialog.style.top = `${(window.innerHeight - rect.height) / 2}px`;
  }

  private create(): HTMLElement {
    const dialogBody = document.createElement('div');
    const content = document.createElement('div');
    dialogBody.className = 'the_editor_dialog--body';
    content.className = 'the_editor_dialog--content';

    if (typeof this.config.content === 'string') {
      content.innerHTML = this.config.content;
    }
    if (this.config.content instanceof HTMLElement) {
      content.appendChild(this.config.content);
    }

    this.createHeader(dialogBody);
    dialogBody.appendChild(content);
    this.createRooter(dialogBody);

    return dialogBody;
  }

  private createHeader(dialog: HTMLElement): void {
    const header = document.createElement('div');
    header.className = 'the_editor_dialog--header';
    const titleEl = document.createElement('span');
    titleEl.className = 'the_editor_dialog--header_title';
    titleEl.innerText = this.config.title;
    const closeIcon = document.createElement('span');
    closeIcon.className = 'the_editor_dialog--header_close fa fa-times';
    header.appendChild(titleEl);
    header.appendChild(closeIcon);
    dialog.appendChild(header);

    closeIcon.addEventListener('click', () => {
      if (typeof this.config.onClose === 'function') {
        this.config.onClose();
      }
      this.close();
    });

    const lastCursorPos = {
      x: 0,
      y: 0,
    };

    const move = ($e: MouseEvent) => {
      const rect = this.dialog.getBoundingClientRect();
      let dX = $e.pageX - lastCursorPos.x + rect.x;
      let dY = $e.pageY - lastCursorPos.y + rect.y;
      const mX = window.innerWidth - rect.width; // 最大
      const mY = window.innerHeight - rect.height;
      if (dX >= 0 && dX <= mX) {
        lastCursorPos.x = $e.pageX;
      }
      if (dY >= 0 && dY <= mY) {
        lastCursorPos.y = $e.pageY;
      }
      if (dX <= 0) {
        dX = 0;
      }
      if (dX >= mX) {
        dX = mX;
      }

      if (dY <= 0) {
        dY = 0;
      }
      if (dY >= mY) {
        dY = mY;
      }
      this.dialog.style.left = `${dX}px`;
      this.dialog.style.top = `${dY}px`;
    };
    header.addEventListener('mousedown', ($e) => {
      lastCursorPos.x = $e.pageX;
      lastCursorPos.y = $e.pageY;
      window.addEventListener('mousemove', move);
    });
    window.addEventListener('mouseup', ($e) => {
      window.removeEventListener('mousemove', move);
    });
  }

  private createRooter(dialog: HTMLElement): void {
    if (this.config.actions?.length) {
      const footer = document.createElement('footer');
      footer.className = 'the_editor_dialog--footer';
      dialog.appendChild(footer);
      this.config.actions.forEach((item) => {
        const actionButton = document.createElement('button');
        actionButton.className = 'the_editor_dialog--footer_action_button';
        actionButton.innerText = item.title;
        if (typeof item.action === 'function') {
          actionButton.addEventListener('click', item.action);
        }
        footer.appendChild(actionButton);
      });
    }
  }

  close() {
    document.body.removeChild(this.container);
  }
}
