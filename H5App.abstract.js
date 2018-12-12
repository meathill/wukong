import $ from 'sizzle';
import View from './View.abstract';

/* global Router,URL */

export default class AbstractH5App {
  constructor(queue) {
    this.queue = queue;
    this.pages = {};
    this.createRouter();
    this.delegateEvent();
    this.showHomepage();
  }

  createPage(name, container) {
    if (this.pages[name]) {
      return this.pages[name];
    }
    container = container || document.body;
    const options = this.getPageOptions(name);
    let html = this.getTemplate(name);
    if (!html) {
      console.log('没有此页面');
      return;
    }

    if (typeof html !== 'string') {
      const page = new html(null, this.queue, options);
      page.router = this.router;
      container.appendChild(page.el);
      this.pages[name] = page;
      return page;
    }

    html = this.replaceURL(html);
    let page = document.createElement('div');
    if (options) {
      for (let prop in options) {
        if (!options.hasOwnProperty(prop)) {
          continue;
        }
        let value = options[prop];
        if (prop !== 'style') {
          value = this.replaceURL(value);
          page[prop] = value;
          continue;
        }
        let kv = value.split(':');
        page.style[kv[0]] = this.replaceURL(kv[1]);
      }
    }
    page.innerHTML = html;
    page.id = name;
    page.className = 'container page out';
    container.appendChild(page);
    // 看是否需要用类包裹
    let klass = this.getKlass(name);
    if (klass) {
      page = new klass(page, this.queue, options);
    }
    this.pages[name] = page;
    return page;
  }

  replaceURL(html) {
    return html.replace(/{{(.*?)}}/g, (match, url) => {
      return this.getResourceURL(url);
    });
  }

  createRouter() {
    let router = this.router = Router(this.getRouter());
    router.init('#/home');
  }

  delegateEvent() {
    document.body.addEventListener('transitionend', this.onTransitionEnd, false);
    document.body.addEventListener('animationend', this.onAnimationEnd, false);
    document.body.addEventListener('click', this.onClick, false);
  }

  getKlass(name) {

  }

  getPageOptions(name) {

  }

  getRouter() {
    return {
      '/:page': this.goToPage.bind(this)
    };
  }

  getResourceURL(name) {
    let blob = this.queue.getResult(name, true);
    if (!blob) {
      return false;
    }
    return URL.createObjectURL(blob);
  }

  getTemplate(page) {

  }

  goToPage(page) {
    const p = this.currentPage ? this.currentPage.exit() : Promise.resolve();
    p
      .then(() => {
        if (page !== 'home') {
          page = this.createPage(page);
          page.enter();
        }
        this.currentPage = page;
      });
  }

  showHomepage() {

  }

  onAnimationEnd(event) {

  }

  onClick() {

  }

  onTransitionEnd(event) {
    let target = event.target;
    if (target.classList.contains('container') && target.classList.contains('out')) {
      target.classList.add('hide');
    }
  }
}
