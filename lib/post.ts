export async function post(message:string,userId:string) {
    return fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message,userId }),
    });
  }
  
