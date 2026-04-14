import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError("Please enter email and password");
                return;
            }

            const res = await API.post("/auth/login", { email, password });

            localStorage.setItem("token", res.data.token);

            const decoded = JSON.parse(
                atob(res.data.token.split(".")[1])
            );

            localStorage.setItem("user", JSON.stringify(decoded));

            navigate("/dashboard");

        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">

            {/* LEFT */}
            <div className="md:w-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white flex flex-col justify-center items-center p-6 md:p-10 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Welcome Back
                </h1>
                <p className="text-sm md:text-lg">
                    Login to manage your tasks and projects
                </p>
            </div>

            {/* RIGHT */}
            <div className="md:w-1/2 flex justify-center items-center bg-gray-100 p-4">

                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md">

                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                        Sign In
                    </h2>

                    <p className="text-gray-500 mb-6 text-sm">
                        Enter your credentials
                    </p>

                    {error && (
                        <p className="text-red-500 mb-3 text-sm">{error}</p>
                    )}

                    <div className="space-y-3">

                        <input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-2 rounded text-sm"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 rounded text-sm"
                        />

                        <button
                            onClick={handleLogin}
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg text-sm md:text-base"
                        >
                            LOGIN
                        </button>

                        <p className="text-sm text-center">
                            Don’t have an account?{" "}
                            <Link to="/register">Register</Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;