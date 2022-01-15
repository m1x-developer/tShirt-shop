import React, {useContext} from 'react';
import Card from "../components/Card";
import AppContext from "../context";

const Faforites = () => {
    const {favorites , onAddToFavorite} = useContext(AppContext)
    return (
        <div>
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>Избранные товары</h1>
                </div>

                <div className="d-flex flex-wrap">
                    {favorites.map((item, index) => (
                            <Card
                                key={index}
                                favorited={true}
                                onFavorite={onAddToFavorite}
                                {...item}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Faforites;
