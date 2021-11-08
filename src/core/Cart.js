import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import CardForCart from "./CardForCart";
import Checkout from "./Checkout";
import "../styles.css";
const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div >
          <div align="center">
          <h2>Your cart has {`${items.length}`} items</h2>

          </div>
        <hr />

          {items.map((product, i) => (
            <div key={i} >
              <CardForCart
                key={i}
                product={product}
                showAddplaToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
              />
            </div>
          ))}
        
      </div>
    );
  };

  const noItemsMessage = () => (
    <div className="card card-header name">
      <h4>
        Your cart is empty. <br />
        <Link to="/shop">Continue shopping</Link>
      </h4>
    </div>
  );

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-9 col-auto">
            <div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
              <div className="col-9">
              {items.length > 0 ? showItems(items) : noItemsMessage()}              </div>
             
        
            </div>
          </div>
          <div className="col"> <Checkout products={items} setRun={setRun} run={run} /></div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;