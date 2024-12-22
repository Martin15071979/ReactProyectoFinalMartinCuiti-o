import React, { useEffect, useState } from "react";
import {
  getFirestore,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import {ProductList} from "./ProductList";
import { useParams } from "react-router";

const ProductListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const {id} = useParams()
  
  useEffect(() => {
    const db = getFirestore();

    const refCollection = !id 
      ? collection(db, "items")
      : query(collection(db, "items"), where("categoryId", "==", id));

    getDocs(refCollection)
      .then((snapshot) => {
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      })
      .finally(() => setLoading(false));
  }, [id]);

  return <>{loading ? <h5>Loading...</h5> : <ProductList allProducts={items} />}</>;
};

export default ProductListContainer;
