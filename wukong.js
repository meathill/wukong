import {load} from './helper/loader';
import cdn from './cdn.json';

/* global DEV,BASE_PATH,isWeixin */

export default class Wukong {
  constructor({loading, progress}) {
    this.loading = loading;
    this.progress = document.querySelector(progress);
    this.callbacks = {};
    this.isReady = false;

    this.onProgress = this._onProgress.bind(this);
    this.onComplete = this._onComplete.bind(this);
    this.onFileLoaded = this._onFileLoaded.bind(this);

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
        queue.on('progress', this.onProgress);
        queue.on('complete', this.onComplete);
        queue.on('fileload', this.onFileLoaded);
        this.assets.forEach(item => {
          if (item instanceof Array) {
            this.queue.loadManifest(item);
          } else {
            this.queue.loadFile(item);
          }
        });
      });
  }

  _onComplete() {
    console.log('Wukong: all loaded');
    if (this.isReady) {
      return;
    }
    this.isReady = true;
    this.queue.off('complete', this.onComplete);
    let app = new H5App(this.queue);

    if (!DEV && !isWeixin) {
      autoPlayMusic();
    }
  }

  _onFileLoaded(event) {
    const {item} = event;
    item && item.onload && item.onload();
  }

  _onProgress(event) {
    console.log(event.progress);
    let progress = event.progress * 100 >> 0;
    this.progress.innerText = `${progress}%`;
  }
}
