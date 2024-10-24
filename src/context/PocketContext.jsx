import React, {
  useEffect,
  useState,
  createContext,
  useMemo,
  useCallback,
  useContext,
} from "react";
import PocketBase from "pocketbase";

const BASE_URL = "http://127.0.0.1:8090"; // Your PocketBase URL
const PocketContext = createContext({});

// Debounce function to limit the rate of invoking a function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const PocketProvider = ({ children }) => {
  const pb = useMemo(() => new PocketBase(BASE_URL), []);
  const [user, setUser] = useState(pb.authStore.model);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [isFetching, setIsFetching] = useState(false); // State to track fetching status

  // Debounced function for fetching user data
  const fetchUserData = useCallback(
    debounce(async () => {
      if (!pb.authStore.isValid) {
        console.warn("No user logged in or invalid user ID, skipping fetch.");
        return; // Skip fetching user data if not authenticated
      }

      setIsFetching(true); // Set loading state
      try {
        const userId = pb.authStore.model?.id;
        const userData = await pb.collection("users").getOne(userId);
        setUser(userData); // Update user state with fetched data
      } catch (error) {
        if (error.code === 0) {
          console.warn(
            "Fetch request was autocancelled, possibly due to concurrent requests."
          );
        } else {
          console.error("Failed to fetch user data", error);
        }
      } finally {
        setIsFetching(false); // Reset loading state
      }
    }, 300), // Adjust the debounce delay as needed
    [pb]
  );

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((model) => {
      setUser(model);
      setIsAuthenticated(!!model);
      if (model) {
        fetchUserData(); // Fetch user data when user model changes
      }
    });

    return () => {
      unsubscribe();
    };
  }, [pb, fetchUserData]);

  // Register function includes username, email, and password
  const register = useCallback(
    async (username, email, password) => {
      try {
        return await pb.collection("users").create({
          username,
          email,
          password,
          passwordConfirm: password, // Confirm password
        });
      } catch (error) {
        console.error("Registration failed", error);
        throw error; // Rethrow the error to handle it in the component
      }
    },
    [pb]
  );

  // Login function
  const login = useCallback(
    async (email, password) => {
      try {
        await pb.collection("users").authWithPassword(email, password);
        setIsAuthenticated(true);
        fetchUserData(); // Fetch user data immediately after login
      } catch (error) {
        console.error("Login failed", error);
        throw error;
      }
    },
    [pb, fetchUserData]
  );

  // Logout function
  const logout = async () => {
    try {
      await pb.authStore.clear(); // Clear the auth store
      setUser(null); // Set user to null
      setIsAuthenticated(false); // Update authentication state
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Update email function
  const updateEmail = async (newEmail, currentPassword) => {
    if (!user || !currentPassword || !newEmail) {
      console.log(user, currentPassword, newEmail); // Log to debug
      throw new Error("Email or password cannot be blank");
    }
    try {
      console.log(
        "Attempting to authenticate with:",
        user.email,
        currentPassword
      );

      // Authenticate with the current password
      await pb
        .collection("users")
        .authWithPassword(user.email, currentPassword);

      // Request email change
      await pb.collection("users").requestEmailChange(newEmail);
      console.log("Email change request sent successfully");
    } catch (error) {
      console.error("Email update failed", error);
      throw new Error("Email update failed: " + error.message);
    }
  };

  // Update password function
  const updatePassword = async (currentPassword, newPassword) => {
    if (!user || !currentPassword || !newPassword) {
      throw new Error("Current password and new password cannot be blank");
    }

    try {
      console.log(
        "Attempting to authenticate with:",
        user.email,
        currentPassword
      );

      // Authenticate with the current password
      await pb
        .collection("users")
        .authWithPassword(user.email, currentPassword);

      // Update password
      await pb.collection("users").update(user.id, {
        oldPassword: currentPassword, // Include the current password
        password: newPassword, // New password
        passwordConfirm: newPassword, // Password confirmation
      });

      console.log("Password updated successfully");
    } catch (error) {
      console.error("Password update failed", error);
      throw new Error("Password update failed: " + error.message);
    }
  };

  // Password reset function
  const resetPassword = async (email) => {
    if (!email) {
      throw new Error("Email cannot be blank");
    }
    try {
      await pb.collection("users").requestPasswordReset(email);
      console.log("Reset link sent successfully");
    } catch (error) {
      console.error("Failed to send reset link", error);
      throw new Error("Failed to send reset link: " + error.message);
    }
  };

  // Delete account function
  const deleteAccount = async () => {
    try {
      const userId = user?.id; // Use optional chaining to safely access user.id
      if (!userId) {
        console.log("User not found or not authenticated.");
        throw new Error("User not found or not authenticated."); // Ensure this is clear
      }

      console.log("Deleting account for user ID:", userId);

      // Make the delete request using the correct endpoint and user ID
      await pb.collection("users").delete(userId);
      pb.authStore.clear(); // Clear auth data after deletion
      console.log("Account deleted successfully");
    } catch (error) {
      console.error("Failed to delete account", error);
      throw new Error("Failed to delete account: " + error.message);
    }
  };

  return (
    <PocketContext.Provider
      value={{
        register,
        login,
        logout,
        updateEmail,
        updatePassword,
        resetPassword, // Expose the resetPassword function
        deleteAccount, // Expose the deleteAccount function
        fetchUserData, // Expose the fetchUserData function
        pb,
        user,
        isAuthenticated,
        isFetching, // Expose fetching status
      }}
    >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);
