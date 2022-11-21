import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { TablePagination } from "@mui/material";
import HomepageProductCard from "./HomepageProductCard";
import { productsPerPageContext } from "../../../../../context/ProductsPerPageProvider";
import { pageNumberContext } from "../../../../../context/PageNumberProvider";

function SiteHome() {
    const { page, setPage } = useContext(pageNumberContext);
    const { productsPerPage, setProductsPerPage } = useContext(productsPerPageContext);

    const productsState = useSelector((state) => state.productsReducer);
    const { products } = productsState;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 140 });
    };

    const handleChangeProductsPerPage = (event) => {
        setProductsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <div className="siteHome">
                {products &&
                    products
                        .slice(page * productsPerPage, page * productsPerPage + productsPerPage)
                        .map((product, i) => <HomepageProductCard product={product} index={i} />)}
            </div>
            <div
                id="paginationBox"
                style={{ background: "lightgray" }}
                className="d-flex justify-content-center"
            >
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products?.length}
                    rowsPerPage={productsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeProductsPerPage}
                />
            </div>
        </>
    );
}

export default SiteHome;
