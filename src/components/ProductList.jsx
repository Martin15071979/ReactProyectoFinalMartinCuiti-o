import { Product } from './Product';
import { Router } from 'react-router';
export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {

	return (
		<div className='container-items'>
			{allProducts.map(product => (
        		<div className='item' key={product.id}>
				<Product
				id={product.id}
				imageUrl = {product.imageUrl}
				name = {product.productName}
				title= {product.title}
				price = {product.price}
				/>
				</div>
			))}
		</div>
	);
};