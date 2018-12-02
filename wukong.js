import {load} from './helper/loader';
import cdn from './cdn.json';

/* global DEV,BASE_PATH,isWeixin */

export default class Wukong {
  constructor({loading, progress}) {
    this.loading = loading;
    this.progress = document.querySelector(progress);
    if ('Promise' in window && window['Promise'] instanceof Function) {
      this.loadCreateJS();
    } else {
      load(cdn.bluebird, this.loadCreateJS.bind(this));
    }
  }

  load(assets) {
    this.assets = assets;
  }

  loadCreateJS() {
    load(cdn.createjs)
      .then(() => {
        let queue = this.queue = new createjs.LoadQueue(true, BASE_PATH);
        queue.on('progress', this.onProgress.bind(this));
        queue.on('complete', this.onComplete.bind(this));
        for (let i = 0, len = this.assets.length; i < len; i++) {
          if (this.assets[i] instanceof Array) {
            this.queue.loadManifest(this.assets[i]);
          } else {
            this.queue.loadFile(this.assets[i]);
          }
        }
      });
  }

  onComplete() {
    console.log('Wukong: all loaded');
    let app = new H5App(this.queue);

    if (!DEV && !isWeixin) {
      autoPlayMusic();
    }
  }

  onProgress(event) {
    console.log(event.progress);
    let progress = event.progress * 100 >> 0;
    this.progress.innerText = `${progress}%`;
  }
}