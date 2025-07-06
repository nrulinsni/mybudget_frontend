import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-primary">Recent Transactions</h2>
          <button className="btn btn-ghost btn-sm text-primary" onClick={onSeeMore}>
            See All <LuArrowRight />
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {transactions?.slice(0, 5)?.map((item) => (
            <TransactionInfoCard
              key={`${item.type}-${item.id}`} 
              transaction={item}
              type={item.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;