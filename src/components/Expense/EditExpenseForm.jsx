// components/Expense/EditExpenseForm.jsx
import React, { useState, useEffect } from 'react';
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup";
import moment from 'moment';

const EditExpenseForm = ({ onUpdateExpense, existingExpense }) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    useEffect(() => {
        if (existingExpense) {
            setExpense({
                category: existingExpense.category || "",
                amount: existingExpense.amount || "",
                date: moment(existingExpense.date).format("YYYY-MM-DD"),
                icon: existingExpense.icon || "",
            });
        }
    }, [existingExpense]);

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Category"
                placeholder="Rent, Groceries, etc"
                type="text"
            />
            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="50000"
                type="number"
            />
            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                type="date"
            />
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onUpdateExpense(expense)}
                >
                    Update Expense
                </button>
            </div>
        </div>
    )
}

export default EditExpenseForm;