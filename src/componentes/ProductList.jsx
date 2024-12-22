import { Product } from './Product';

export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {

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
				<Product
				imageUrl = {product.imageUrl}
				name = {product.productName}
				title= {product.title}
				price = {product.price}
				onAddProduct = {onAddProduct}
				/>
				</div>
			))}
		</div>
	);
};