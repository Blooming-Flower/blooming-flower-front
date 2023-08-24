import Main from './pages'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'

// import './index.css'
import rootReducer from '@modules/reducer'
import React from 'react'

const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<Main />
	</Provider>
)
