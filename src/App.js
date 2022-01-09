import React from 'react';
import {Routes, Route} from "react-router-dom";
import axios from "axios";

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home'
import Faforites from "./pages/Favorites";


function App() {

    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);

    // events
    React.useEffect(() => {
        axios.get('https://61a3b08dd5e833001729212f.mockapi.io/items').then((res) => {
            setItems(res.data)
        })
        axios.get('https://61a3b08dd5e833001729212f.mockapi.io/card').then((res) => {
            setCartItems(res.data)
        })
        axios.get('https://61a3b08dd5e833001729212f.mockapi.io/favorites').then((res) => {
            setFavorites(res.data)
        })
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://61a3b08dd5e833001729212f.mockapi.io/card', obj);
        setCartItems((prev) => [...prev, obj]);
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://61a3b08dd5e833001729212f.mockapi.io/card/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id));
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://61a3b08dd5e833001729212f.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter(item => item.id !== obj.id));
            } else {
                const {data} = await axios.post(`https://61a3b08dd5e833001729212f.mockapi.io/favorites`, obj);
                setFavorites((prev) => [...prev, data])
            }
        } catch (error) {
            alert('Не удалось добавить в избранное !')
        }
    }

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value)
    }
    // end events

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
            <Header onClickCart={() => setCartOpened(true)}/>
            <div className="d-flex flex-wrap">
                <Routes>
                    <Route path="/" exact element={
                        <Home
                            items={items}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            favorites={favorites}
                            setItems={setItems}
                            onChangeSearchValue={onChangeSearchValue}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                        />
                    }/>

                    <Route path="/favorites" exact element={
                        <Faforites items={favorites} onAddToFavorite={onAddToFavorite}/>
                    }/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
