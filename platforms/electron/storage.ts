import storage from 'electron-json-storage';

export const getUmiHubConfig = () => {
  return new Promise((resolve, reject) => {
    storage.get('config', (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

export const setUmiHubConfig = (config: any) => {
  return new Promise((resolve, reject) => {
    storage.set('config', config, (error) => {
      if (error) {
        reject(error);
      }
      resolve({ success: true });
    });
  });
};
