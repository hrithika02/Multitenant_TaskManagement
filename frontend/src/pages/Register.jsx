import { useState } from "react";
import API from "../services/api";

function Register() {
    const [form, setForm] = useState({
        organization: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [role, setRole] = useState("MEMBER");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            if (e) e.preventDefault();

            if (!form.organization || !form.name || !form.email || !form.password) {
                alert("Please fill all fields");
                return;
            }

            if (form.password !== form.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const res = await API.post("/auth/register", {
                name: form.name,
                email: form.email,
                password: form.password,
                organizationName: form.organization,
                role: role
            });

            alert("Registered successfully ✅");
            window.location.href = "/";

        } catch (err) {
            alert(err.response?.data?.error || "Registration failed ❌");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">

            {/* LEFT SIDE */}
            <div className="md:w-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white flex flex-col justify-center items-center p-6 md:p-10 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome</h1>

                <p className="text-sm md:text-lg mb-6">
                    Create your organization account and start managing your projects efficiently
                </p>

                <ul className="space-y-2 text-xs md:text-sm">
                    <li>✔ Multi-tenant architecture</li>
                    <li>✔ Secure user management</li>
                    <li>✔ Project & task tracking</li>
                    <li>✔ Role-based access control</li>
                </ul>
            </div>

            {/* RIGHT SIDE */}
            <div className="md:w-1/2 flex justify-center items-center bg-gray-100 p-4">

                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md">

                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                        Create Your Account
                    </h2>

                    <p className="text-gray-500 mb-6 text-sm">
                        Fill in the details below to get started
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">

                        <input
                            name="organization"
                            placeholder="Organization Name"
                            onChange={handleChange}
                            className="w-full border p-2 rounded text-sm"
                        />

                        <select
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border p-2 rounded text-sm"
                        >
                            <option value="MEMBER">Member</option>
                            <option value="ADMIN">Admin</option>
                        </select>

                        <input
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="w-full border p-2 rounded text-sm"
                        />

                        <input
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full border p-2 rounded text-sm"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full border p-2 rounded text-sm"
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            className="w-full border p-2 rounded text-sm"
                        />

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg text-sm md:text-base"
                        >
                            CREATE ACCOUNT
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;