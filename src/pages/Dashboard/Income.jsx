// pages/Income/Income.jsx
import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/layouts/Modal';
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import EditIncomeForm from "../../components/Income/EditIncomeForm";
import { toast } from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/layouts/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
    useUserAuth();
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, id: null });
    const [openEditIncomeModal, setOpenEditIncomeModal] = useState({ show: false, data: null });

    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
            setIncomeData(response.data);
        } catch (error) {
            console.error("Error fetching income:", error);
            toast.error("Failed to fetch income data.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddIncome = async (income) => {
        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, income);
            setOpenAddIncomeModal(false);
            toast.success("Income added successfully.");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error adding income:", error);
            toast.error(error.response?.data?.message || "Failed to add income.");
        }
    };

    const handleUpdateIncome = async (income) => {
        const idToUpdate = openEditIncomeModal.data.id;
        try {
            await axiosInstance.put(API_PATHS.INCOME.DELETE_INCOME(idToUpdate), income);
            setOpenEditIncomeModal({ show: false, data: null });
            toast.success("Income updated successfully.");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error updating income:", error);
            toast.error(error.response?.data?.message || "Failed to update income.");
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
            setOpenDeleteAlert({ show: false, id: null });
            toast.success("Income deleted successfully.");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error deleting income:", error);
            toast.error(error.response?.data?.message || "Failed to delete income.");
        }
    };

    // --- FUNGSI DOWNLOAD DITAMBAHKAN DI SINI ---
    const handleDownloadIncomeDetails = async () => {
        toast.loading("Preparing download...");
        try {
            const response = await axiosInstance.get(
                API_PATHS.INCOME.DOWNLOAD_INCOME,
                { responseType: "blob" } // Penting untuk download file
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `income_details_${new Date().getTime()}.xlsx`);
            document.body.appendChild(link);
            link.click();

            toast.dismiss();
            toast.success("Download started!");

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            toast.dismiss();
            console.error("Error downloading income details:", error);
            toast.error("Failed to download. Please try again.");
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
    }, []);

    return (
        <DashboardLayout activeMenu="Income">
            <div className="p-4 md:p-8">
                <IncomeOverview
                    transactions={incomeData}
                    onAddIncome={() => setOpenAddIncomeModal(true)}
                />

                <IncomeList
                    transactions={incomeData}
                    onDelete={(id) => setOpenDeleteAlert({ show: true, id: id })}
                    onEdit={(income) => setOpenEditIncomeModal({ show: true, data: income })}
                    onDownload={handleDownloadIncomeDetails} // <-- PROP onDownload DITAMBAHKAN DI SINI
                />
            </div>
            
            {/* Modal untuk Add, Edit, dan Delete */}
            <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add New Income">
                <AddIncomeForm onAddIncome={handleAddIncome} />
            </Modal>
            <Modal isOpen={openEditIncomeModal.show} onClose={() => setOpenEditIncomeModal({ show: false, data: null })} title="Edit Income">
                <EditIncomeForm onUpdateIncome={handleUpdateIncome} existingIncome={openEditIncomeModal.data} />
            </Modal>
            <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, id: null })} title="Confirm Deletion">
                <DeleteAlert content="Are you sure you want to delete this income record?" onDelete={() => deleteIncome(openDeleteAlert.id)} onCancel={() => setOpenDeleteAlert({ show: false, id: null })} />
            </Modal>
        </DashboardLayout>
    );
};

export default Income;