import EventEmitter from 'eventemitter3';

export default class View extends EventEmitter {
  constructor(el, queue, options) {
    super();
    this.queue = queue;
    this.el = el || this.createElement(options);
    this.delegateEvents();
  }

  createElement(options) {
    const el = document.createElement('div');
    const {id, className} = options;
    if (id) {
      el.id = id;
    }
    if (className) {
      el.className = className;
    }
    return el;
  }

  delegateEvents() {
    this.el.addEventListener('animationend', event => {
      if (event.target === this.el && event.animationName === 'fadeOut') {
        this.el.classList.add('hide');
        if (this.hidden) {
          this.hidden();
        }
      }
    });
  }

  enter() {
    this.el.classList.remove('out');
  }

  exit() {
    return new Promise(resolve => {
      this.el.classList.add('animated', 'fadeOut');
      this.hidden = resolve;
    });
  }

  getAssetUrl(asset) {
    asset = this.queue.getResult(asset, true);
    return URL.createObjectURL(asset);
  }
}
