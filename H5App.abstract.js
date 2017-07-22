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
    html = html.replace(/{{(.*)}}/g, (match, url) => {
      return this.getResourceURL(url);
    });
    let page = document.createElement('div');
    page.innerHTML = html;
    page.id = name;
    page.className = 'container page out';
    this.pages[name] = page;
    // 看是否需要用类包裹
    let klass = this.getKlass(name);
    if (klass) {
      new klass(page);
    }
    return page;
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

  getRouter() {
    return {
      '/:page': this.goToPage.bind(this)
    };
  }

  getTemplate(page) {

  }

  getResourceURL(name) {
    let blob = this.queue.getResult(name, true);
    if (!blob) {
      return false;
    }
    return URL.createObjectURL(blob);
  }

  goToPage(page) {
    let el = this.createPage(page);
    sleep(1)
      .then(() => {
        el.classList.remove('hide');
        el.classList.remove('out');
      });
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