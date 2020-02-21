import { AsyncStorage } from "react-native";

class AsyncStorageService {
  async setItem(key, data) {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }
  async getItem(key) {
    try {
      const result = await AsyncStorage.getItem(key, null);
      return JSON.parse(result);
    } catch (e) {
      console.log(e);
    }
  }
}

const asyncStorageService = new AsyncStorageService();

export default asyncStorageService;
