// components/Expense/ExpenseList.jsx
import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const ExpenseList = ({ transactions, onDelete, onEdit, onDownload }) => {
  return (
    <div className="card bg-base-100 shadow-xl mt-6">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-primary">All Expenses</h2>
          <button className="flex items-center gap-2 text-sm font-medium text-primary hover:underline" onClick={onDownload}>
            <LuDownload />
            <span>Download</span>
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {transactions?.map((expense) => (
            <TransactionInfoCard
              key={expense.id}
              transaction={expense}
              type="expense"
              onDelete={() => onDelete(expense.id)}
              onEdit={() => onEdit(expense)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExpenseList;