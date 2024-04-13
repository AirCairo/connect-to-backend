import { useEffect, useRef, useState } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    // // afterRender
    // useEffect(() => {
    //   // Side Effect
    //   if (ref.current) ref.current.focus();
    // });
  
    useEffect(() => {
      document.title = "My App - Connecting to Backend";
  
      setLoading(true);
  
      const { request, cancel } = userService.getAll<User>();
      request
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
      // .finally(() => {
      //   setLoading(false);
      // });
      return () => cancel();
  
      // const fetchUsers = async () => {
      //   //try {
      //   //const result = await apiClient // get -> await promise -> response / error
      //   apiClient // get -> await promise -> response / error
      //     .get<User[]>("/users", {
      //       signal: controller.signal,
      //     })
      //     .then((response) => setUsers(response.data))
      //     .catch((err) => setError(err.message));
      //   return () => controller.abort();
      //   //   setUsers(result.data);
      //   // } catch (error) {
      //   //   setError((error as apiClientError).message);
      //   // }
      // };
  
      // //return
  
      // fetchUsers();
  
      // connect();12
      // return () => disconnect();
    }, []);
  
    return {users, error, isLoading, setUsers, setError};
}

export default useUsers;