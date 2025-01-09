import { Link } from "react-router"

export const Product = ({
    id,
    imageUrl,
    name,
    title,
    price,
}) => {

    return (
        <div>
            <figure>
                <img src={`images/${imageUrl}`} alt={name} />
            </figure>
            <div className='info-product'>
                <h2>{title}</h2>
                <p className='price'>${price}</p>
                <Link to={`/items/${id}`}>
                <button >
                    Ver más
                </button>
                </Link>
            </div> 
        </div>
    )
}