import { AuthForm } from "@/components/AuthForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden bg-gray-100">
            <div className="w-full max-w-md relative animate-fade-in">
                <Card className="shadow-card border-border/50">
                    <CardHeader className="space-y-2 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 mx-auto">
                            <CheckSquare className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground">Mini Task Manager</h1>
                        <CardTitle className="text-2xl font-bold">Register</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <AuthForm type="register"/>
                        <p className="mt-4 text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary font-medium hover:underline">
                                Login
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
