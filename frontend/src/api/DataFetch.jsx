import axios from 'axios';
import { config } from '@/services/config';

axios.defaults.withCredentials = true;

const BASE_URL = config.apiUrl.endsWith('/') ? config.apiUrl : `${config.apiUrl}/`;

const CART_URL = `${BASE_URL}cart/`;
const LOGIN_URL = `${BASE_URL}auth/login/`;
const REGISTER_URL = `${BASE_URL}auth/register/`;
const LOGOUT_URL = `${BASE_URL}auth/logout/`;
const AUTHENTICATED_URL = `${BASE_URL}auth/authenticated/`;
const PROFILE_URL = `${BASE_URL}auth/profile/`;
const REFRESH_URL = `${BASE_URL}auth/token/refresh/`;
const BANNER_URL = `${BASE_URL}banners/`;
const PRODUCT_URL = `${BASE_URL}products/`;
const CATEGORIES_URL = `${BASE_URL}categories/`;
const PROMOTIONS_URL = `${BASE_URL}promotions/`;
const ORDERS_URL = `${BASE_URL}orders/`;

export const fetchCategories = async () => {
  try {
    const response = await axios.get(CATEGORIES_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(PRODUCT_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const fetchBanners = async () => {
  try {
    const response = await axios.get(BANNER_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw new Error('Failed to fetch banners');
  }
};

export const fetchPromotions = async () => {
  try {
    const response = await axios.get(PROMOTIONS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching promotions:', error);
    throw new Error('Failed to fetch promotions');
  }
};

export const fetchPromotionById = async (id) => {
  try {
    const response = await axios.get(`${PROMOTIONS_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching promotion:', error);
    throw error; 
  }
};

export const createOrder = async (orderData) => {
  try {
      const response = await axios.post(ORDERS_URL, orderData);
      return response.data;
  } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      throw error;
  }
};

export const fetchOrders = async () => {
  try {
     
      const response = await axios.get(ORDERS_URL);
      return response.data; 
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении заказов');
  }
};

export const fetchCart = async () => {
  try {
    const response = await axios.get(CART_URL);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении корзины:', error);
    throw new Error('Failed to fetch cart');
  }
};


export const addToCart = async (productId, sizeId, quantity) => {
  try {
    const response = await axios.post(CART_URL, { productId, sizeId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error('Failed to add to cart');
  }
};

export const removeFromCart = async (cartItemId) => { 
  try {
      const response = await axios.delete(`${CART_URL}${cartItemId}/`);
      return response.data;

  } catch (error) {
      console.error("Ошибка при удалении из корзины:", error.response?.data || error.message);
      throw new Error("Failed to remove from cart");
  }
};

export const updateCartItemQuantity = async (itemId, newQuantity) => {
  try {
    const response = await axios.patch(`${CART_URL}${itemId}/`, { quantity: newQuantity });
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении количества товара:', error);
    throw error;
  }
};

export const fetchOrder = async (orderId) => {
  try {
      const response = await axios.get(`${ORDERS_URL}${orderId}/`);
      return response.data;
  } catch (error) {
      throw new Error('Ошибка при загрузке данных о заказе');
  }
};

export const login = async (phone, password) => {
  try {
    const response = await axios.post(LOGIN_URL, { phone, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(LOGOUT_URL);
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const register = async (first_name, email, password, confirm_password, phone, birthday, gender, address) => {
  try {
    const response = await axios.post(REGISTER_URL, { first_name, email, password, confirm_password, phone, birthday, gender, address });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const authenticated_user = async () => {
  try {
    const response = await axios.get(AUTHENTICATED_URL);
    return response.data;
  } catch (error) {
    console.error('Fetching authenticated user failed:', error);
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(PROFILE_URL);
    return response.data;
  } catch (error) {
    console.error('Fetching user profile failed:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put(PROFILE_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Updating user profile failed:', error);
    throw error;
  }
};

export const refresh_token = async () => {
  try {
    const response = await axios.post(REFRESH_URL);
    return response.data;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};