export function insertBetween<T>(arr: T[], v: T) {
  if (!arr.length) return arr;
  const result: T[] = [arr[0]];
  arr.slice(1, arr.length).forEach((e) => {
    result.push(v);
    result.push(e);
  });
  return result;
}
