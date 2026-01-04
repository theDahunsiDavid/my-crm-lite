"use client"

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createClient();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        if (data.user) {
            router.push('/dashboard');
        }
    }

    return (
        <div className="">
            <div className="">
                <div>
                    <h2 className="">Create Account</h2>
                </div>

                <form onSubmit={handleSignUp} className="">
                    {error && (
                        <div className="">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className=""
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className=""
                        />
                    </div>

                    <button type="submit" disabled={loading} className="">
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <p className="">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}