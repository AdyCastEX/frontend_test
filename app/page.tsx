'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

import Gallery from "./gallery";


export default function Home() {
  // data from https://jsonplaceholder.typicode.com/users
  
  const [users, setUsers] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!users) return <p>No users data</p>

  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
