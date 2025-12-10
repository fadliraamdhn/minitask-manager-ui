"use client";

import DarkModeToggle from "@/components/DarkModeToggle";
import { AddTaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { TaskProvider } from "@/contexts/TaskContext";
import { CheckSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            router.replace("/login");
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-2xl mx-auto px-4 py-12">
                <header className="mb-10 animate-fade-in flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                            <CheckSquare className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">
                            Tasks
                        </h1>
                    </div>
                    <DarkModeToggle />
                </header>

                <TaskProvider>
                    <main className="space-y-6">
                        <AddTaskForm />
                        <TaskList />
                    </main>
                </TaskProvider>
            </div>
        </div>
    );
}
