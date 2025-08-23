export interface BookingRequest {
  email: string;
  teacherId: string;
  teacherName: string;
  courseType: string;
  totalAmount: number;
  status: string;
  notes?: string;
}

export interface BookingTrialRequest {
  email: string;
  teacherId: string;
  teacherName: string;
  courseType?: string;
  totalAmount: number;
  status: string;
  notes?: string;
}

export interface BookingResponse {
  _id: string;
  email: string;
  teacherId: string;
  teacherName: string;
  courseType: string;
  totalAmount: number;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}