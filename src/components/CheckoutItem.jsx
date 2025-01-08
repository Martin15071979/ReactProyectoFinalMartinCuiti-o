export const CheckoutItem = ({ title, price, quantity }) => {
    const subtotal = price * quantity;

    return (
        <tr>
            <td>{title}</td>
            <td>${Number(price).toFixed(2)}</td>
            <td>{quantity}</td>
            <td>${subtotal.toFixed(2)}</td>
        </tr>
    );
};
