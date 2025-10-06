import Userlogo from '@/assets/images/profile.svg'
import CartButton from '@/components/Cart/CartButton/CartButton'
import logo from '@/shared/assets/images/favicon.svg'
import ScrollToCategory from '@/utils/scrollToCategory'
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Header = ({ categories = [], user }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
	const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false)
	const scrollToCategory = ScrollToCategory()

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
		setMobileDropdownOpen(false)
	}

	const toggleMobileDropdown = () => setMobileDropdownOpen(!mobileDropdownOpen)
	const toggleDesktopDropdown = () =>
		setDesktopDropdownOpen(!desktopDropdownOpen)
	const CategoryClick = categoryId => {
		scrollToCategory(categoryId)
		setIsMenuOpen(false)
		setMobileDropdownOpen(false)
		setDesktopDropdownOpen(false)
	}

	return (
		<header>
			<nav className='navbar navbar-expand-lg navbar-light'>
				<div className='container'>
					<button className='navbar-toggler d-lg-none' onClick={toggleMenu}>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>

					<Link to='/' className='navbar-brand'>
						<img
							src={logo}
							alt='Logo'
							width='80'
							height='80'
							className='me-2'
						/>
						<span className='brand-text'>Dымок</span>
					</Link>

					{/* Десктоп меню */}
					<div className='collapse navbar-collapse d-none d-lg-block'>
						<ul className='navbar-nav me-auto'>
							<li
								className='nav-item dropdown'
								onMouseEnter={toggleDesktopDropdown}
								onMouseLeave={toggleDesktopDropdown}
							>
								<div className='nav-link dropdown-toggle d-flex align-items-center'>
									Категории{' '}
									{desktopDropdownOpen ? <ChevronUp /> : <ChevronDown />}
								</div>
								<ul
									className={`dropdown-menu ${
										desktopDropdownOpen ? 'show' : ''
									}`}
								>
									{categories.map(cat => (
										<li key={cat.id}>
											<a
												href={`/#category-${cat.id}`}
												className='dropdown-item'
												onClick={e => {
													e.preventDefault()
													CategoryClick(cat.id)
												}}
											>
												{cat.name}
											</a>
										</li>
									))}
								</ul>
							</li>
							<li className='nav-item'>
								<Link to='/delivery' className='nav-link'>
									Контакты
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/promotions' className='nav-link'>
									Акции
								</Link>
							</li>
						</ul>
					</div>

					{/* Иконки пользователя и корзины */}
					<div className='d-flex align-items-center ms-3'>
						<Link
							to={user ? '/profile' : '/login'}
							className='profile-icon d-none d-lg-block'
						>
							<img src={Userlogo} alt={user ? 'Profile' : 'Login'} />
						</Link>
						<CartButton
							totalQuantity={totalQuantity}
							className='btn btn-danger'
						/>
					</div>
				</div>

				{/* Мобильное меню */}
				{isMenuOpen && (
					<div className='mobile-menu-overlay' onClick={toggleMenu} />
				)}
				<div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}></div>
			</nav>
		</header>
	)
}
