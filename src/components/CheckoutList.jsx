import React, { useState, useMemo } from 'react';
import { CheckoutItem } from "./CheckoutItem";
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { getFirestore, doc, updateDoc, collection, addDoc } from "firebase/firestore";

export const CheckoutList = ({ items }) => {
    const { reset } = useContext(ProductsContext);
    const [form, setForm] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        confirmEmail: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const total = items.reduce((acc, product) => acc + product.price * product.quantity, 0);

    // Memoiza la validación del formulario
    const isFormValid = useMemo(() => {
        if (
            !form.name ||
            !form.lastName ||
            !form.phone ||
            !form.email ||
            form.email !== form.confirmEmail
        ) {
            setError('Todos los campos son obligatorios y los emails deben coincidir. Ademas debe de haber al menos un item en el carrito');
            return false;
        }
        setError('');
        return true;
    }, [form]);

    const handleCheckout = async () => {
        if (!isFormValid) return;
    
        const db = getFirestore();
        setIsLoading(true);
    
        try {
            // Actualizar stock
            const updatePromises = items.map(async (product) => {
                const productRef = doc(db, "items", product.id);
                await updateDoc(productRef, {
                    stock: product.stock - product.quantity,
                });
            });
            await Promise.all(updatePromises);
    
            // Crear orden
            const ordersCollection = collection(db, "orders");
            const newOrder = {
                buyer: {
                    name: form.name,
                    lastName: form.lastName,
                    phone: form.phone,
                    email: form.email,
                },
                items: items.map(({ id, title, quantity, price }) => ({
                    id,
                    title,
                    quantity,
                    price,
                })),
                total,
                date: new Date().toISOString(),
            };
            const orderDoc = await addDoc(ordersCollection, newOrder);
    
            alert(`Gracias por tu compra. Tu ID de orden es: ${orderDoc.id}`);
            
            // Resetear el formulario y el estado de la compra
            reset();
            setForm({
                name: '',
                lastName: '',
                phone: '',
                email: '',
                confirmEmail: '',
            });
        } catch (error) {
            console.error("Error procesando la orden:", error);
            alert("Hubo un error al procesar tu compra. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };
    

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
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

            <form style={{ marginBottom: "20px" }}>
                <div>
                    <label>Nombre: </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Apellido: </label>
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Teléfono: </label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Confirmar Email: </label>
                    <input
                        type="email"
                        name="confirmEmail"
                        value={form.confirmEmail}
                        onChange={handleInputChange}
                    />
                </div>
                {error && (
                    <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
                )}
            </form>

            <button
                onClick={handleCheckout}
                disabled={isLoading || !isFormValid || items.length == 0}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: isLoading ? "gray" : "#007BFF",
                    color: "white",
                    cursor: isLoading ? "not-allowed" : "pointer",
                }}
            >
                {isLoading ? "Procesando..." : "Finalizar Checkout"}
            </button>
        </div>
    );
};
