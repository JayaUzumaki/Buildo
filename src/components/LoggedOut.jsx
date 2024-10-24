import { useState } from "react";
import { usePocket } from "../context/PocketContext";

export default function LoggedOut() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, login } = usePocket();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      console.log("User Created");
      await login(email, password); // Automatically log in after registration
      console.log("Logged in");
    } catch (error) {
      console.error("Registration or login failed", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("Logged in");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Sign Up button */}
      <button onClick={handleRegister}>Sign Up</button>

      {/* Sign In button */}
      <button onClick={handleLogin}>Sign In</button>
    </form>
  );
}
