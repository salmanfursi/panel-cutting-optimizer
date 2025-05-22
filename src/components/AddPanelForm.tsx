
import React from 'react';
import type { Panel, StockSheet } from '../types';
  
interface AddPanelFormProps {
  newPanel: Panel;
  setNewPanel: React.Dispatch<React.SetStateAction<Panel>>;
  handleAddPanel: () => void;
  error: string;
  stockSheet: StockSheet;
}

const AddPanelForm: React.FC<AddPanelFormProps> = ({ 
  newPanel, 
  setNewPanel, 
  handleAddPanel, 
  error 
}) => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-lg font-bold mb-2">➕ Add Panel</h2>
      <input
        className="border p-2 mb-1 w-full"
        placeholder="Name"
        value={newPanel.name}
        onChange={(e) => setNewPanel({ ...newPanel, name: e.target.value })}
      />
      <input
        className="border p-2 mb-1 w-full"
        type="number"
        placeholder="Qty"
        value={newPanel.qty}
        onChange={(e) =>
          setNewPanel({ ...newPanel, qty: parseInt(e.target.value) || 1 })
        }
      />
      <input
        className="border p-2 mb-1 w-full"
        type="number"
        placeholder="Width"
        value={newPanel.w}
        onChange={(e) =>
          setNewPanel({ ...newPanel, w: parseFloat(e.target.value) || 0 })
        }
      />
      <input
        className="border p-2 mb-2 w-full"
        type="number"
        placeholder="Height"
        value={newPanel.h}
        onChange={(e) =>
          setNewPanel({ ...newPanel, h: parseFloat(e.target.value) || 0 })
        }
      />
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded w-full"
        onClick={handleAddPanel}
      >
        Add
      </button>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default AddPanelForm;