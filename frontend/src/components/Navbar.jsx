import { useState } from "react";

function Navbar() {
    const [open, setOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="bg-white shadow px-4 py-3 flex justify-between items-center">

            {/* LEFT */}
            <h1 className="text-lg md:text-xl font-bold text-purple-600">
                SaaS Platform
            </h1>

            {/* MOBILE MENU BUTTON */}
            <button
                className="md:hidden text-2xl"
                onClick={() => setOpen(!open)}
            >
                ☰
            </button>

            {/* CENTER (Desktop) */}
            <div className="hidden md:flex gap-6 text-gray-600">
                <button className="font-medium">Dashboard</button>
                <button className="bg-purple-100 px-3 py-1 rounded">Projects</button>
                <button>Users</button>
            </div>

            {/* RIGHT */}
            <div className="hidden md:flex items-center gap-3">
                <div className="bg-purple-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                    <p className="text-sm font-semibold">
                        {user?.email || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
            </div>

            {/* MOBILE DROPDOWN */}
            {open && (
                <div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-start p-4 gap-3 md:hidden z-50">
                    <button>Dashboard</button>
                    <button>Projects</button>
                    <button>Users</button>

                    <div className="flex items-center gap-2 mt-3">
                        <div className="bg-purple-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                            {user?.email?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                            <p className="text-sm">{user?.email}</p>
                            <p className="text-xs text-gray-500">{user?.role}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;