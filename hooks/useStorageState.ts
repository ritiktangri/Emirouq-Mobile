import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {}
  } else {
    try {
      if (value === null) {
        await AsyncStorage.removeItem(key);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } catch (e) {}
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  React.useEffect(() => {
    const fetchStorage = async () => {
      if (Platform.OS === 'web') {
        try {
          if (typeof localStorage !== 'undefined') {
            setState(localStorage.getItem(key));
          }
        } catch (e) {
          console.error('Local storage is unavailable:', e);
        }
      } else {
        try {
          const value = await AsyncStorage.getItem(key);
          setState(value);
        } catch (e) {
          console.error('AsyncStorage error:', e);
        }
      }
    };
    fetchStorage();
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}

export async function getStorageAsync(key: string) {
  if (Platform.OS === 'web') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  } else {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? item : null;
    } catch (error) {
      console.error('Error getting item from AsyncStorage:', error);
      return null;
    }
  }
}

export async function getStorageItemAsync(key: string) {
  if (Platform.OS === 'web') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  } else {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from AsyncStorage:', error);
      return null;
    }
  }
}

export async function removeStorageItemAsync(key: string) {
  if (Platform.OS === 'web') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
    }
  } else {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error);
    }
  }
}

export async function getAllKeysAsync() {
  if (Platform.OS === 'web') {
    try {
      const keys = Object.keys(localStorage);
      return keys;
    } catch (error) {
      console.error('Error getting all keys from localStorage:', error);
      return [];
    }
  } else {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error('Error getting all keys from AsyncStorage:', error);
      return [];
    }
  }
}

export async function multiGetStorageItemsAsync(keys: string[]) {
  if (Platform.OS === 'web') {
    try {
      const items = keys.map((key) => {
        const value = localStorage.getItem(key);
        return [key, value ? JSON.parse(value) : null];
      });
      return items;
    } catch (error) {
      console.error('Error in multiGet from localStorage:', error);
      return keys.map((key) => [key, null]);
    }
  } else {
    try {
      const items = await AsyncStorage.multiGet(keys);
      return items.map(([key, value]: any) => [key, value ? JSON.parse(value) : null]);
    } catch (error) {
      console.error('Error in multiGet from AsyncStorage:', error);
      return keys.map((key) => [key, null]);
    }
  }
}

export async function multiSetStorageItemsAsync(keyValuePairs: [string, any][]) {
  if (Platform.OS === 'web') {
    try {
      keyValuePairs.forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
    } catch (error) {
      console.error('Error in multiSet to localStorage:', error);
    }
  } else {
    try {
      const stringifiedPairs: any = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      await AsyncStorage.multiSet(stringifiedPairs);
    } catch (error) {
      console.error('Error in multiSet to AsyncStorage:', error);
    }
  }
}

export async function multiRemoveStorageItemsAsync(keys: string[]) {
  if (Platform.OS === 'web') {
    try {
      keys.forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error in multiRemove from localStorage:', error);
    }
  } else {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error in multiRemove from AsyncStorage:', error);
    }
  }
}

export async function clearStorageAsync() {
  if (Platform.OS === 'web') {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  } else {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  }
}

export async function mergeStorageItemAsync(key: string, value: any) {
  if (Platform.OS === 'web') {
    try {
      const existingItem = localStorage.getItem(key);
      const existingValue = existingItem ? JSON.parse(existingItem) : {};
      const newValue = { ...existingValue, ...value };
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error merging item in localStorage:', error);
    }
  } else {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error merging item in AsyncStorage:', error);
    }
  }
}

export async function multiMergeStorageItemsAsync(keyValuePairs: [string, any][]) {
  if (Platform.OS === 'web') {
    try {
      keyValuePairs.forEach(async ([key, value]) => {
        await mergeStorageItemAsync(key, value);
      });
    } catch (error) {
      console.error('Error in multiMerge to localStorage:', error);
    }
  } else {
    try {
      const stringifiedPairs: any = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      await AsyncStorage.multiMerge(stringifiedPairs);
    } catch (error) {
      console.error('Error in multiMerge to AsyncStorage:', error);
    }
  }
}
