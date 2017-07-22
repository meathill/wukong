import $ from 'sizzle';
import {sleep} from './helper/next';

/* global Router,URL */

export default class AbstractHomepage {
  constructor(queue) {
    this.queue = queue;
    this.pages = {};
    this.createRouter();
    this.delegateEvent();
    this.showHomepage();
  }

  createPage() {
    let html = this.getTemplate(name);
    let page = document.createElement('div');
    page.innerHTML = html;
    page.className = `container page out ${name}`;
    let url = this.getResourceURL(name);
    if (url) {
      page.style.backgroundImage = `url(${url})`;
      page = document.body.appendChild(page);
    }
    return page;
  }

  createRouter() {
    let router = Router(this.getRouter());
    router.init('/home');
  }

  delegateEvent() {
    document.body.addEventListener('transitionend', this.onTransitionEnd, false);
    document.body.addEventListener('animationend', this.onAnimationEnd, false);
    document.body.addEventListener('click', this.onClick, false);
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
    let el = this.pages[page] || this.createPage(page);
    this.pages[page] = el;
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