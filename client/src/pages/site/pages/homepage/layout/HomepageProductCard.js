import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { optionForLoop } from "../../../../../assets/OptionForLoop";
import { modalsContext } from "../../../../../context/ModalsProvider";
import AddToCartBtn from "../../../../components/AddToCartBtn";
import FavoriteBtn from "../../../../components/FavoriteBtn";

const HomepageProductCard = ({ product, index }) => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.userReducer);
    const { setIsModalOpen, setModalContent } = useContext(modalsContext);

    const goToDetail = () => {
        if (currentUser?.token) {
            navigate(`/productdetail/${product._id}`);
        } else {
            setIsModalOpen(true);
            setModalContent("You must be logged in to view product details!");
        }
    };

    return (
        <div key={index}>
            <div className="card">
                <div className="cardImgCont">
                    <img
                        onClick={() => goToDetail()}
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
