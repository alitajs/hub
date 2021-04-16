import { listDirectory } from '@/services/project';

export const handleErrorMsg = (e: Error) => {
  const otherError = '读取失败';
  const systemError = e && e?.code ? '错误' : '';
  const customError = e && e.message ? e.message : otherError;
  return systemError || customError;
};

/**
 * 根据key取数组中的数据
 * @param key
 * @param list
 * @returns
 */
export const getItemFromPath = (key: string, list: any[]) => {
  for (let i = 0; i < list.length; ) {
    if (list[i].key === key) {
      return list[i];
    }
    i += 1;
  }
  return {};
};

export const validateDirPath = async (path: string): Promise<void> => {
  try {
    await listDirectory({
      dirPath: path,
    });
  } catch (e) {
    const error = handleErrorMsg(e);
    throw new Error(error);
  }
};
