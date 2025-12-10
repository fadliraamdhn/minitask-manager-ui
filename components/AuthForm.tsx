"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";

interface AuthFormProps {
    type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const endpoint = type === "login" ? `/auth/login` : "/auth/register";
            const response = await api.post(endpoint, { 
                username, password 
            }, {
                withCredentials: true
            });

            if (type === "register") {
                setMessage(response.data.message || `${type} successful!`);
            }

            if (type === "login") {
                toast.success(response.data.message);
                localStorage.setItem("logged_in", "true");
                setTimeout(() => {
                    router.replace("/");
                    router.refresh();
                }, 200);
            }
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10 h-11"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 h-11"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>

            <Button
                type="submit"
                className="w-full h-11 font-medium group flex items-center justify-center gap-2 cursor-pointer"
            >
                <span>{type === "login" ? "Login" : "Register"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>

            {message && <p className="text-sm mt-2 text-red-600">{message}</p>}
        </form>
    );
}
