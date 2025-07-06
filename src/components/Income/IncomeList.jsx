import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const IncomeList = ({ transactions, onDelete, onEdit, onDownload }) => {
  return (
    <div className="card bg-base-100 shadow-xl mt-6">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-primary">Income Sources</h2>
          {/* Pastikan onClick memanggil prop onDownload */}
          <button className="flex items-center gap-2 text-sm font-medium text-primary hover:underline" onClick={onDownload}>
            <LuDownload />
            <span>Download</span>
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {transactions?.map((income) => (
            <TransactionInfoCard
              key={income.id}
              transaction={income}
              type="income"
              onDelete={() => onDelete(income.id)}
              onEdit={() => onEdit(income)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default IncomeList;