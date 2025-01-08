export const ProductDetail = ({
    categoryId,
    imageUrl,
    title,
    price,
    description,
    stock, 
    handleAddToCart
}) => {


    return (
        <div>
            <div>
                <p>Category: {categoryId}</p>
            </div>
            <figure className="image">
                <img src={`/images/${imageUrl}`} alt={title} />
            </figure>
            <div className='info-product'>
                <h2>{title}</h2>
                <p className='price'>${price}</p>
                <p className="description">{description}</p>
                <button 
                onClick={handleAddToCart}
                >
                    Agregar al carrito
                </button>
                <p>Stock: {stock}</p>
            </div>
        </div>
    )
}