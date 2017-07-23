import {sleep} from './helper/next';

/* global Router,URL */

export default class AbstractH5App {
  constructor(queue) {
    this.queue = queue;
    this.pages = {};
    this.createRouter();
    this.delegateEvent();
    this.showHomepage();
  }

  createPage(name) {
    if (this.pages[name]) {
      return this.pages[name];
    }
    let html = this.getTemplate(name);
    html = this.replaceURL(html);
    let page = document.createElement('div');
    let options = this.getPageOptions(name);
    if (options) {
      for (let prop in options) {
        if (!options.hasOwnProperty(prop)) {
          continue;
        }
        let value = options[prop];
        value = this.replaceURL(value);
        page[prop] = value;
      }
    }
    page.innerHTML = html;
    page.id = name;
    page.className = 'container page out';
    this.pages[name] = page;
    // 看是否需要用类包裹
    let klass = this.getKlass(name);
    if (klass) {
      new klass(page);
    }
    document.body.appendChild(page);
    return page;
  }

  replaceURL(html) {
    return html.replace(/{{(.*)}}/g, (match, url) => {
      return this.getResourceURL(url);
    });
  }

  createRouter() {
    let router = Router(this.getRouter());
    router.init();
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
    let el = this.createPage(page);
    el.classList.remove('hide', 'out');
    el.classList.add('in');
  }

  showHomepage() {

  }

  onAnimationEnd(event) {

  }

  onClick() {

  }

  onTransitionEnd(event) {

  }
}