import { Link } from 'react-router-dom'
import './CartButton.css'

const CartButton = ({ totalQuantity = 0 }) => {
	return (
		<Link to='/cart' className='cart-button'>
			Корзина {totalQuantity > 0 && `(${totalQuantity})`}
		</Link>
	)
}

export default CartButton
