import { useState, useEffect } from 'react';
import { doc, getDoc, query, getFirestore, collection, getDocs } from "firebase/firestore";
import { Header } from './components/Header';
import ProductListContainer from './components/ProductListContainer'
import { HashRouter, Route, Routes } from "react-router-dom";
import NotFound from './components/NotFound';
import { ProductDetailContainer } from './components/ProductDetailContainer';
import { Provider } from './context/ProductsContext';
import { CheckoutContainer } from './components/CheckoutContainer';

function App() {
	const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

	return (
		<>
		<Provider>
			<HashRouter basename='/ReactProyectoFinalMartinCuitino/'>
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
					<Route path="/items/:id" element={<ProductDetailContainer/>} />
					<Route path="/cart" element={<CheckoutContainer/>} />
					{/* <Route path="*" element={<NotFound />} /> */}
				</Routes>
			</HashRouter>

		</Provider>
		</>
	);
}

export default App;
