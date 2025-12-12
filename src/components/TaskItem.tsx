"use client";

import { Task } from "@/types";
import { toggleTask, deleteTask } from "@/app/actions";
import styles from "./TaskItem.module.css";
import { useTransition } from "react";

export default function TaskItem({ task }: { task: Task }) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            try {
                await toggleTask(task.id);
            } catch (err) {
                console.error("Failed to toggle task", err);
            }
        });
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        startTransition(async () => {
            try {
                await deleteTask(task.id);
            } catch (err) {
                console.error("Failed to delete task", err);
            }
        });
    };

    // Optimistic UI could be handled with useOptimistic in Next.js, 
    // but for this simple interaction, pending state is sufficient.

    return (
        <div
            className={`${styles.item} ${task.isCompleted ? styles.completed : ""} ${isPending ? styles.pending : ""}`}
            onClick={handleToggle}
            role="button"
            tabIndex={0}
        >
            <div className={styles.checkbox}>
                {task.isCompleted && <span className={styles.checkIcon}>✓</span>}
            </div>
            <span className={styles.title}>{task.title}</span>
            <button
                className={styles.deleteBtn}
                onClick={handleDelete}
                disabled={isPending}
                aria-label="Delete task"
            >
                ×
            </button>
        </div>
    );
}
