import Info from './info'
import { useContext, useState } from 'react'
import AppContext from '../context'
import axios from 'axios'

function Drawer({ onClose, onRemove, items = [] }) {
	const { setCartItems, cartItems } = useContext(AppContext)
	const [orderId, setOrderId] = useState(null)
	const [isOrderCompleted, setIsOrderCompleted] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post(
				'https://61a3b08dd5e833001729212f.mockapi.io/orders',
				{
					items: cartItems,
				}
			)
			setOrderId(data.id)
			setIsOrderCompleted(true)
			setCartItems([])
		} catch (error) {
			alert('Не удалось создать заказ !')
		}
		setIsLoading(false)
	}

	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

	return (
		<div className='overlay'>
			<div className='drawer'>
				<h2 className='d-flex justify-between mb-30'>
					Корзина{' '}
					<img
						onClick={onClose}
						className='cu-p'
						src='/img/btn-remove.svg'
						alt='Close'
					/>
				</h2>

				{items.length > 0 ? (
					<div className='d-flex flex-column flex'>
						<div className='items'>
							{items.map(obj => (
								<div
									key={obj.id}
									className='cartItem d-flex align-center mb-20'
								>
									<div
										style={{ backgroundImage: `url(${obj.imageUrl})` }}
										className='cartItemImg'
									></div>
									<div className='mr-20 flex'>
										<p className='mb-5'>{obj.title}</p>
										<b>{obj.price} руб.</b>
									</div>
									<img
										onClick={() => {
											onRemove(obj.id)
										}}
										className='removeBtn'
										src='/img/btn-remove.svg'
										alt='Remove'
									/>
								</div>
							))}
						</div>
						<div className='cartTotalBlock'>
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб. </b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>{totalPrice * 0.05} руб. </b>
								</li>
							</ul>
							<button
								disabled={isLoading}
								onClick={onClickOrder}
								className='greenButton'
							>
								Оформить заказ <img src='/img/arrow.svg' alt='Arrow' />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderCompleted ? 'Заказ оформлен' : 'Корзина пуста'}
						description={
							isOrderCompleted
								? `Ваш заказ #${orderId} создан , с вами свяжутся в ближайшее время!`
								: 'Пожалуйста добавьте минимум один товар в корзину !'
						}
						img={isOrderCompleted ? '/img/smile-send.png' : '/img/cart.jpg'}
					/>
				)}
			</div>
		</div>
	)
}

export default Drawer
