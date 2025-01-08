import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { ProductDetail } from "./ProductDetail";
import { useContext } from "react";
import { ProductsContext } from '../context/ProductsContext'

export const ProductDetailContainer = () => {
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    const { addItem, reset, getQuantity } = useContext(ProductsContext);
    const [error, setError] = useState(null);

    const { id } = useParams()

    useEffect(() => {
        const db = getFirestore();

        const refDoc = doc(db, "items", id);

        getDoc(refDoc)
            .then((snapshot) => {
                setItem({ id: snapshot.id, ...snapshot.data() });
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddToCart = () => {
        if (item.stock <= getQuantity(item.id)) {
            setError("No hay mas stock de este producto")
        } else {
            addItem({ id: item.id, quantity: 1 });
        }
    }


    return (
        <div>
            <ProductDetail
                categoryId={item.categoryId}
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
                description={item.descripcion}
                stock={item.stock}
                handleAddToCart={handleAddToCart}

            />
            {error && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                </div>
            )}
        </div>
    )
}