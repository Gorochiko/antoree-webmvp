
import { apiClient } from '../services/api'
import type { BookingRequest, BookingResponse } from '../types/booking';
import type { ApiError } from '../services/api';

export async function createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
  try {
    const response = await apiClient.post<BookingResponse>('/booking', bookingData);
    return response;
  } catch (error) {
    const apiError = error as ApiError;
        if (apiError.status === 400) {
      throw new Error('Dữ liệu đặt lịch không hợp lệ: ' + (apiError.message || 'Vui lòng kiểm tra lại thông tin'));
    } else if (apiError.status === 409) {
      throw new Error('Giáo viên không có lịch trống trong khung giờ này');
    } else if (apiError.status === 401) {
      throw new Error('Bạn cần đăng nhập để đặt lịch');
    }
    
    throw error;
  }
}

export async function confirmBookingPayment(bookingId: string): Promise<BookingResponse> {
  try {
    const response = await apiClient.post<BookingResponse>(`/booking/${bookingId}/confirm`)
    return response
  } catch (error) {
    const apiError = error as ApiError
    if (apiError.status === 404) {
      throw new Error('Không tìm thấy đơn đặt lịch với ID này')
    } else if (apiError.status === 400) {
      throw new Error('Giao dịch không hợp lệ hoặc đã xử lý')
    }
    throw error
  }
}