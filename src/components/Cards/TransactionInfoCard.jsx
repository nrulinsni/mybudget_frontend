
import React from 'react';
import {
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2,
    LuPencil,
    LuLandmark
} from 'react-icons/lu';

const TransactionInfoCard = ({ transaction, type, onDelete, onEdit }) => {
    
    // but ubah ke format rp
    const formatToRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number || 0);
    };

    const isImageUrl = typeof transaction.icon === 'string' && transaction.icon.startsWith('http');
    const isEmoji = typeof transaction.icon === 'string' && /[^\u0000-\u00ff]/.test(transaction.icon);

    return (
        <div className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-base-200 transition-colors duration-200">
            {/* buat icon */}
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl rounded-full bg-primary/10 text-primary">
                {transaction.icon && (isImageUrl || isEmoji) ? (
                    isImageUrl ? <img src={transaction.icon} alt="" className="w-6 h-6" /> : <span>{transaction.icon}</span>
                ) : (
                    <LuLandmark />
                )}
            </div>

            {/* transakisi detail */}
            <div className="flex-1">
                <p className="text-sm font-semibold text-base-content">{transaction.source || transaction.category}</p>
                <p className="text-xs text-base-content/60 mt-1">{new Date(transaction.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            
            {/* amount*/}
            <div className="flex items-center gap-4">
                <div className={`badge ${type === 'income' ? 'badge-success' : 'badge-error'} text-white font-semibold gap-1`}>
                    {type === 'income' ? <LuTrendingUp size={14}/> : <LuTrendingDown size={14}/>}
                    {formatToRupiah(transaction.amount)}
                </div>
                
                {/* buat tombol edit & delete */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="btn btn-ghost btn-xs" onClick={onEdit}>
                        <LuPencil className="text-secondary" /> {/* Kuning */}
                    </button>
                    <button className="btn btn-ghost btn-xs" onClick={onDelete}>
                        <LuTrash2 className="text-error" /> {/* Merah */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;