import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { changeProductsData } from "../../../../../store/actions/mainActions";
import { pageNumberContext } from "../../../../../context/PageNumberProvider";

function Filter() {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [selectedSortFilter, setSelectedSortFilter] = useState(-1);

    const productsState = useSelector((state) => state.productsReducer);
    const { products } = productsState;
    const originalDataState = useSelector((state) => state.originalProductsReducer);
    const { originalProducts } = originalDataState;

    const { page, setPage } = useContext(pageNumberContext);

    const dispatch = useDispatch();

    /** ASC DESC PRICE FILTER */
    useEffect(() => {
        if (selectedSortFilter === "Asc") {
            const oldState = [...products];
            const ascProducts = oldState.sort((a, b) => a.unitPrice - b.unitPrice);
            dispatch(changeProductsData(ascProducts));
        } else if (selectedSortFilter === "Desc") {
            const oldState = [...products];
            const descProducts = oldState.sort((a, b) => b.unitPrice - a.unitPrice);
            dispatch(changeProductsData(descProducts));
        }
    }, [selectedSortFilter]);

    const priceRange = (min, max) => {
        if (min < max && max > 0 && min != NaN && max != NaN) {
            const filteredProducts = products.filter(
                (product) => product.unitPrice > min && product.unitPrice < max
            );
            dispatch(changeProductsData(filteredProducts));
        } else if (min > max) {
            alert("Minimum price can't be bigger than maximum price!");
        } else {
            alert("Please enter a valid value.");
        }
        setPage(0);
    };

    const clearPriceFilter = async () => {
        dispatch(changeProductsData(originalProducts));

        setPage(0);
        setMaxPrice(0);
        setMinPrice(0);
        setSelectedSortFilter(-1);
    };

    return (
        <div style={{ background: "lightgray" }} className="filter d-flex">
            <div id="filterContainer" className="d-flex flex-row gap-2">
                <div
                    id="sortingFilter"
                    // style={{ background: "lightgray" }}
                    className=" border-end   py-1 px-3 "
                >
                    <label className="my-auto mb-1 w-100 text-center">Sort:</label>
                    <select
                        id="sortingFilterSelect"
                        className="form-select m-auto"
                        value={selectedSortFilter}
                        onChange={(e) => setSelectedSortFilter(e.target.value)}
                    >
                        <option value={-1}>No Filter</option>
                        <option value="Asc">Low To High</option>
                        <option value="Desc">High To Low</option>
                    </select>
                </div>
                <div
                    id="priceRange"
                    // style={{ background: "lightgray" }}
                    className=" border-end py-1 px-3"
                >
                    <label className="my-auto mb-1 w-100 text-center">Price Range:</label>
                    <div className="m-auto d-flex justify-content-center flex-wrap gap-1">
                        <div className="m-0  text-center my-auto">
                            <label className="my-auto me-1">Min:</label>
                            <input
                                className=" border filterInputs"
                                style={{ maxWidth: "50px" }}
                                id="minPrice"
                                type="text"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                            />
                        </div>
                        <div className="m-0  text-center my-auto">
                            <label className="my-auto me-1">Max:</label>
                            <input
                                className=" border filterInputs"
                                style={{ maxWidth: "50px" }}
                                id="maxPrice"
                                type="text"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                            />
                        </div>

                        <div className="m-0 p-0 my-auto d-flex justify-content-center">
                            <button
                                id="filterOkBtn"
                                onClick={() => priceRange(minPrice, maxPrice)}
                                className="px-2 border"
                            >
                                Ok
                            </button>
                            <button
                                id="filterOkBtn"
                                onClick={() => clearPriceFilter()}
                                className="p-0 ms-2 border"
                            >
                                <ClearIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="productCount" className="d-flex justify-content-center my-auto ">
                <div className="text-center d-flex  flex-column align-middle">
                    <span className="mb-1 fw-bold">Total Products</span>
                    <span className="fw-bold fs-5">{products?.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Filter;
