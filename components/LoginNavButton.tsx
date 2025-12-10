"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginNavButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const logged = localStorage.getItem("logged_in") === "true";
        setIsLoggedIn(logged);
    }, []);

    return (
        <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
        >
            {isLoggedIn ? "Change Account" : "Login"}
        </Link>
    );
}
