import {
  useUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
} from '../hooks/useUsers';

export default function UsersPage() {
  const { data: users, isLoading, isError } = useUsersQuery();
  const createUserMutation = useCreateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      <h2>Users</h2>
      {createUserMutation.isError}
      {createUserMutation.isSuccess}

      <button
        onClick={() =>
          createUserMutation.mutate({
            name: 'Ali',
            email: 'ali@mail.com',
            password: '113456',
          })
        }
      >
        Add User
      </button>

      <ul>
        {users?.map((u) => (
          <li key={u._id}>
            {u.name} — {u.email}
            <button onClick={() => deleteUserMutation.mutate(u._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
