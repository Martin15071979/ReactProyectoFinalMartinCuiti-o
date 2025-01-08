import { useContext, useState, useEffect } from "react";
import { ProductsContext } from '../context/ProductsContext'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { CheckoutList } from "./CheckoutList";

export const CheckoutContainer = () => {
    const { items } = useContext(ProductsContext)
    const [itemsDetail, setItemsDetail] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const db = getFirestore();
        const promises = items.map(async(item )=> {
            const refDoc = doc(db, "items", item.id);
            return getDoc(refDoc).then(snapshot => ({
                id: snapshot.id,
                quantity: item.quantity,
                ...snapshot.data(),
            }));
        });
    
        Promise.all(promises).then(details => {
            setItemsDetail(details);
            setLoading(false);
        });
    }, [items]);

    return (
        <CheckoutList
            items={itemsDetail}
        />
    )
}