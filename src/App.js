import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppContext from './context'
import axios from 'axios'
import Header from './components/Header'
import Drawer from './components/Drawer'
import Home from './pages/Home'
import Faforites from './pages/Favorites'
import Orders from './pages/Orders'

function App() {
	const [items, setItems] = React.useState([])
	const [cartItems, setCartItems] = React.useState([])
	const [favorites, setFavorites] = React.useState([])
	const [searchValue, setSearchValue] = React.useState('')
	const [cartOpened, setCartOpened] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(true)

	// events
	React.useEffect(() => {
		async function fetchData() {
			const cartResponse = await axios.get(
				'https://61a3b08dd5e833001729212f.mockapi.io/card'
			)
			const favoritesResponse = await axios.get(
				'https://61a3b08dd5e833001729212f.mockapi.io/favorites'
			)
			const itemsResponse = await axios.get(
				'https://61a3b08dd5e833001729212f.mockapi.io/items'
			)

			setIsLoading(false)
			setCartItems(cartResponse.data)
			setFavorites(favoritesResponse.data)
			setItems(itemsResponse.data)
		}

		fetchData()
	}, [])

	const onAddToCart = obj => {
		try {
			if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
				axios.delete(
					`https://61a3b08dd5e833001729212f.mockapi.io/card/${obj.id}`
				)
				setCartItems(prev =>
					prev.filter(item => Number(item.id) !== Number(obj.id))
				)
			} else {
				axios.post('https://61a3b08dd5e833001729212f.mockapi.io/card', obj)
				setCartItems(prev => [...prev, obj])
			}
		} catch (error) {
			alert('Ошибка запроса на сервер "const onAddToCart"')
		}
	}

	const onRemoveItem = id => {
		axios.delete(`https://61a3b08dd5e833001729212f.mockapi.io/card/${id}`)
		setCartItems(prev => prev.filter(item => item.id !== id))
	}

	const onAddToFavorite = async obj => {
		try {
			if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
				axios.delete(
					`https://61a3b08dd5e833001729212f.mockapi.io/favorites/${obj.id}`
				)
				setFavorites(prev => prev.filter(item => item.id !== obj.id))
			} else {
				const { data } = await axios.post(
					`https://61a3b08dd5e833001729212f.mockapi.io/favorites`,
					obj
				)
				setFavorites(prev => [...prev, data])
			}
		} catch (error) {
			alert('Не удалось добавить в избранное !')
		}
	}

	const onChangeSearchValue = event => {
		setSearchValue(event.target.value)
	}

	const isItemAdded = id => {
		return cartItems.some(obj => Number(obj.id) === Number(id))
	}

	// end events

	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favorites,
				isItemAdded,
				onAddToFavorite,
				setCartOpened,
				setCartItems,
			}}
		>
			<div className='wrapper clear'>
				{cartOpened && (
					<Drawer
						items={cartItems}
						onClose={() => setCartOpened(false)}
						onRemove={onRemoveItem}
					/>
				)}
				<Header onClickCart={() => setCartOpened(true)} />
				<div className='d-flex flex-wrap'>
					<Routes>
						<Route
							path='/'
							exact
							element={
								<Home
									items={items}
									cartItems={cartItems}
									searchValue={searchValue}
									setSearchValue={setSearchValue}
									favorites={favorites}
									setItems={setItems}
									onChangeSearchValue={onChangeSearchValue}
									onAddToFavorite={onAddToFavorite}
									onAddToCart={onAddToCart}
									isLoading={isLoading}
								/>
							}
						/>

						<Route path='/favorites' exact element={<Faforites />} />
						<Route path='/orders' exact element={<Orders />} />
					</Routes>
				</div>
			</div>
		</AppContext.Provider>
	)
}

export default App
