import React from 'react';

interface GcodeOutputProps {
  gcode: string;
  copyGcode: () => void;
}

const GcodeOutput: React.FC<GcodeOutputProps> = ({ gcode, copyGcode }) => {
  if (!gcode) return null;

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-2">🧾 G-Code</h2>
      <textarea
        className="w-full p-2 border h-48 text-xs font-mono"
        readOnly
        value={gcode}
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={copyGcode}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Copy
        </button>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default GcodeOutput;