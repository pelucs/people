// import Cookies from "js-cookie";

// import { api } from "@/api/axios";
// import { User } from "@/types/user";
// import { createContext, ReactNode, useEffect, useState } from "react";

// interface UserContextProviderProps {
//   children: ReactNode;
// }

// interface UserContextTypes {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// export const UserContext = createContext({} as UserContextTypes);

// export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const token: { name: string, id: string } | undefined = Cookies.get("token")

//     if(token) {
//       const getUser = async () => {
//         const response = await api.get(`/user/${token.id}`)
//       }
//     }
//   })

//   return(
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }