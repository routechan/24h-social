export async function post(message:string,userId:number) {
    return fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message,userId }),
    });
  }
  
