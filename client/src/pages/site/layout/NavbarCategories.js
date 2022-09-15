import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { pageNumberContext } from "../../../context/PageNumberProvider";
import { productsPerPageContext } from "../../../context/ProductsPerPageProvider";
import { selectedSortFilterContext } from "../../../context/SelectedSortFilterProvider";
import {
    changeData,
    changeProductsData,
    setCategoryFilter,
} from "../../../store/actions/mainActions";

function NavbarCategories() {
    /**********  DRAG SCROLL - start */
    const subNav = document.querySelectorAll(`.subNavigation`);

    const dispatch = useDispatch();

    const categoriesState = useSelector((state) => state.categoriesReducer);
    const { categories } = categoriesState;
    const originalDataState = useSelector((state) => state.originalProductsReducer);
    const { originalProducts } = originalDataState;

    const { page, setPage } = useContext(pageNumberContext);
    const { selectedSortFilter, setSelectedSortFilter } = useContext(selectedSortFilterContext);
    const { productsPerPage, setProductsPerPage } = useContext(productsPerPageContext);

    subNav.forEach((element) => {
        element.addEventListener("mousedown", (e) => mouseIsDown(e));
        element.addEventListener("mouseup", (e) => mouseUp(e));
        element.addEventListener("mouseleave", (e) => mouseLeave(e));
        element.addEventListener("mousemove", (e) => mouseMove(e));
    });

    let startX;
    let scrollLeft;
    let isDown;

    function mouseIsDown(e) {
        isDown = true;
        startX = e.pageX - document.querySelector(".subNavigation").offsetLeft;
        scrollLeft = document.querySelector(".subNavigation").scrollLeft;
    }
    function mouseUp(e) {
        isDown = false;
    }
    function mouseLeave(e) {
        isDown = false;
    }
    function mouseMove(e) {
        if (isDown) {
            e.preventDefault();

            const x = e.pageX - document.querySelector(".subNavigation").offsetLeft;
            const walkX = x - startX;
            document.querySelector(".subNavigation").scrollLeft = scrollLeft - walkX;
        }
    }
    /********  DRAG SCROLL - end */

    const getProductsByCategory = (id) => {
        if (id == -1) {
            dispatch(changeProductsData(originalProducts));
        } else {
            const newProducts = originalProducts.filter((e) => e.categoryId == id);
            dispatch(changeProductsData(newProducts));
        }

        setPage(0);
        setSelectedSortFilter(-1);
    };

    return (
        <>
            <nav className="subNavigation">
                <button
                    onClick={() => getProductsByCategory(-1)}
                    style={{ color: "black" }}
                    className="subNavigationButton"
                >
                    <p className="catName">All Categories</p>
                </button>
                {categories &&
                    categories.map((category) => (
                        <button
                            onClick={() => getProductsByCategory(category.id)}
                            key={category.id}
                            style={{ color: "black" }}
                            className="subNavigationButton"
                        >
                            <p className="catName">{category.name}</p>
                        </button>
                    ))}
            </nav>
        </>
    );
}

export default NavbarCategories;
