import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; 
import { fetchOrders } from '@/api/DataFetch'; 
import { translateStatus, translatePayment } from '@/utils/dataTranslate';
import './OrderList.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [allVisible, setAllVisible] = useState(false);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        getOrders();
    }, []);

    const toggleOrder = (orderId) => {
        setExpandedOrderId(prev => (prev === orderId ? null : orderId));
    };

    const showMoreOrders = () => {
        setVisibleCount(orders.length);
        setAllVisible(true);
    };

    const collapseOrders = () => {
        setVisibleCount(5);
        setAllVisible(false);
        setExpandedOrderId(null);
    };

    if (error) {
        return <div className="error-message">Ошибка: {error}</div>;
    }

    return (
        <div className="order-list">
            {orders.length > 0 ? (
                <ul>
                    {orders.slice(0, visibleCount).map(order => (
                        <li key={order.id} className="order-item">
                            <div className="order-summary" onClick={() => toggleOrder(order.id)}>
                                <div className="order-info">
                                    <p className='order-id'>Заказ #{order.id}</p>
                                    <p>{new Date(order.created_at).toLocaleDateString()}</p>
                                    <p>{translateStatus(order.status)}</p>
                                    <p>{translatePayment(order.payment_method)}</p>
                                    <span>{order.summary} руб</span>
                                </div>
                                <span className="toggle-arrow">
                                    {expandedOrderId === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </span>
                            </div>

                            {expandedOrderId === order.id && (
                                <div className="order-details">
                                    <p>Адрес: {order.address}, кв. {order.apartment}, подъезд {order.entrance}, этаж {order.floor}</p>
                                    <h3>Состав заказа:</h3>
                                    <ul className="order-items">
                                        {order.items.map(item => (
                                            <li key={item.id} className="order-product">
                                                <p>{item.product.name} {item.size.size} - {item.quantity} шт</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-orders">У вас пока нет заказов.</p>
            )}

            {!allVisible && visibleCount < orders.length && (
                <button className="show-more-btn" onClick={showMoreOrders}>
                    <ChevronDown size={20} /> Показать больше
                </button>
            )}

            {allVisible && (
                <button className="show-more-btn" onClick={collapseOrders}>
                    <ChevronUp size={20} /> Свернуть заказы
                </button>
            )}
        </div>
    );
};

export default OrderList;