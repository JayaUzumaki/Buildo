import { useState, useEffect } from "react";
import { usePocket } from "../context/PocketContext";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export const RequireAuth = () => {
  const { user, pb } = usePocket(); // Access PocketBase instance if needed
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume a valid token check
    if (pb.authStore.isValid) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [pb]);

  if (loading) {
    return <div>Loading...</div>; // Optional: Add a spinner or loading animation
  }

  return user ? <LoggedIn /> : <LoggedOut />;
};
