import React from 'react';
import { BarChart, PieChart, TrendingUp, Download } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Reports
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Analyze your medication adherence and health trends
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg shadow-indigo-500/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <BarChart className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Adherence Rate</h2>
            </div>
            <select className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            [Adherence Chart Placeholder]
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg shadow-indigo-500/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Medicine Distribution</h2>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            [Distribution Chart Placeholder]
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg shadow-indigo-500/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Trends</h2>
            </div>
          </div>
          <div className="space-y-4">
            {['Morning', 'Afternoon', 'Evening'].map((time) => (
              <div key={time} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{time}</span>
                  <span className="text-green-600">92% adherence</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg shadow-indigo-500/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Export Reports</h2>
            </div>
          </div>
          <div className="space-y-3">
            {['Monthly Summary', 'Adherence Report', 'Medicine Schedule', 'Doctor\'s Report'].map((report) => (
              <button
                key={report}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-900">{report}</span>
                <Download className="w-5 h-5 text-gray-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;