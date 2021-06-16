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
  if (!date) return "";
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);

  return date.getFullYear() + "-" + month + "-" + day;
}
