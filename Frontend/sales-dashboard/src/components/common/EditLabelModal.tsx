import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface EditLabelModalProps {
  isOpen: boolean;
  label: string;
  onClose: () => void;
  onSave: (newLabel: string) => void;
}

const EditLabelModal: React.FC<EditLabelModalProps> = ({ isOpen, label, onClose, onSave }) => {
  const [inputValue, setInputValue] = useState(label);

  useEffect(() => {
    setInputValue(label);
  }, [label]);

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave(inputValue.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Label</DialogTitle>
        </DialogHeader>
        <Input
          autoFocus
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="mb-4 mt-2"
        />
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditLabelModal;
