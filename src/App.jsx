/**
 * App Component
 * 
 * Entry point for the Weather Dashboard UI.
 * Wraps the Header and Dashboard components.
 */

import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Theme from './components/Theme'

export default function App() {
	return (
		<>
			<Header>
				<Theme />
			</Header>
			<Dashboard />
		</>
	)
}
