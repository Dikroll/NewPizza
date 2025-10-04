import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '@/api/DataFetch';
import { translateStatus } from '@/utils/dataTranslate';
import './OrderConfirm.css';

const OrderConfirm = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getOrderStatusSteps = (currentStatus) => {
        const steps = [
            { id: 1, status: 'pending', label: 'Ожидание' },
            { id: 2, status: 'preparing', label: 'Готовится' },
            { id: 3, status: 'delivering', label: 'Доставляется' },
            { id: 4, status: 'delivered', label: 'Доставлено' },
        ];

        return steps.map((step) => ({
            ...step,
            active: step.status === currentStatus,
        }));
    };

    useEffect(() => {
        let interval;

        const getOrder = async () => {
            try {
                const orderData = await fetchOrder(orderId);
                setOrder(orderData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        getOrder(); 

        interval = setInterval(getOrder, 60000);

        return () => clearInterval(interval); 
    }, [orderId]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;
    if (!order) return <div>Заказ не найден</div>;

    const orderStatusSteps = getOrderStatusSteps(order.status);

    return (
        <div className="confirm">
            <h1 className="heading">Заказ оформлен!</h1>
            <p className="text">Номер вашего заказа: <strong>№{order.id}</strong></p>
            <p className="text">
                Статус заказа: <strong className="status">{translateStatus(order.status)}</strong>
            </p>

            <div className="timeline">
                {orderStatusSteps.map((step, index) => (
                    <div key={step.id} className={`timeline-step ${step.active ? 'active' : ''}`}>
                        <div className="timeline-circle"></div>
                        <div className="timeline-label">{step.label}</div>
                        {index < orderStatusSteps.length - 1 && <div className="timeline-line"></div>}
                    </div>
                ))}
            </div>

            <p className="text">Спасибо за заказ!</p>
        </div>
    );
};

export default OrderConfirm;
