import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../../config/superbaseClient';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Benutzerdaten laden
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser(); // Benutzer abfragen

      if (error) {
        console.error("Fehler beim Abrufen des Benutzers:", error);
      }

      setUser(user); 
      setLoading(false);  // Ladezustand beenden
    };

    fetchUser();
  }, []);

  if(loading)
  {
    return <></>;
  }

  if (!user && loading === false) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
