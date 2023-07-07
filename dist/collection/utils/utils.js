export function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
export async function pxTimer(time) {
  let cosa;
  return new Promise((resolve) => {
    cosa = setTimeout(() => {
      resolve(cosa);
    }, time);
  });
}
//# sourceMappingURL=utils.js.map
