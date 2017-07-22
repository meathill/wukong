/**
 * Created by meathill on 2017/6/25.
 */

function isTransition(dom) {
  let style = getComputedStyle(dom).getPropertyValue('transition');
  return style !== 'all 0s ease 0s';
}

export function next(dom) {
  let eventName = isTransition(dom) ? 'transitionend' : 'animationend';
  return new Promise(resolve => {
    dom.addEventListener(eventName, function handler(event) {
      dom.removeEventListener(eventName, handler);
      resolve(event);
    }, false);
  });
}

export function play(dom, classes) {
  dom.classList.add(classes);
  return next(dom);
}

export function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000 * time);
  });
}