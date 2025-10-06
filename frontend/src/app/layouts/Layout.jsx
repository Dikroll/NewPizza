import { Footer, Loader, NavBar } from '@/shared/widgets'

const Layout = ({ loading, categories, children }) => {
	if (loading) return <Loader />

	return (
		<>
			<NavBar categories={categories} />
			<main>{children}</main>
			<Footer categories={categories} />
		</>
	)
}

export default Layout
