// pages/Dashboard/Home.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import { LuWallet, LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseCategoryChart from "../../components/Dashboard/ExpenseCategoryChart"; // <-- Impor komponen baru

const Home = () => {
    useUserAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
                setDashboardData(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <DashboardLayout activeMenu="Dashboard">
                <div className="flex justify-center items-center h-full">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </DashboardLayout>
        );
    }
    
    return (
        <DashboardLayout activeMenu="Dashboard">
            {/* Bagian Atas: 3 Info Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard
                    icon={<LuWallet />}
                    label="Total Balance"
                    value={dashboardData?.totalBalance || "Rp 0"}
                    colorClass="bg-primary"
                />
                <InfoCard
                    icon={<LuTrendingUp />}
                    label="Total Income"
                    value={dashboardData?.totalIncome || "Rp 0"}
                    colorClass="bg-success"
                    linkTo="/income"
                />
                <InfoCard
                    icon={<LuTrendingDown />}
                    label="Total Expense"
                    value={dashboardData?.totalExpenses || "Rp 0"}
                    colorClass="bg-error"
                    linkTo="/expense"
                />
            </div>

            {/* Bagian Bawah: Grid Utama yang lebih simpel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <RecentTransactions
                    transactions={dashboardData?.recentTransactions || []}
                />
                <div className="flex flex-col gap-6">
                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || "Rp 0"}
                        totalIncome={dashboardData?.totalIncome || "Rp 0"}
                        totalExpenses={dashboardData?.totalExpenses || "Rp 0"}
                    />
                    <ExpenseCategoryChart 
                        data={dashboardData?.expenseByCategory || []}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Home;