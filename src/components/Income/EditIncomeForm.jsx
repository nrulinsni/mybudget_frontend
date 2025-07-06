// components/Income/EditIncomeForm.jsx
import React, { useState, useEffect } from 'react';
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup";
import moment from 'moment';

const EditIncomeForm = ({ onUpdateIncome, existingIncome }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    useEffect(() => {
        if (existingIncome) {
            setIncome({
                source: existingIncome.source || "",
                amount: existingIncome.amount || "",
                date: moment(existingIncome.date).format("YYYY-MM-DD"),
                icon: existingIncome.icon || "",
            });
        }
    }, [existingIncome]);

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance, Salary, etc"
                type="text"
            />
            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="500000"
                type="number"
            />
            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                type="date"
            />
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="btn btn-primary" // Warna biru
                    onClick={() => onUpdateIncome(income)}
                >
                    Update Income
                </button>
            </div>
        </div>
    )
}

export default EditIncomeForm;