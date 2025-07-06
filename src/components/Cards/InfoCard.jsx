// components/Cards/InfoCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Impor Link

const InfoCard = ({ icon, label, value, colorClass, linkTo }) => {
  const cardContent = (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
      <div className="card-body flex-row items-center gap-4 p-5">
        <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center text-3xl text-white rounded-2xl ${colorClass}`}>
          {icon}
        </div>
        <div>
          <div className="text-sm text-base-content/70">{label}</div>
          <div className="text-xl font-semibold text-base-content">{value}</div>
        </div>
      </div>
    </div>
  );


  return linkTo ? <Link to={linkTo}>{cardContent}</Link> : <div>{cardContent}</div>;
};

export default InfoCard;