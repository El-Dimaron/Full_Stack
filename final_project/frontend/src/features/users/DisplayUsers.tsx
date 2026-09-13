import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUsers } from "./usersSlice";

export function Users() {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const isLoading = useAppSelector((state) => state.users.isLoading);
  const error = useAppSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Users</h2>

      {users.map((user) => (
        <p key={user.id}>{user.login}</p>
      ))}
    </div>
  );
}
