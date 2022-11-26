import React from "react";
import { useNavigate } from "react-router-dom";
import TrashIcon from "../../assets/TrashIcon";

const FavPageProduct = ({ product, deleteFromFavorites }) => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="favPageProductCard" key={product._id}>
                <div>
                    <img
                        src={product?.image.imageLink1}
                        onClick={() => navigate(`/productdetail/${product?._id}`)}
                        alt="detail"
                    />
                </div>
                <div>{product?.brand}</div>
                <div>{product?.model}</div>
                <div>
                    Unit Price: <br /> $ {Number(product?.unitPrice).toFixed(2)}
                </div>

                <div onClick={() => deleteFromFavorites(product)}>
                    <TrashIcon />
                </div>
            </div>
        </div>
    );
};

export default FavPageProduct;
