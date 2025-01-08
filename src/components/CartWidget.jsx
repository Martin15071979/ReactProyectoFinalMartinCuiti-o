import carrito from "../assets/cart.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {ProductsContext} from '../context/ProductsContext'
export const CartWidget = () => {

  const { items } = useContext(ProductsContext);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Link to="/checkout">
        <img
          className="imgCarrito"
          src={carrito}
          style={{ width: "30px", height: "auto" }}
        />

        { <span>{totalItems}</span>}
      </Link>
    </>
  );
};

export default CartWidget;
