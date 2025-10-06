import { api } from '@/shared/api/base'

export const productsApi = {
	getAll: () => api.get('products/'),
	getCategories: () => api.get('categories/'),
}
