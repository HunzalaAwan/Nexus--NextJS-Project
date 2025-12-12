import { getTasks } from "@/lib/data";
import TaskItem from "./TaskItem";
// No css module needed for simple list definition unless we want container styles.

export default async function TaskList() {
    const tasks = await getTasks();

    // Sort tasks: pending first, then by creation date (newest first)
    const sortedTasks = tasks.sort((a, b) => {
        if (a.isCompleted === b.isCompleted) {
            return b.createdAt - a.createdAt;
        }
        return a.isCompleted ? 1 : -1;
    });

    if (sortedTasks.length === 0) {
        return (
            <div style={{ textAlign: "center", color: "#888", marginTop: "4rem" }}>
                <p>No tasks yet. Start by adding one above!</p>
            </div>
        );
    }

    return (
        <div style={{ width: "100%" }}>
            {sortedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}
