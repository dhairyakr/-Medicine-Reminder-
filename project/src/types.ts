export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  type: 'tablet' | 'capsule' | 'syrup' | 'injection';
  times: string[];
  frequency: 'daily' | 'alternate' | 'weekly';
  notes?: string;
  taken: boolean;
  color: string;
  startDate: Date;
  endDate: Date | null;
}

export interface Reminder {
  id: string;
  medicineId: string;
  medicineName: string;
  dosage: string;
  time: string;
  date: Date;
  completed: boolean;
  color: string;
}