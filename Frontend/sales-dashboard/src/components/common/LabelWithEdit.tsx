import React from "react";
import { Pencil } from 'lucide-react';

export interface LabelWithEditProps {
  label: string;
  onEdit: () => void;
}

const LabelWithEdit: React.FC<LabelWithEditProps> = ({ label, onEdit }) => {
  return (
    <div className="relative group flex items-center min-w-[100px]">
      <span className="pr-2">{label}</span>
      <button
        type="button"
        onClick={onEdit}
        aria-label="Edit label"
        className="invisible group-hover:visible p-1 rounded hover:bg-accent transition"
      >
        <Pencil size={16} className="text-muted-foreground" />
      </button>
    </div>
  );
};

export default LabelWithEdit;
