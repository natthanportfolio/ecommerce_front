import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url,wid="90%",hig="90%" }) => (
    <div className="product-img" align="center">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ height: wid, width: hig }}
        />
    </div>
);

export default ShowImage;