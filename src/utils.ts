export function insertBetween<T>(arr: T[], v: T) {
  if (!arr.length) return arr;
  const result: T[] = [arr[0]];
  arr.slice(1, arr.length).forEach((e) => {
    result.push(v);
    result.push(e);
  });
  return result;
}

export function dateToInputFormat(date?: Date) {
  if (!date || isNaN(date as unknown as number)) return "";

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = ("000" + date.getFullYear()).slice(-4);

  const s = year + "-" + month + "-" + day;
  return s;
}

export const delay = (time: number) =>
  new Promise((r) => setTimeout(() => r(undefined), time));
