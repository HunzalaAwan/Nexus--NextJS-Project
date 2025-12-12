"use server";

import { revalidatePath } from "next/cache";
import { getTasks, saveTasks } from "@/lib/data";
import { Task } from "@/types";
import { randomUUID } from "crypto";

export async function createTask(formData: FormData) {
    // Simulate network delay for effect
    await new Promise((resolve) => setTimeout(resolve, 500));

    const title = formData.get("title")?.toString();

    if (!title || title.trim().length === 0) {
        return;
    }

    const tasks = await getTasks();
    const newTask: Task = {
        id: randomUUID(),
        title: title.trim(),
        isCompleted: false,
        createdAt: Date.now(),
    };

    await saveTasks([newTask, ...tasks]);
    revalidatePath("/");
}

export async function toggleTask(id: string) {
    const tasks = await getTasks();
    const updatedTasks = tasks.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );

    await saveTasks(updatedTasks);
    revalidatePath("/");
}

export async function deleteTask(id: string) {
    const tasks = await getTasks();
    const filteredTasks = tasks.filter((t) => t.id !== id);

    await saveTasks(filteredTasks);
    revalidatePath("/");
}
