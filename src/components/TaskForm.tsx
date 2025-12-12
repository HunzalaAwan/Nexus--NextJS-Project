"use client";

import { useFormStatus } from "react-dom";
import { createTask } from "@/app/actions";
import styles from "./TaskForm.module.css";
import { useRef } from "react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button className={styles.button} type="submit" disabled={pending}>
            {pending ? "Adding..." : "Add Task"}
        </button>
    );
}

export default function TaskForm() {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            className={styles.form}
            ref={formRef}
            action={async (formData) => {
                await createTask(formData);
                formRef.current?.reset();
            }}
        >
            <input
                type="text"
                name="title"
                placeholder="What's your focus today?"
                required
                className={styles.input}
                autoComplete="off"
            />
            <SubmitButton />
        </form>
    );
}
