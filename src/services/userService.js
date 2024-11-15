export async function fetchUserInfo(id) {
    const response = await fetch(`http://localhost:4000/user/${id}`);
    const userData = await response.json();
    return userData.data;
}

export async function fetchUserActivities(id) {
    const response = await fetch(`http://localhost:4000/user/${id}/activity`);
    const userData = await response.json();
    return userData.data;
}

export async function fetchAverageSessions(id) {
    const response = await fetch(`http://localhost:4000/user/${id}/average-sessions`);
    const userData = await response.json();
    return userData.data;
}

export async function fetchUserPerformance(id) {
    const response = await fetch(`http://localhost:4000/user/${id}/performance`);
    const userData = await response.json();
    return userData.data;
}
