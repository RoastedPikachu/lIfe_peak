export const apiPort = "http://localhost:3001/api";

export const checkAuthStatus = (): boolean => {
  try {
    return localStorage.getItem("token") !== null;
  } catch (error) {
    console.error("Ошибка при проверке localStorage:", error);

    return false;
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();

    console.log("LocalStorage очищен.");
  } catch (error) {
    console.error("Ошибка при очистке LocalStorage:", error);
  }
};
