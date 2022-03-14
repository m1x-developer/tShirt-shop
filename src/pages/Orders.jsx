import axios from 'axios'
import React, { useContext } from 'react'

const Orders = () => {
	const [orders, setOrders] = React.useState([])
	React.useEffect(() => {
		try {
			(async () => {
				const {data} = await axios.get('https://61a3b08dd5e833001729212f.mockapi.io/orders')
				setOrders(data)
			})()
		}catch (error) {
			alert('ошибка подгрузки заказов')
			console.log(error)
		}
	}, [])

	return (
		<div>
			<div className='content p-40'>
				<div>
					<h1>Мои заказы</h1>
				</div>

				{orders.map((items,index)=>(
					<div className='d-flex flex-column item-order '>
						<div>
							<h3>Заказ #{items.id}</h3>

						</div>
						<div className='d-flex '>
						{items.items.map((elem,index)=>(
							<div className='p-10 order-item'>
								<div className='order-img'>
									<img src={elem.imageUrl} alt=""/>
								</div>
								<div className='order-text'>
									<p>{elem.title}</p>
									<b>{elem.price} руб.</b>
								</div>
							</div>
						))}
						</div>
						<hr/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Orders
