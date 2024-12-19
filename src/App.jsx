import { useState, useEffect } from 'react';
import {doc,getDoc,getFirestore} from "firebase/firestore";
import { Header } from './componentes/Header';
import { ProductList } from './componentes/ProductList';

function App() {
	const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

  const [data,setData] = useState({});

  const db = getFirestore();

  useEffect(() => {

    // Creo la referencia al elemento
    const itemRef = doc(db,"items","AIzaSyDTjGQNhyMzUwhAa2hz-pcYQS4SwfzE8a0");

    // traigo el elemento

    getDoc(itemRef).then(snapshot=>{
      console.log(snapshot);
      console.log(snapshot.data());
      setData(snapshot.data())
    })
  },[])


	return (
		<>
			<Header
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
			<ProductList
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
		</>
	);
}

export default App;
