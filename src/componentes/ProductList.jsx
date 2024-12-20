import { useEffect, useState } from 'react';
import { productosJoyería } from '../data';
import { collection, getDocs, getFirestore } from "firebase/firestore";

export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const [ready, setReady] = useState(false)

	const onAddProduct = product => {
		if (allProducts.find(item => item.id === product.id)) {
			const products = allProducts.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setTotal(total + product.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}

		setTotal(total + product.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};


	return (
		<div className='container-items'>
			{allProducts.map(product => (
				<div className='item' key={product.id}>
					<figure>	
						<img src={`/images/${product.imageUrl}`} alt={product.nameProduct} />
					</figure>
					<div className='info-product'>
						<h2>{product.title}</h2>
						<p className='price'>${product.price}</p>
						<p>{product.descripcion}</p>
						<p>Stock: {product.stock}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
	);
};