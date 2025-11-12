export const getLocalStorage = <T>(value: string, defaultValue: T | T[]) => {
  const storage = localStorage.getItem(value);
  return storage !== null ? JSON.parse(storage) : defaultValue;
};
