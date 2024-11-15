export async function fetchUsers() {
    const response = await fetch('http://localhost:4000/users');
    const userData = await response.json();
    return userData.data;
}