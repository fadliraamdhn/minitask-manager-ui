"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import api, { handleAxiosError } from "@/lib/axios";
import { Task, TaskCreate } from "@/types/task";
import { toast } from "sonner";

interface TaskContextType {
    tasks: Task[];
    page: number;           // tambahkan ini
    totalPages: number; 
    addTask: (task: TaskCreate) => Promise<void>;
    toggleTask: (id: number) => Promise<void>;
    updateTask: (id: number, title: string, description: string) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    fetchTasks: (pageNumber?: number) => Promise<void>;
    error: string | null;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async (pageNumber: number = 1) => {
        try {
            setError(null);
            const res = await api.get(`/task?page=${pageNumber}&limit=5`);
            setTasks(res.data.data.tasks);
            setPage(res.data.data.page);
            setTotalPages(res.data.data.totalPages);
        } catch (err: unknown) {
            setError(handleAxiosError(err));
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (task: TaskCreate) => {
        try {
            setError(null);
            const res = await api.post("/task", task);
            setTasks((prev) => [res.data.data, ...prev]);
            await fetchTasks(page)
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Login First")
        }
    };

    const toggleTask = async (id: number) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        const newStatus = task.status === "Complete" ? "Inprogress" : "Complete";

        try {
            setError(null);
            await api.patch(`/task/${id}`, { status: newStatus });
            setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
        } catch (err: unknown) {
            setError(handleAxiosError(err));
        }
    };

    const updateTask = async (id: number, title: string, description: string) => {
        try {
            setError(null);
            await api.patch(`/task/${id}`, { title, description });
            setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title, description } : t)));
        } catch (err: unknown) {
            setError(handleAxiosError(err));
        }
    };

    const deleteTask = async (id: number) => {
        try {
            setError(null);
            await api.delete(`/task/${id}`);
            if (tasks.length === 1 && page > 1) {
                await fetchTasks(page - 1);
            } else {
                await fetchTasks(page);
            }
        } catch (err: unknown) {
            setError(handleAxiosError(err));
        }
    };

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, toggleTask, updateTask, deleteTask, fetchTasks, error, page, totalPages }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTaskContext must be used within TaskProvider");
    return context;
};
