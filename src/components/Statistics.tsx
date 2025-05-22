import React from 'react';
 import type {Statistics as StatsType} from '../types';

interface StatisticsProps {
  statistics: StatsType | null;
}

const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  if (!statistics) return null;

  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">📊 Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <div>
          Efficiency: <b>{statistics.efficiency}%</b>
        </div>
        <div>
          Waste: <b>{statistics.wastePercentage}%</b>
        </div>
        <div>
          Total Cuts: <b>{statistics.totalCuts}</b>
        </div>
        <div>
          Unplaced: <b>{statistics.unplacedPanels}</b>
        </div>
      </div>
    </div>
  );
};

export default Statistics;