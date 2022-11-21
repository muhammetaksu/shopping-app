import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { optionForLoop } from "../../../../../assets/OptionForLoop";
import { cartStorage } from "../../../../../service/localStorage/cartStorage";
import { addProductToCart, setCartQuantity } from "../../../../../store/actions/mainActions";
import AddToCartBtn from "../../../../components/AddToCartBtn";
import FavoriteBtn from "../../../../components/FavoriteBtn";

const HomepageProductCard = ({ product, index }) => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    return (
        <div key={index}>
            <div className="card">
                <div className="cardImgCont">
                    <img
                        onClick={() => navigate(`/productdetail/${product._id}`)}
                        className="cardImg"
                        src={product.image.imageLink1}
                        alt="detail"
                    />
                </div>
                <div className="cardCol ">
                    <div className="cardPrice ">$ {Number(product.unitPrice).toFixed(2)}</div>
                    <div className="cardProduct ">{product.brand}</div>
                    <div className="cardProduct ">{product.model}</div>
                    <div className="cardProduct">Category: {product.category.name}</div>
                    {product.unitsInStock != 0 ? (
                        <div className="cardProduct">
                            <select
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            >
                                {optionForLoop(10)}
                            </select>
                            <div className="my-auto ms-3">
                                Units In Stock: {product.unitsInStock}
                            </div>
                        </div>
                    ) : (
                        <div className="cardProduct text-danger">There is no product in stock.</div>
                    )}

                    <div className=" cardProduct">
                        <>
                            <AddToCartBtn
                                product={product}
                                quantity={quantity}
                                setQuantity={setQuantity}
                            />
                        </>
                        <div id="favStarCont">
                            <div>
                                <FavoriteBtn product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomepageProductCard;
