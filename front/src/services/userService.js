import { getErrorType, http } from "../services/httpService";

export const getUsersService = async (q = "", offset = 1) => {
   try {
      return await http.get("users", {
         params: {
            user: q,
            offset
         }
      });
   } catch (error) {
      return getErrorType(error);
   }
};

export const addUserService = async (data) => {
   try {
      return await http.post("users", data);
   } catch (error) {
      return getErrorType(error);
   }
};