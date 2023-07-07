export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}




export async function pxTimer( time: number ) {
  let cosa;
  return new Promise((resolve) => {
    cosa = setTimeout(() => {
      resolve(cosa)
    }, time)
  })

}