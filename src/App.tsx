import { useEffect, useState } from 'react';

import type { User } from '@/types';

import { getUsers } from '@/lib/getUsers';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUsersData() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    getUsersData();
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log(users);

  return (
    <>
      <h1>Users</h1>
      {users.map((user: User) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <h2>{user.lastName}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </>
  );
}
