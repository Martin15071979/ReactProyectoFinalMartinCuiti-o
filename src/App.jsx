import { useState, useEffect } from 'react';
import { doc, getDoc, query, getFirestore, collection, getDocs } from "firebase/firestore";
import { Header } from './componentes/Header';
import ProductListContainer from './componentes/ProductListContainer'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from './componentes/NotFound';

function App() {
	const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Header
					allProducts={allProducts}
					setAllProducts={setAllProducts}
					total={total}
					setTotal={setTotal}
					countProducts={countProducts}
					setCountProducts={setCountProducts}
				/>
				<Routes>
					<Route path="/" element={<ProductListContainer />} />
					<Route path="/category/:id" element={<ProductListContainer />} />
					<Route path="/items/:id" element={<div>Detalle</div>} />
					<Route path="/checkout" element={<div>Checkout</div>} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
