import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import styles from "./page.module.css";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Nexus Tasks</h1>
        <p className={styles.subtitle}>Focus on what matters.</p>
      </header>

      <TaskForm />

      <Suspense fallback={<div style={{ textAlign: "center", color: "#666", marginTop: "2rem" }}>Loading tasks...</div>}>
        <TaskList />
      </Suspense>
    </main>
  );
}
