export type ModalConfig = {
  title: string;
  content: string | HTMLElement;
  actions?: Array<{
    title: string;
    action: () => void;
  }>;
  onClose?: () => void;
};

export class Modal {
  config: ModalConfig;
  container: HTMLElement;
  modal: HTMLElement;

  constructor(config: ModalConfig) {
    this.config = config;
    this.container = document.createElement('div')
    this.container.className = 'the_editor_modal'
    this.modal = this.create();
    this.container.appendChild(this.modal);
    document.body.appendChild(this.container)

    const rect = this.modal.getBoundingClientRect()
    this.modal.style.left = `${(window.innerWidth - rect.width) / 2}px`
    this.modal.style.top = `${(window.innerHeight - rect.height) / 2}px`
  }

  private create(): HTMLElement {
    const modalBody = document.createElement('div');
    const content = document.createElement('div');
    modalBody.className = 'the_editor_modal--body';
    content.className = 'the_editor_modal--content'

    if (typeof this.config.content === 'string') {
      content.innerHTML = this.config.content;
    }
    if (this.config.content instanceof HTMLElement) {
      content.appendChild(this.config.content)
    }

    this.createHeader(modalBody);
    modalBody.appendChild(content)
    this.createRooter(modalBody);

    return modalBody;
  }

  private createHeader(modal: HTMLElement): void {
    const header = document.createElement('div');
    header.className = 'the_editor_modal--header'
    const titleEl = document.createElement('span')
    titleEl.className = 'the_editor_modal--header_title'
    titleEl.innerText = this.config.title
    const closeIcon = document.createElement('span')
    closeIcon.className = 'the_editor_modal--header_close fa fa-times'
    header.appendChild(titleEl)
    header.appendChild(closeIcon)
    modal.appendChild(header)

    closeIcon.addEventListener('click', () => {
      if (typeof this.config.onClose === 'function') {
        this.config.onClose();
      }
      this.close();
    })

    const lastCursorPos = {
      x: 0,
      y: 0
    }

    const move = ($e: MouseEvent) => {
      const rect = this.modal.getBoundingClientRect()
      let dX = $e.pageX - lastCursorPos.x + rect.x;
      let dY = $e.pageY - lastCursorPos.y + rect.y;
      const mX = window.innerWidth - rect.width // 最大
      const mY = window.innerHeight - rect.height
      if (dX >= 0 && dX <= mX) {
        lastCursorPos.x = $e.pageX;
      }
      if (dY >= 0 && dY <= mY) {
        lastCursorPos.y = $e.pageY;
      }
      if (dX <= 0) {
        dX = 0
      }
      if (dX >= mX) {
        dX = mX;
      }

      if (dY <= 0) {
        dY = 0
      }
      if (dY >= mY) {
        dY = mY
      }
      this.modal.style.left = `${dX}px`;
      this.modal.style.top = `${dY}px`;
    };
    header.addEventListener('mousedown', ($e) => {
      lastCursorPos.x = $e.pageX
      lastCursorPos.y = $e.pageY
      window.addEventListener('mousemove', move)
    })
    window.addEventListener('mouseup', ($e) => {
      window.removeEventListener('mousemove', move)
    })
  }

  private createRooter(modal: HTMLElement): void {
    if (this.config.actions?.length) {
      const footer = document.createElement('footer');
      footer.className = 'the_editor_modal--footer';
      modal.appendChild(footer);
    }
  }

  close() {
    document.body.removeChild(this.container);
  }
}
