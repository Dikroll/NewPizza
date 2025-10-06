import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import {
	CartPage,
	ContactPage,
	HomePage,
	LoginPage,
	NotFoundPage,
	OrderPage,
	ProfilePage,
	PromotionPage,
	RegisterPage,
} from '@/pages'

import { AuthProvider, CartProvider } from './providers'

import {
	fetchBanners,
	fetchCategories,
	fetchProducts,
	fetchPromotions,
	fetchUserProfile,
	PromotionDetailsPage,
	updateUserProfile,
} from '@/shared/api'

import '@/app/styles/App.css'
import Layout from '@/shared/ui/layouts/Layout'
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
					<Layout loading={loading} categories={categories} user={user}>
						<Header
							categories={categories}
							user={user}
							totalQuantity={cartItems.reduce(
								(sum, item) => sum + item.quantity,
								0
							)}
						/>
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
							<Route path='/login' element={<LoginPage />} />
							<Route path='/register' element={<RegisterPage />} />
							<Route
								path='/profile'
								element={
									<ProfilePage requestUser={user} onSaveUser={saveUser} />
								}
							/>
							<Route path='/cart' element={<CartPage />} />
							<Route path='/delivery' element={<ContactPage />} />
							<Route
								path='/promotions'
								element={<PromotionPage promotions={promotions} />}
							/>
							<Route
								path='/promotions/:id'
								element={<PromotionDetailsPage />}
							/>

							<Route path='/order-success/:orderId' element={<OrderPage />} />
							<Route path='*' element={<NotFoundPage />} />
						</Routes>
					</Layout>
				</CartProvider>
			</AuthProvider>
		</Router>
	)
}

export default App
