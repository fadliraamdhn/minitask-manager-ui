import { useState } from "react";
import { Task } from "@/types/task";
import { Check, Pencil, Trash2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TaskCardProps {
    task: Task;
    onToggle: (id: number) => void;
    onUpdate: (id: number, title: string, description: string) => void;
    onDelete: (id: number) => void;
}

export function TaskCard({ task, onToggle, onUpdate, onDelete }: TaskCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || "");

    const isCompleted = task.status === "Complete";

    const handleSave = () => {
        if (editTitle.trim()) {
            onUpdate(task.id, editTitle.trim(), editDescription.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setEditDescription(task.description || "");
        setIsEditing(false);
    };

    return (
        <div
            className={cn(
                "group relative bg-card rounded-lg p-4 task-card-shadow transition-all duration-200 hover:task-card-shadow-hover animate-slide-up border-2",
                isCompleted && "opacity-60"
            )}
        >
            {isEditing ? (
                <div className="space-y-3">
                    <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Task title"
                        autoFocus
                    />
                    <Textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description"
                        className="min-h-[60px] resize-none"
                    />
                    <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={handleCancel} className="cursor-pointer">
                            <X className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                        <Button size="sm" onClick={handleSave}  className="cursor-pointer">
                            <Save className="h-4 w-4 mr-1" /> Save
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex gap-3">
                    <button
                        onClick={() => onToggle(task.id)}
                        className={cn(
                            "flex-shrink-0 w-5 h-5 mt-1 rounded-full border-2 transition-all duration-200 flex items-center justify-center cursor-pointer",
                            isCompleted
                                ? "bg-success border-success animate-check"
                                : "border-muted-foreground/40 hover:border-primary"
                        )}
                    >
                        {isCompleted && <Check className="h-3 w-3 text-success-foreground" />}
                    </button>

                    <div className="flex-1 min-w-0">
                        <h3
                            className={cn(
                                "font-medium text-card-foreground transition-all duration-200",
                                isCompleted && "line-through text-muted-foreground"
                            )}
                        >
                            {task.title}
                        </h3>
                        {task.description && (
                            <p
                                className={cn(
                                    "text-sm text-muted-foreground mt-1",
                                    isCompleted && "line-through"
                                )}
                            >
                                {task.description}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                            onClick={() => setIsEditing(true)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer"
                            onClick={() => onDelete(task.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
