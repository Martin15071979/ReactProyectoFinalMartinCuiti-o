export const Product = ({
    imageUrl,
    name,
    title,
    price,
    onAddProduct
}) => {

    return (
        <div>
            <figure>
                <img src={`/images/${imageUrl}`} alt={name} />
            </figure>
            <div className='info-product'>
                <h2>{title}</h2>
                <p className='price'>${price}</p>
                <button onClick={() => onAddProduct(product)}>
                    Añadir al carrito
                </button>
            </div>
        </div>
    )
}