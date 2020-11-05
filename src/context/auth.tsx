import { createContext, useContext } from 'react';

// export interface AuthContextInterface {
//   value: boolean;
// }

// export const authContextDefaults: AuthContextInterface = {
//   value: false
// };


export const AuthContext = createContext<boolean>(false);

export function useAuth() {
  return useContext(AuthContext);
}