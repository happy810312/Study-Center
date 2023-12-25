export default function throttle(fn, delay = 500) {
  let timer = null;

  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
}
