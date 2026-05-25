/**
 * Header Component
 * 
 * Simple glass-morphism header container.
 * 
 * @param {ReactNode} props.children - Child components (e.g., Theme switcher).
 */
const Header = ({ children }) => {
	return <header className='flex justify-end p-2 glass'>{children}</header>
}

export default Header
