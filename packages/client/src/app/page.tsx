"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [apiResponse, setApiResponse] = useState<{data: number, message: string} | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/check`)
      .then((response) => response.json())
      .then((data) => setApiResponse(data))
      .catch((error) => console.error("Error fetching API:", error));
  }, []);

  useEffect(() => {
    console.log(apiResponse);
  }, [apiResponse]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>{apiResponse?.message}</p>
      </main>
    </div>
  );
}
