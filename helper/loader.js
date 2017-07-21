export function load(src, callback) {
  let script = document.createElement('script');
  script.async = true;
  script.type = 'text/javascript';
  script.src = src;
  document.body.appendChild(script);
  if (callback) {
    script.onload = callback;
  } else {
    return new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
  }
}