import React, { useContext } from "react";
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutMenuItem = SIDE_MENU_DATA.find(item => item.label === "Logout");
    const LogoutIcon = logoutMenuItem ? logoutMenuItem.icon : null;

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    const handleClick = (item) => {
        if (item.path === "/logout") {
            handleLogout();
        } else {
            navigate(item.path);
        }
    };

    return (
        <aside className="w-64 h-screen bg-primary text-primary-content flex flex-col p-4">
            {/* Profile Section */}
            <div className="flex flex-col items-center text-center gap-2 py-4 border-b border-primary-focus">
                <CharAvatar
                    fullName={user?.fullName}
                    width="w-20"
                    height="h-20"
                    style="text-2xl"
                />
                <h5 className="font-semibold text-lg mt-2 truncate">{user?.fullName || ""}</h5>
            </div>

            {/* Menu Items Utama */}
            <div className="flex flex-col gap-2 mt-6 flex-grow">
                {SIDE_MENU_DATA.map((item) => {
                    if (item.label === "Logout") return null;
                    return (
                        <button
                            key={item.id}
                            className={`btn w-full justify-start text-base font-medium border-none ${
                                activeMenu === item.label
                                    ? "bg-base-100 text-primary"
                                    : "btn-ghost"
                            }`}
                            onClick={() => handleClick(item)}
                        >
                            <item.icon className="text-xl" />
                            {item.label}
                        </button>
                    );
                })}
            </div>

            {/* Tombol Logout */}
            <div className="mt-auto">

                {logoutMenuItem && LogoutIcon && (
                    <button
                        className="btn btn-ghost w-full justify-start text-base font-medium border-none"
                        onClick={() => handleClick(logoutMenuItem)}
                    >
                        <LogoutIcon className="text-xl" />
                        Logout
                    </button>
                )}
            </div>
        </aside>
    );
};

export default SideMenu;