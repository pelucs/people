import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
}

export function getUser(): User | null {
  const token = cookies().get("token")?.value;
  
  if(!token){
    return null
  }

  const user: User = jwtDecode<User>(token);

  return user;
}