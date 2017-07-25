/**
 * Created by meathill on 2017/6/25.
 */
export default class Player {
  constructor() {
    this.createElement();
    this.delegateEvent();
    this.isPlaying = true;
    let player = this.player = document.getElementById('music');
    if (player.readyState < 0) {
      this.player.addEventListener('play', this.onCanPlayHandler.bind(this), false);
    } else {
      this.el.classList.remove('hide');
    }
  }

  createElement() {
    let el = this.el = document.createElement('div');
    el.id = 'player';
    el.className = 'hide';
    el.innerHTML = '<i class="fa fa-music fa-spin"></i>';
    this.icon = el.firstChild;
    document.body.appendChild(el);
  }

  delegateEvent() {
    this.el.addEventListener('click', () => {
      this.playPause();
    }, false);
    this.el.addEventListener('video', () => {
      this.playPause(false)
    });
  }

  playPause(to) {
    this.isPlaying = to === undefined ? !this.isPlaying : to;
    if (this.isPlaying) {
      this.player.play();
    } else {
      this.player.pause();
    }
    this.el.className = this.isPlaying ? '' : 'disabled';
    if (this.isPlaying) {
      this.icon.classList.add('fa-spin');
    } else {
      this.icon.classList.remove('fa-spin');
    }
  }

  onCanPlayHandler() {
    this.el.classList.remove('hide');
    this.player.removeEventListener('canplay', this.onCanPlayHandler);
  }
}