import jwt from "jsonwebtoken";

export const SECRET_KEY =
  "a4b3b679268e4582b61f969c8c62e73959dfcbddeff7fcc25f5016e8ff495cf593b94ee109ea8d9af520a7d5a6fda654206ca7c8080b8b97d735d98803db0b7c5258b1be1231daf53b78b5f59211863336795b9fd9317ece3a0f719bfb63f1e4e2649a85a996ceb65cb6b5ef24a81a88357602629bdc0dec3491d4103856e29d";

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

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const getUsernameFromToken = (token: string): string | null => {
  try {
    // Расшифровываем токен с помощью секретного ключа
    const decoded = jwt.verify(token, SECRET_KEY) as { username: string };
    return decoded.username; // Возвращаем имя пользователя
  } catch (err) {
    console.error("Ошибка при расшифровке токена:", err);
    return null; // Если токен недействителен или истек
  }
};
