import { usePocket } from "../context/PocketContext";

export default function LoggedIn() {
  const { logout } = usePocket();

  return (
    <div>
      <p>You are logged in!</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        Log Out
      </button>
    </div>
  );
}
