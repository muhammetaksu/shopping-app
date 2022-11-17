import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { TablePagination } from "@mui/material";
import { pageNumberContext } from "../../../context/PageNumberProvider";
import { productsPerPageContext } from "../../../context/ProductsPerPageProvider";
import HomepageProductCard from "../../../assets/HomepageProductCard";

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
        <div className="row w-100">
            {products &&
                products
                    .slice(page * productsPerPage, page * productsPerPage + productsPerPage)
                    .map((product, i) => <HomepageProductCard product={product} index={i} />)}

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
        </div>
    );
}

export default SiteHome;
