import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import "../styles.css";
import ShowImage from "./ShowImage";

const CardForCart = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            View
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 card-btn-1  "
        >
          Add to cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <button className="btn btn-success btn-sm">In Stock </button>
    ) : (
      <button className="btn btn-danger">Out of Stock </button>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend"></div>
            <div class="col-xs-3">
              <input
                type="number"
                className="form-control"
                value={count}
                onChange={handleChange(product._id)}
              />
            </div>
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove
        </button>
      )
    );
  };

  return (
    <div className="card card-block">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <ShowImage item={product} url="product" wid="400px" hig="240px" />
          </div>
          <div className="col">
            {shouldRedirect(redirect)}
            <p className="card-p black-10">Price : {product.price} $</p>
            <p>Category: {product.category && product.category.name}</p>
            {showStock(product.quantity)}
            <br />
            <span className="mt-3 mb-10">Quantity</span>

            {showCartUpdateOptions(cartUpdate)}

            {showViewButton(showViewProductButton)}
            {showAddToCartBtn(showAddToCartButton)}

            {showRemoveButton(showRemoveProductButton)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardForCart;
