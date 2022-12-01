import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { favoriteStorage } from "../../../service/localStorage/favoriteStorage";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
    addProductToCart,
    addToFavorites,
    removeFromFavorites,
    setCartQuantity,
} from "../../../store/actions/mainActions";
import { cartStorage } from "../../../service/localStorage/cartStorage";
import { optionForLoop } from "../../../assets/OptionForLoop";
import { toast } from "react-toastify";
import { getSingleRequest } from "../../../tools/Requests";
import { loadingContext } from "../../../context/LoadingProvider";
import Loading from "../../../assets/Loading";
import PageAnimation from "../../../assets/PageAnimation";
import AddToCartBtn from "../../components/AddToCartBtn";
import FavoriteBtn from "../../components/FavoriteBtn";

function ProductDetailPage() {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const { id } = useParams();

    console.log(product);

    const { isLoading, setIsLoading } = useContext(loadingContext);
    const { currentUser } = useSelector((state) => state.userReducer);

    useEffect(() => {
        setIsLoading(true);
        const fetchProductById = async () => {
            let result = await getSingleRequest("products", id, currentUser.token);
            console.log(result);
            setProduct(result.data);
            setIsLoading(false);
        };
        fetchProductById();
    }, []);

    return (
        <>
            <div className="container mb-3">
                <div className="my-4 text-center placeholder-glow">
                    <h2 className="m-0 py-2 px-4 bg-light border rounded">
                        {product?.brand} {product?.model}
                    </h2>
                </div>

                <div className="row d-flex p-3">
                    <div className="col-lg-4 d-flex">
                        <img
                            src={product?.image?.imageLink1}
                            style={{ width: "100%", objectFit: "contain" }}
                            alt="product"
                        />
                    </div>

                    <div className="col-lg-5 d-flex">
                        <div className="my-auto w-100">
                            <div className="mt-2 mb-3">
                                <h2 className="m-0">$ {Number(product?.unitPrice).toFixed(2)}</h2>
                            </div>

                            <div className="my-3">
                                <h5 className="m-0">{product?.brand}</h5>
                            </div>
                            <div className="my-3">
                                <h5 className="m-0">{product?.model}</h5>
                            </div>

                            <div className="my-3">
                                <h5 className="m-0">
                                    <span className="fs-6">Category:</span>{" "}
                                    {product?.category?.name}
                                </h5>
                            </div>

                            {product?.unitsInStock == 0 ? (
                                <div className="my-3">
                                    <h5 className="m-0">
                                        <span className="fs-6 text-danger">
                                            There is no product in stock.
                                        </span>
                                    </h5>
                                </div>
                            ) : (
                                <div className="d-flex">
                                    <select
                                        className="form-select w-25"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    >
                                        {optionForLoop(10)}
                                    </select>
                                    <div className="my-auto fs-6 ms-3 text-success fw-bold">
                                        Units In Stock: {product.unitsInStock}
                                    </div>
                                </div>
                            )}

                            <div className="my-3 d-flex">
                                <AddToCartBtn
                                    product={product}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                />

                                <div className="d-flex align-items-center mx-2">
                                    <FavoriteBtn product={product} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SUPPLIER SECTION */}
                    <div className="col-lg-3 d-flex">
                        <div className="my-auto w-100">
                            <div className="border-bottom my-2 ">
                                <div className="my-2 bg-light rounded fw-bold placeholder-glow">
                                    Seller
                                </div>
                                <div className="my-1">{product?.supplier?.name}</div>
                            </div>

                            <div className="border-bottom my-2">
                                <div className="my-2 bg-light rounded fw-bold">Address</div>
                                <div className="my-1">{product?.supplier?.address?.address1}</div>
                                <div className="my-1">{product?.supplier?.address?.district}</div>
                                <div className="my-1">{product?.supplier?.address?.city}</div>
                                <div className="my-1">{product?.supplier?.address?.postalCode}</div>
                                <div className="my-1">{product?.supplier?.address?.region}</div>
                                <div className="my-1">{product?.supplier?.address?.country}</div>
                            </div>
                            <div>
                                <div className="my-2 bg-light rounded fw-bold">Contact</div>

                                <div className="my-1">{product?.supplier?.contactName}</div>
                                <div className="my-1">{product?.supplier?.contactTitle}</div>
                                <div className="my-1">{product?.supplier?.address?.phone}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3">
                    <div>
                        <h5>DESCRIPTION</h5>
                        <p className="fs-6">{product?.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetailPage;
