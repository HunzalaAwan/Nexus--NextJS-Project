import { Task } from "@/types";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data.json");

export async function getTasks(): Promise<Task[]> {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data) as Task[];
    } catch (error) {
        return [];
    }
}

export async function saveTasks(tasks: Task[]) {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(tasks, null, 2));
}
