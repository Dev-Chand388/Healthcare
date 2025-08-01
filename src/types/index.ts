export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
  rating: number;
  experience: number;
  education: string;
  location: string;
  about: string;
  availability: {
    [key: string]: string[]; // date: available times
  };
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface AppContextType {
  doctors: Doctor[];
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}