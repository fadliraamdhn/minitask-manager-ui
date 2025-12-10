"use client";

import { TaskCard } from "./TaskCard";
import { ChevronLeft, ChevronRight, ClipboardList } from "lucide-react";
import { useTaskContext } from "@/contexts/TaskContext";

export function TaskList() {
    const { tasks, page, totalPages, fetchTasks, toggleTask, updateTask, deleteTask } = useTaskContext();

    const activeTasks = tasks.filter(t => t.status === "Inprogress");
    const completedTasks = tasks.filter(t => t.status === "Complete");

    const handlePrev = () => {
        if (page > 1) fetchTasks(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) fetchTasks(page + 1);
    };

    if (tasks.length === 0) {
        return (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ClipboardList className="h-8 w-8" />
            </div>
            <p className="text-lg font-medium">No tasks yet</p>
            <p className="text-sm mt-1">Add your first task to get started</p>
        </div>
        );
    }

    return (
        <div className="space-y-6">
            {activeTasks.length > 0 && (
                <div className="space-y-3">
                {activeTasks.map(task => (
                    <TaskCard key={task.id} task={task} onToggle={toggleTask} onUpdate={updateTask} onDelete={deleteTask} />
                ))}
                </div>
            )}
            {completedTasks.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-sm font-medium text-muted-foreground px-1">
                        Completed ({completedTasks.length})
                    </h2>
                    {completedTasks.map(task => (
                        <TaskCard key={task.id} task={task} onToggle={toggleTask} onUpdate={updateTask} onDelete={deleteTask} />
                    ))}
                </div>
            )}

            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="cursor-pointer flex items-center gap-1 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" /> Prev
                </button>

                <span className="text-gray-700 dark:text-gray-200 font-medium">
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="cursor-pointer flex items-center gap-1 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
