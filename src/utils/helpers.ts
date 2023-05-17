export const truncate = (str: string, num: number) => {
  if (!str) return "";
  return str.length > num ? str.slice(0, num - 2) + "…" : str;
};
