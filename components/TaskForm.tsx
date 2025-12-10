"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTaskContext } from "@/contexts/TaskContext";

export function AddTaskForm() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { addTask } = useTaskContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        await addTask({ title, description });
        setTitle("");
        setDescription("");
        setIsExpanded(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey && title.trim()) {
            e.preventDefault();
            handleSubmit(e);
        }
        if (e.key === "Escape") {
            setIsExpanded(false);
            setTitle("");
            setDescription("");
        }
    };

    if (!isExpanded) {
        return (
            <button
                onClick={() => setIsExpanded(true)}
                className="cursor-pointer w-full p-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors duration-200 flex items-center gap-3 text-muted-foreground hover:text-foreground group"
            >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                    <Plus className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">Add a new task</span>
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-card rounded-lg p-4 task-card-shadow animate-scale-in space-y-3 border-2">
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Your task title"
                className="border-0 px-3 py-2 focus-visible:ring-0 text-base placeholder:text-muted-foreground/60 rounded-md w-full bg-gray-100"
                autoFocus
            />
            <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a description"
                className="min-h-[60px] resize-none border-0 px-3 py-2 focus-visible:ring-0 placeholder:text-muted-foreground/60 rounded-md w-full bg-gray-100"
                rows={3}
            />
            <div className="flex gap-2 justify-end pt-2 border-t border-border">
                <Button type="button" variant="ghost" onClick={() => { setIsExpanded(false); setTitle(""); setDescription(""); }} className="cursor-pointer">
                    Cancel
                </Button>
                <Button type="submit" disabled={!title.trim() || !description.trim()} className="cursor-pointer">Add Task</Button>
            </div>
        </form>
    );
}
