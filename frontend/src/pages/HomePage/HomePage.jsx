import ProductModal from '@/components/Products/ProductModal/ProductModal'
import Products from '@/components/Products/ProductsCard/ProductsCard'
import ImageSlider from '@/components/Products/Slider/Slider'
import { useEffect, useState } from 'react'
import './HomePage.module.css'
export const HomePage = ({ banners, categories, products }) => {
	const [cart, setCart] = useState([])
	const [selectedProduct, setSelectedProduct] = useState(null)

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem('cart')) || []
		setCart(storedCart)
	}, [])

	const updateCart = newCart => {
		setCart(newCart)
		localStorage.setItem('cart', JSON.stringify(newCart))
	}

	const openModal = product => {
		setSelectedProduct(product)
	}

	const closeModal = () => {
		setSelectedProduct(null)
	}

	return (
		<div>
			<ImageSlider banners={banners} />

			<Products
				products={products}
				categories={categories}
				cart={cart}
				updateCart={updateCart}
				openModal={openModal}
			/>
			{selectedProduct && (
				<ProductModal
					product={selectedProduct}
					onClose={closeModal}
					cart={cart}
					updateCart={updateCart}
				/>
			)}

			<div className='space'></div>
		</div>
	)
}

export default HomePage
