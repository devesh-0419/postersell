// hooks/usePersistUser.js
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, selectUser } from "../app/userSlice";
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:4000";
export function usePersistUser() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const persistUser = async () => {
    try {
      if (!user) {
        const userData = await axios.get(`${backendUrl}/userdata`, { withCredentials: true });
        dispatch(setUser(userData.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return persistUser;
}
