export async function getUsers() {
  const response = await fetch('http://localhost:1234/api/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}
