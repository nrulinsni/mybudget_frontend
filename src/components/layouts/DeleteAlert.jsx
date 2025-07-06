// layouts/DeleteAlert.jsx
import React from 'react';

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div>
      <p className="text-base-content/80">{content}</p>
      <div className="flex justify-end gap-3 mt-6">
        <button className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-error" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;