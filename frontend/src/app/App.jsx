import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import {
	CartPage,
	ContactPage,
	HomePage,
	NotFoundPage,
	PromotionPage,
} from '@/pages'

import MainLayout from './layouts/MainLayout'

import { AuthProvider } from './providers/AuthProvider'
import { CartProvider } from './providers/CartProvider'

import {
	fetchBanners,
	fetchCategories,
	fetchProducts,
	fetchPromotions,
	fetchUserProfile,
	updateUserProfile,
} from '@/shared/api'

import OrderConfirm from '@/components/Orders/OrderConfirm/OrderConfirm'
import PromotionDetails from '@/components/Promotions/PromotionDetails/PromotionDetails'
import LoginForm from '@/features/auth/components/LoginForm/LoginForm'
import RegisterForm from '@/features/auth/components/RegisterForm/RegisterForm'
import ProfilePage from '@/features/auth/pages/ProfilePage/ProfilePage'

import '@/app/styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const App = () => {
	const [categories, setCategories] = useState([])
	const [products, setProducts] = useState([])
	const [banners, setBanners] = useState([])
	const [promotions, setPromotions] = useState([])
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		Promise.all([
			fetchCategories().then(setCategories),
			fetchProducts().then(setProducts),
			fetchBanners().then(setBanners),
			fetchPromotions().then(setPromotions),
			fetchUserProfile().then(setUser),
		])
			.catch(err => console.error('Error:', err.message))
			.finally(() => setTimeout(() => setLoading(false), 1000))
	}, [])

	const saveUser = async updatedUser => {
		try {
			const data = await updateUserProfile(updatedUser)
			setUser(data)
		} catch (error) {
			console.error('Error saving user data:', error)
		}
	}

	return (
		<Router>
			<AuthProvider>
				<CartProvider>
					<MainLayout loading={loading} categories={categories}>
						<Routes>
							<Route
								path='/'
								element={
									<HomePage
										banners={banners}
										categories={categories}
										products={products}
									/>
								}
							/>
							<Route path='/cart' element={<CartPage />} />
							<Route path='/delivery' element={<ContactPage />} />
							<Route
								path='/promotions'
								element={<PromotionPage promotions={promotions} />}
							/>
							<Route path='/promotions/:id' element={<PromotionDetails />} />
							<Route path='/login' element={<LoginForm />} />
							<Route path='/register' element={<RegisterForm />} />
							<Route
								path='/profile'
								element={
									<ProfilePage requestUser={user} onSaveUser={saveUser} />
								}
							/>
							<Route
								path='/order-success/:orderId'
								element={<OrderConfirm />}
							/>
							<Route path='*' element={<NotFoundPage />} />
						</Routes>
					</MainLayout>
				</CartProvider>
			</AuthProvider>
		</Router>
	)
}

export default App
