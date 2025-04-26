import React, { createContext, useContext, useState } from 'react';
import { Medicine, Reminder } from '../types';
import { format, addDays } from 'date-fns';

interface MedicineContextType {
  medicines: Medicine[];
  reminders: Reminder[];
  addMedicine: (medicine: Medicine) => void;
  updateMedicine: (medicine: Medicine) => void;
  toggleMedicineTaken: (id: string) => void;
  deleteMedicine: (id: string) => void;
  addReminder: (reminder: Reminder) => void;
  getNextReminder: () => Reminder | null;
  getRemindersForDate: (date: Date) => Reminder[];
}

const initialMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Metformin',
    dosage: '500mg',
    type: 'tablet',
    times: ['8:00 AM', '2:30 PM', '9:00 AM'],
    frequency: 'daily',
    notes: 'Take with meals',
    taken: false,
    color: '#4F46E5',
    startDate: new Date(),
    endDate: addDays(new Date(), 30)
  },
  {
    id: '2',
    name: 'Vitamin D3',
    dosage: '2000 IU',
    type: 'capsule',
    times: ['10:00 AM'],
    frequency: 'daily',
    notes: 'Take after breakfast',
    taken: true,
    color: '#F59E0B',
    startDate: new Date(),
    endDate: null
  },
  {
    id: '3',
    name: 'Insulin',
    dosage: '10 units',
    type: 'injection',
    times: ['7:30 AM', '7:30 PM'],
    frequency: 'daily',
    notes: 'Check blood sugar before injection',
    taken: false,
    color: '#10B981',
    startDate: new Date(),
    endDate: null
  },
  {
    id: '4',
    name: 'Aspirin',
    dosage: '81mg',
    type: 'tablet',
    times: ['9:00 AM'],
    frequency: 'daily',
    notes: 'Take with food',
    taken: false,
    color: '#EF4444',
    startDate: new Date(),
    endDate: null
  },
  {
    id: '5',
    name: 'Omega-3',
    dosage: '1000mg',
    type: 'capsule',
    times: ['8:00 AM', '8:00 PM'],
    frequency: 'daily',
    notes: 'Take with meals',
    taken: false,
    color: '#8B5CF6',
    startDate: new Date(),
    endDate: null
  },
  {
    id: '6',
    name: 'Probiotic',
    dosage: '50 billion CFU',
    type: 'capsule',
    times: ['7:00 AM'],
    frequency: 'daily',
    notes: 'Take on empty stomach',
    taken: false,
    color: '#EC4899',
    startDate: new Date(),
    endDate: null
  }
];

const generateInitialReminders = (medicines: Medicine[]): Reminder[] => {
  const reminders: Reminder[] = [];
  const today = new Date();

  medicines.forEach(medicine => {
    if (medicine.endDate && medicine.endDate < today) return;
    
    medicine.times.forEach(time => {
      const [hours, minutes] = time.split(':');
      const [period] = time.split(' ');
      const hour = parseInt(hours) + (period === 'PM' && hours !== '12' ? 12 : 0);
      
      reminders.push({
        id: `${medicine.id}-${time}`,
        medicineId: medicine.id,
        medicineName: medicine.name,
        dosage: medicine.dosage,
        time,
        date: today,
        completed: false,
        color: medicine.color
      });

      // Add reminders for next 7 days
      for (let i = 1; i <= 7; i++) {
        const futureDate = addDays(today, i);
        if (medicine.endDate && futureDate > medicine.endDate) continue;
        
        reminders.push({
          id: `${medicine.id}-${time}-${i}`,
          medicineId: medicine.id,
          medicineName: medicine.name,
          dosage: medicine.dosage,
          time,
          date: futureDate,
          completed: false,
          color: medicine.color
        });
      }
    });
  });

  return reminders;
};

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

export const MedicineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [reminders, setReminders] = useState<Reminder[]>(generateInitialReminders(initialMedicines));

  const addMedicine = (medicine: Medicine) => {
    setMedicines([...medicines, medicine]);
    const newReminders = generateInitialReminders([medicine]);
    setReminders([...reminders, ...newReminders]);
  };

  const updateMedicine = (updatedMedicine: Medicine) => {
    setMedicines(medicines.map(medicine => 
      medicine.id === updatedMedicine.id ? updatedMedicine : medicine
    ));
    
    // Remove old reminders for this medicine
    const filteredReminders = reminders.filter(reminder => reminder.medicineId !== updatedMedicine.id);
    // Generate new reminders
    const newReminders = generateInitialReminders([updatedMedicine]);
    setReminders([...filteredReminders, ...newReminders]);
  };

  const toggleMedicineTaken = (id: string) => {
    setMedicines(
      medicines.map((medicine) =>
        medicine.id === id
          ? { ...medicine, taken: !medicine.taken }
          : medicine
      )
    );
  };

  const deleteMedicine = (id: string) => {
    setMedicines(medicines.filter((medicine) => medicine.id !== id));
    setReminders(reminders.filter((reminder) => reminder.medicineId !== id));
  };

  const addReminder = (reminder: Reminder) => {
    setReminders([...reminders, reminder]);
  };

  const getNextReminder = (): Reminder | null => {
    const now = new Date();
    const todayReminders = reminders.filter(reminder => {
      const [hours, minutes] = reminder.time.split(':');
      const [period] = reminder.time.split(' ');
      const reminderHour = parseInt(hours) + (period === 'PM' && hours !== '12' ? 12 : 0);
      const reminderDate = new Date(now);
      reminderDate.setHours(reminderHour, parseInt(minutes), 0);
      return reminderDate > now && !reminder.completed;
    });

    return todayReminders.sort((a, b) => {
      const [aHours, aMinutes] = a.time.split(':');
      const [bHours, bMinutes] = b.time.split(':');
      return parseInt(aHours) * 60 + parseInt(aMinutes) - (parseInt(bHours) * 60 + parseInt(bMinutes));
    })[0] || null;
  };

  const getRemindersForDate = (date: Date): Reminder[] => {
    return reminders.filter(reminder => 
      format(reminder.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <MedicineContext.Provider
      value={{ 
        medicines, 
        reminders,
        addMedicine,
        updateMedicine,
        toggleMedicineTaken, 
        deleteMedicine,
        addReminder,
        getNextReminder,
        getRemindersForDate
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};

export const useMedicineContext = () => {
  const context = useContext(MedicineContext);
  if (context === undefined) {
    throw new Error('useMedicineContext must be used within a MedicineProvider');
  }
  return context;
};