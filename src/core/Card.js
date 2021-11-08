import React , {useState}from "react";
import { Link , Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import ShowImage from "./ShowImage";
import moment from "moment"
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
          showViewProductButton && (
            <Link to={`/product/${product._id}`} className="mr-2">
              <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
            </Link>
          )
        );
      };
    

      const addToCart = () => {
        // console.log('added');
        addItem(product, setRedirect(true));
      };
    
      const shouldRedirect = redirect => {
        if (redirect) {
          return <Redirect to="/cart" />;
        }
      };
    
      const showAddToCartBtn = showAddToCartButton => {
        return (
          showAddToCartButton && isAuthenticated() && isAuthenticated().user.role === 0 &&(
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
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

      const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
          updateItem(productId, event.target.value);
        }
      };

      const showCartUpdateOptions = cartUpdate => {
        return (
          cartUpdate && (
            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
              </div>
            </div>
          )
        );
      };
      const showRemoveButton = showRemoveProductButton => {
        return (
          showRemoveProductButton && (
            <button
              onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart
              }}
              className="btn btn-outline-danger mt-2 mb-2"
            >
              Remove Product
            </button>
          )
        );
      };





    return (
        <div className="col-10 mb-3">
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" wid="250px" hig="250px" />
                    <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
                    <p className="card-p black-10">$ {product.price}</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
                    {showStock(product.quantity)}
                    <br />
                    {showViewButton(showViewProductButton)}

                    {showAddToCartBtn(showAddToCartButton)} 

                    {showRemoveButton(showRemoveProductButton)}

                    {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>

        </div>
    )
}

export default Card