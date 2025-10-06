import { Footer, Header, Loader } from '@/shared/widgets'

const Layout = ({ loading, categories, user, children }) => {
	if (loading) return <Loader />

	return (
		<>
			<Header categories={categories} user={user} />
			<main>{children}</main>
			<Footer categories={categories} />
		</>
	)
}

export default Layout
