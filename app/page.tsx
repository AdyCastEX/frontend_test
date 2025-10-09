import Image from "next/image";
import styles from "./page.module.css";

import Gallery from "./gallery";

export default async function Home() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) throw new Error("Failed to fetch users");
    const users = await res.json();

    return (
      <main className={styles.main}>
        <Gallery users={users} />
      </main>
    );
  } catch (error) {
    return (
      <main className={styles.main}>
        <p>Data failed to load.</p>
      </main>
    );
  }
}
