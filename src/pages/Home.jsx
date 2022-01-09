import Card from "../components/Card";
import React from 'react';

const Home = ({ favorites,setItems,onChangeSearchValue,setSearchValue,searchValue, items, onAddToCart, onAddToFavorite }) => {

    return (
        <div>
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>{searchValue ? `Поиск по "${searchValue}"` : 'Все футболки'}</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        <input onChange={onChangeSearchValue} value={searchValue} placeholder="Поиск..."/>
                    </div>
                </div>

                <div className="d-flex flex-wrap">
                    {items
                        .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((item, index) => (
                            <Card
                                key={index}
                                onFavorite={(obj) => onAddToFavorite(obj)}
                                onPlus={(obj) => onAddToCart(obj)}
                                {...item}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
