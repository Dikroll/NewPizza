import { api } from '@/shared/api/base'

export const cartApi = {
	getCart: () => api.get('cart/'),

	addToCart: (productId, sizeId, quantity) =>
		api.post('cart/', { productId, sizeId, quantity }),

	removeFromCart: cartItemId => api.delete(`cart/${cartItemId}/`),

	updateQuantity: (itemId, newQuantity) =>
		api.patch(`cart/${itemId}/`, { quantity: newQuantity }),
}
