import React, {useContext} from 'react';
import AppContext from "../context";

const Info = ({title, description, img}) => {
    const { setCartOpened } = useContext(AppContext)
    return (
        <div className="text-center d-flex align-center justify-center flex-column flex">
            <img src={img} alt="cart" width="100%"/>
            <h3>{title} </h3>
            <p>{description}</p>
            <button onClick={() => setCartOpened(false)} className="greenButton mt-15">
                Вернуться назад
            </button>
        </div>
    );
};

export default Info;
