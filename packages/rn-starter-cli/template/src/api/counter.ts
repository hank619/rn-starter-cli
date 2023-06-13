export function fetchCount(s: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: s });
    }, 2000);
  });
}
