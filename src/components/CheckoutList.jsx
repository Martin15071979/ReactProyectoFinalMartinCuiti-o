import React from 'react';
import { CheckoutItem } from "./CheckoutItem";
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export const CheckoutList = ({ items }) => {
const {reset} = useContext(ProductsContext)

    const total = items.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const handleCheckout = async() => {

         const db = getFirestore();
        try {

            const updatePromises = items.map(async (product) => {
                const productRef = doc(db, "items", product.id);
                await updateDoc(productRef, {
                    stock: product.stock - product.quantity, 
                });
            });

            await Promise.all(updatePromises); 

            alert("Gracias por tu compra. Total: $" + total.toFixed(2));
            reset();
        } catch (error) {
            console.error("Error actualizando el stock:", error);
            alert("Hubo un error al procesar tu compra. Inténtalo de nuevo.");
        }

    
    };

    return (
        <div>
            <table border="1" style={{ width: "100%", textAlign: "left", marginBottom: "20px" }}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(product => (
                        <CheckoutItem
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            quantity={product.quantity}
                        />
                    ))}
                </tbody>
            </table>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={handleCheckout} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Finalizar Checkout
            </button>
        </div>
    );
};
