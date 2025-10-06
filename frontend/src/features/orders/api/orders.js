import { api } from '@/shared/api/base'

export const ordersApi = {
	create: orderData => api.post('orders/', orderData),
	getAll: () => api.get('orders/'),
	getById: orderId => api.get(`orders/${orderId}/`),
}
