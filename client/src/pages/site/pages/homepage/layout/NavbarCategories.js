import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { pageNumberContext } from "../../../../../context/PageNumberProvider";
import { changeProductsData } from "../../../../../store/actions/mainActions";

function NavbarCategories() {
    /**********  DRAG SCROLL - start */
    const subNav = document.querySelectorAll(`.subNavigation`);

    const dispatch = useDispatch();

    const categoriesState = useSelector((state) => state.categoriesReducer);
    const { categories } = categoriesState;
    const originalDataState = useSelector((state) => state.originalProductsReducer);
    const { originalProducts } = originalDataState;

    const { page, setPage } = useContext(pageNumberContext);

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
        if (id === -1) {
            dispatch(changeProductsData(originalProducts));
        } else {
            const newProducts = originalProducts.filter((e) => e.category._id === id);
            dispatch(changeProductsData(newProducts));
        }

        setPage(0);
    };

    return (
        <>
            <nav className="subNavigation">
                <button onClick={() => getProductsByCategory(-1)} className="subNavigationButton">
                    <p className="catName">All Categories</p>
                </button>
                {categories &&
                    categories.map((category, i) => (
                        <button
                            onClick={() => getProductsByCategory(category._id)}
                            key={i}
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
