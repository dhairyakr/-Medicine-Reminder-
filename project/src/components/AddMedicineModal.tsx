import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useMedicineContext } from '../context/MedicineContext';
import { Medicine } from '../types';
import { format } from 'date-fns';

interface AddMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  editMedicine?: Medicine;
}

const MEDICINE_COLORS = [
  { name: 'Indigo', value: '#4F46E5' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Teal', value: '#14B8A6' }
];

const initialFormState = {
  name: '',
  dosage: '',
  type: 'tablet',
  times: [] as string[],
  frequency: 'daily',
  notes: '',
  color: MEDICINE_COLORS[0].value,
  startDate: format(new Date(), 'yyyy-MM-dd'),
  endDate: ''
};

const AddMedicineModal: React.FC<AddMedicineModalProps> = ({ isOpen, onClose, editMedicine }) => {
  const { addMedicine, updateMedicine } = useMedicineContext();
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (editMedicine) {
      setFormData({
        name: editMedicine.name,
        dosage: editMedicine.dosage,
        type: editMedicine.type,
        times: editMedicine.times,
        frequency: editMedicine.frequency,
        notes: editMedicine.notes || '',
        color: editMedicine.color,
        startDate: format(editMedicine.startDate, 'yyyy-MM-dd'),
        endDate: editMedicine.endDate ? format(editMedicine.endDate, 'yyyy-MM-dd') : ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editMedicine, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const medicineData = {
      id: editMedicine?.id || Date.now().toString(),
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : null,
      taken: editMedicine?.taken || false,
    };

    if (editMedicine) {
      updateMedicine(medicineData);
    } else {
      addMedicine(medicineData);
    }
    
    handleCancel();
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {editMedicine ? 'Edit Medicine' : 'Add New Medicine'}
          </h2>
          <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medicine Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter medicine name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosage
            </label>
            <input
              type="text"
              required
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 500mg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="tablet">Tablet</option>
              <option value="capsule">Capsule</option>
              <option value="syrup">Syrup</option>
              <option value="injection">Injection</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              required
              onChange={(e) => {
                const timeValue = e.target.value;
                const [hours, minutes] = timeValue.split(':');
                const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
                const formattedHours = parseInt(hours) % 12 || 12;
                const formattedTime = `${formattedHours}:${minutes} ${period}`;
                setFormData({ ...formData, times: [formattedTime] });
              }}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date (Optional)
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                min={formData.startDate}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="daily">Daily</option>
              <option value="alternate">Alternate Days</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {MEDICINE_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`w-full h-8 rounded-lg border-2 transition-all ${
                    formData.color === color.value ? 'border-gray-900 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              placeholder="Add any additional notes"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {editMedicine ? 'Update Medicine' : 'Add Medicine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;