import styles from './page.module.css';

import Gallery from './gallery';

import { User } from './types/user';

export default async function Home() {
  const { users, isFetchError } = await fetchUsers();

  return (
    <main className={styles.main}>
      {isFetchError && (
        <div className={styles.error_container}>
          <h1 className='heading'> Something went wrong! </h1>
          <p className='name'>Unable to retrieve users.</p>
        </div>
      )}

      {!isFetchError && users.length === 0 && (
        <div className={styles.error_container}>
          <h1 className='heading'>Users</h1>
          <p className='name'>No users found.</p>
        </div>
      )}

      {!isFetchError && users.length > 0 && <Gallery users={users} />}
    </main>
  );
}

async function fetchUsers() {
  let users: User[] = [];
  let isFetchError = false;

  try {
    const usersApiRes = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );
    users = await usersApiRes.json();
  } catch {
    isFetchError = true;
  } finally {
    return { users, isFetchError };
  }
}
