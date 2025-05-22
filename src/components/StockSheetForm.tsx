import React from 'react';
import type { StockSheet } from '../types';
 
interface StockSheetFormProps {
  stockSheet: StockSheet;
  setStockSheet: React.Dispatch<React.SetStateAction<StockSheet>>;
  units: string;
}

const StockSheetForm: React.FC<StockSheetFormProps> = ({ stockSheet, setStockSheet, units }) => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-lg font-bold mb-2">📏 Stock Sheet ({units})</h2>
      <input
        type="number"
        className="border p-2 mb-2 w-full"
        placeholder="Width"
        value={stockSheet.w}
        onChange={(e) =>
          setStockSheet({
            ...stockSheet,
            w: parseFloat(e.target.value) || 0,
          })
        }
      />
      <input
        type="number"
        className="border p-2 mb-2 w-full"
        placeholder="Height"
        value={stockSheet.h}
        onChange={(e) =>
          setStockSheet({
            ...stockSheet,
            h: parseFloat(e.target.value) || 0,
          })
        }
      />
    </div>
  );
};

export default StockSheetForm;