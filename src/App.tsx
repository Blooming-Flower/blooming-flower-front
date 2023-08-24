import { BrowserRouter } from 'react-router-dom'

// import { ROOT } from './common/domain'
// import Main from './pages/main'
// import Login from './pages/login'
// import Map from './pages/map'
import ROOT from './pages'

function App() {
	return (
		<BrowserRouter>
			<ROOT />
		</BrowserRouter>
	)
}

export default App
