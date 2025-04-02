export async function fetchUserProfile(userId:string) {
    return fetch(`/api/profile/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  }