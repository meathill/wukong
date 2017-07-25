/**
 * Created by meathill on 2017/6/26.
 */
var isWeixin = /micromessenger/i.test(navigator.userAgent.toLowerCase());
function autoPlayMusic() {
  var audio = document.getElementById('music');
  audio.play();
}
document.addEventListener('WeixinJSBridgeReady', autoPlayMusic, false);