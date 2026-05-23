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
