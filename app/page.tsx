import styles from "./page.module.css";
import Gallery from "./gallery";
import { User } from "./types/user";

export default async function Home() {
  // Fetch user data from the API
  const res = await fetch("https://datausers-api.onrender.com/api/users", {
    cache: "no-store", // ensures fresh data each time (optional)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const users: User[] = await res.json();

  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
