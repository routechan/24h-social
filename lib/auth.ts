export async function registerUser(name: string, email: string, password: string) {
    return fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  }
  