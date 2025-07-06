import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/layouts/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import EditExpenseForm from "../../components/Expense/EditExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/layouts/DeleteAlert";

const Expense = () => {
    useUserAuth();
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, id: null });
    const [openEditExpenseModal, setOpenEditExpenseModal] = useState({ show: false, data: null });

    // Pastikan fungsi ini lengkap
    const fetchExpenseDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
            setExpenseData(response.data);
        } catch (error) {
            console.error("Error fetching expense:", error);
            toast.error("Failed to fetch expense data.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpense = async (expense) => {
        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, expense);
            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully.");
            fetchExpenseDetails(); // Memanggil ulang data setelah berhasil menambah
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error(error.response?.data?.message || "Failed to add expense.");
        }
    };
    
    const handleUpdateExpense = async (expense) => {
        const idToUpdate = openEditExpenseModal.data.id;
        try {
            await axiosInstance.put(API_PATHS.EXPENSE.DELETE_EXPENSE(idToUpdate), expense);
            setOpenEditExpenseModal({ show: false, data: null });
            toast.success("Expense updated successfully.");
            fetchExpenseDetails(); // Memanggil ulang data setelah berhasil update
        } catch (error) {
            console.error("Error updating expense:", error);
            toast.error(error.response?.data?.message || "Failed to update expense.");
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, id: null });
            toast.success("Expense deleted successfully.");
            fetchExpenseDetails(); // Memanggil ulang data setelah berhasil hapus
        } catch (error) {
            console.error("Error deleting expense:", error);
            toast.error(error.response?.data?.message || "Failed to delete expense.");
        }
    };

    const handleDownloadExpenseDetails = async () => {
        toast.loading("Preparing download...");
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, { responseType: "blob" });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `expense_details_${new Date().getTime()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            toast.dismiss();
            toast.success("Download started!");
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.dismiss();
            console.error("Error downloading expense details:", error);
            toast.error("Failed to download. Please try again.");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
    }, []);

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="p-4 md:p-8">
                <ExpenseOverview
                    transactions={expenseData}
                    onAddExpense={() => setOpenAddExpenseModal(true)}
                />
                <ExpenseList
                    transactions={expenseData}
                    onDelete={(id) => setOpenDeleteAlert({ show: true, id: id })}
                    onEdit={(expense) => setOpenEditExpenseModal({ show: true, data: expense })}
                    onDownload={handleDownloadExpenseDetails}
                />
            </div>
            
            <Modal isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(false)} title="Add New Expense">
                <AddExpenseForm onAddExpense={handleAddExpense} />
            </Modal>
            
            <Modal isOpen={openEditExpenseModal.show} onClose={() => setOpenEditExpenseModal({ show: false, data: null })} title="Edit Expense">
                <EditExpenseForm onUpdateExpense={handleUpdateExpense} existingExpense={openEditExpenseModal.data} />
            </Modal>
            
            <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, id: null })} title="Confirm Deletion">
                <DeleteAlert
                    content="Are you sure you want to delete this expense record?"
                    onDelete={() => deleteExpense(openDeleteAlert.id)}
                    onCancel={() => setOpenDeleteAlert({ show: false, id: null })}
                />
            </Modal>
        </DashboardLayout>
    );
};

export default Expense;