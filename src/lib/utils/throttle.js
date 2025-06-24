function throttle(func, delay) {
  let inThrottle;

  return function () {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay);
    }
  };
}
export default throttle;
