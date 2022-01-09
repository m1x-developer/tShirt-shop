import Card from "../components/Card";
import React from 'react';

const Faforites = ({items ,onAddToFavorite}) => {
    return (
        <div>
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>Избранные товары</h1>
                </div>

                <div className="d-flex flex-wrap">
                    {items
                        .map((item, index) => (
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
