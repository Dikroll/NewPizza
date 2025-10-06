export const translateStatus = (status) => {
    const statusMap = {
        pending: 'Ожидание',
        preparing: 'Готовится',
        delivering: 'Доставляется',
        delivered: 'Доставлено',
        cancelled: 'Отменен',
    };
    return statusMap[status] || status; 
};

export const translatePayment = (payment) => {
    const paymentMap = {
        cash: 'Наличными',
        card_online: 'Картой онлайн',
        card_on_delivery: 'Доставляется',

    };
    return paymentMap[payment] || payment; 
};

