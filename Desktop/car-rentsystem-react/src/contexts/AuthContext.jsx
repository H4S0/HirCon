import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Importing PropTypes
import { supabase } from "../services/supabase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the initial session
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      setUser(session?.user ?? null);
    };

    fetchSession();

    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Clean up the subscription on component unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// Adding propTypes validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // children must be a valid React node
};
