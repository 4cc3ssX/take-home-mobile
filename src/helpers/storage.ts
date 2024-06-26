import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "we-go-where",
});

export const reduxStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return true;
  },
  getItem: (key: string) => {
    const value = storage.getString(key) || null;
    return value;
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return;
  },
};
