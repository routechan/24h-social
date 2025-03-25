export async function registerUser(name: string, email: string, password: string) {
    return fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  }
  
  // export async function loginUser(email:string,password:string){
  //   return fetch("/api/auth/login",{
  //     method:"POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   })
  // }

 