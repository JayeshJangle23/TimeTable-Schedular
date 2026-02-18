// // import { createContext, useEffect, useState } from "react";
// // import API from "../api/axios";

// // export const AuthContext = createContext();

// // export default function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const fetchUser = async () => {
// //     try {
// //       const { data } = await API.get("/user/me");
// //       setUser(data);
// //     } catch {
// //       setUser(null);
// //     }
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     fetchUser();
// //   }, []);

// //   return (
// //     <AuthContext.Provider value={{ user, setUser }}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // }

// import { createContext, useEffect, useState } from "react";
// import API from "../api/axios";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   const fetchUser = async () => {
//     try {
//       const { data } = await API.get("/user/me");
//       setUser(data);
//     } catch {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

import React, { createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AuthService } from "../services/auth.service";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    try {
      const me = await AuthService.me(); // backend returns user object directly
      setUser(me || null);
      return me;
    } catch {
      setUser(null);
      return null;
    } finally {
      setBooting(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const register = async (payload) => {
    setLoading(true);
    try {
      await AuthService.register(payload);
      toast.success("Registered");
      await refresh();
    } catch (e) {
      toast.error(e.friendlyMessage || "Register failed");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      await AuthService.login(payload); // sets cookie token
      toast.success("Logged in");
      await refresh();
    } catch (e) {
      toast.error(e.friendlyMessage || "Login failed");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AuthService.logout();
      toast.success("Logged out");
    } catch (e) {
      toast.error(e.friendlyMessage || "Logout failed");
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthed: !!user,
      booting,
      loading,
      login,
      register,
      logout,
      refresh,
    }),
    [user, booting, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
