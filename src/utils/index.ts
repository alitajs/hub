export const getItemFromPath = (key: string, list: any[]) => {
  for (let i = 0; i < list.length; ) {
    if (list[i].key === key) {
      return list[i];
    }
    i += 1;
  }
  return {};
};
