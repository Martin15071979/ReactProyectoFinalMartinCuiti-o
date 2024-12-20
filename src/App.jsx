import { useState, useEffect } from 'react';
import { doc, getDoc,  query, getFirestore, collection, getDocs } from "firebase/firestore";
import { Header } from './componentes/Header';
import { ProductList } from './componentes/ProductList';



function App() {
	const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

	useEffect(() => {
	
	const db = getFirestore();
	const q = query(
		collection(db, "items"),
	  );
	
	  getDocs(q).then((snapshot) => {
		if (snapshot.size === 0);
		else
		  snapshot.docs.map((doc) => {
			return { id: doc.id, ...doc.data() };
		  });
		  const list = snapshot.docs.map((doc)=>({
			id: doc.id,
			...doc.data()
		  }))
		  setAllProducts(list)
		  setTotal(list.length)
	  })
	})

	// 	const [allProducts, setAllProducts] = useState([]);
	// 	const [countProducts, setCountProducts] = useState(0);

	//   const [data,setData] = useState({});


	//   useEffect(() => {

	//     // Creo la referencia al elemento
	//     const itemRef = doc(db,"items","AIzaSyDTjGQNhyMzUwhAa2hz-pcYQS4SwfzE8a0");

	//     // traigo el elemento

	//     getDoc(itemRef).then(snapshot=>{;
	//       setData(snapshot.data())
	//     })
	//   },[])


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
