import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskName: string;
  taskDescription: string;
  onSave: (name: string, description: string) => void;
}

function Modal({
  isOpen,
  onClose,
  taskName,
  taskDescription,
  onSave,
}: ModalProps) {
  const [name, setName] = React.useState(taskName);
  const [description, setDescription] = React.useState(taskDescription);

  React.useEffect(() => {
    setName(taskName);
    setDescription(taskDescription);
  }, [taskName, taskDescription]);

  const handleSave = () => {
    onSave(name, description);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Edit Task</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          placeholder="Task Name"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          placeholder="Task Description"
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
