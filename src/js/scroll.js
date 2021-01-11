export default function onScroll() {
  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );

  window.scrollTo({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
}
