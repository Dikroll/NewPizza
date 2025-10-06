import { api } from '@/shared/api/base'

export const promotionsApi = {
	getAll: () => api.get('promotions/'),
	getById: id => api.get(`promotions/${id}/`),
	getBanners: () => api.get('banners/'),
}
