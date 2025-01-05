import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
  // Store a value in AsyncStorage
  setItem: async (key: string, value: string | null) => {
    if (value === undefined) {
      throw new Error("Cannot store undefined value");
    }
    await AsyncStorage.setItem(key, JSON.stringify(value)); // Use AsyncStorage's setItem
  },

  // Get a value from AsyncStorage
  getItem: async (key: string): Promise<string | null> => {
    const value = await AsyncStorage.getItem(key); // Use AsyncStorage's getItem
    return value !== null ? JSON.parse(value) : null; // Return value or null if not found
  },

  // Remove an item from AsyncStorage
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key); // Use AsyncStorage's removeItem
  },
};

export default storage;
