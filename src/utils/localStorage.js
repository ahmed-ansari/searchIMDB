/* **************************\
Function: AsyncStorage.
Explanation:
This Function is used for fetching and saving the
values into Async storage.
============================
Creator: Ansari || Date: 2020-01-17
\************************** */

import AsyncStorage from "@react-native-async-storage/async-storage";
const Storage = {
    getItem: async (key) => {
        try {
            let result = await AsyncStorage.getItem(key);
            return JSON.parse(result);
        }
        catch (err) {
            throw err;
        }
    },
    setItem: async (key, value) => {
        try {
            const item = JSON.stringify(value);
            return await AsyncStorage.setItem(key, item);
        } catch (err) {
            throw err;
        }
    },
    pushItem: async (key, value, param) => {
        const _res = await Storage.getItem(key);
        if (_res === null || _res === undefined) {
            Storage.setItem(key, [value])
        } else {
            let res = null;
            const index = _res.findIndex(item => item[param] === value[param]);
            if (index === 0 || index > 0) {
                res = _res
            } else {
                res = [..._res, value];
            }
            Storage.setItem(key, res)
        }
    },
    removeItem: async (key, value, param) => {
        const _res = await Storage.getItem(key);
        const res = _res.filter(item => item[param] !== value[param]);
        Storage.setItem(key, res)
    }
}

export const FavouriteMoviesKey = '@FavouriteMovies';

export default Storage;