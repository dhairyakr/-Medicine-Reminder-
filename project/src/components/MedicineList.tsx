import React, { useState } from 'react';
import { Clock, Edit2, Trash2, Pill, Droplets, Syringe } from 'lucide-react';
import { useMedicineContext } from '../context/MedicineContext';
import { Medicine } from '../types';
import AddMedicineModal from './AddMedicineModal';
import { format } from 'date-fns';

const getMedicineIcon = (type: string) => {
  switch (type) {
    case 'tablet':
    case 'capsule':
      return <Pill className="w-6 h-6" />;
    case 'syrup':
      return <Droplets className="w-6 h-6" />;
    case 'injection':
      return <Syringe className="w-6 h-6" />;
    default:
      return <Pill className="w-6 h-6" />;
  }
};

const MedicineList: React.FC = () => {
  const { medicines, toggleMedicineTaken, deleteMedicine } = useMedicineContext();
  const [editingMedicine, setEditingMedicine] = useState<Medicine | undefined>();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((medicine: Medicine) => (
          <div
            key={medicine.id}
            className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border-l-4`}
            style={{ borderLeftColor: medicine.color }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div style={{ color: medicine.color }}>
                  {getMedicineIcon(medicine.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{medicine.name}</h3>
                  <p className="text-sm text-gray-500">{medicine.dosage}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingMedicine(medicine)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteMedicine(medicine.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {medicine.times.join(', ')}
              </span>
            </div>

            <div className="text-sm text-gray-500 mb-4">
              <div>Start: {format(medicine.startDate, 'MMM d, yyyy')}</div>
              {medicine.endDate && (
                <div>End: {format(medicine.endDate, 'MMM d, yyyy')}</div>
              )}
            </div>

            {medicine.notes && (
              <p className="text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded">
                {medicine.notes}
              </p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 capitalize">
                {medicine.frequency}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={medicine.taken}
                  onChange={() => toggleMedicineTaken(medicine.id)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        ))}
      </div>

      <AddMedicineModal
        isOpen={!!editingMedicine}
        onClose={() => setEditingMedicine(undefined)}
        editMedicine={editingMedicine}
      />
    </>
  );
};

export default MedicineList;