import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../../store/middleware/thunkActions";
import { clearGetProductById } from "../../../store/actions/mainActions";
import { toast } from "react-toastify";
import { getSingleRequest, updateRequest } from "../../../tools/Requests";

const validationSchema = yup.object({
    brand: yup.string().required("Brand is required!"),
    model: yup.string().required("Model is required!"),
    unitPrice: yup.number().required("Price is required!"),
    unitsInStock: yup.number().required("Stock is required!"),
    category: yup.string().required("Category is required!"),
    supplier: yup.string().required("Supplier is required!"),
    description: yup.string().required("Description is required!"),
    imageLink1: yup.string().required("Image 1 is required!"),
    imageLink2: yup.string().required("Image 2 is required!"),
});

function UpdateProduct({ currentUser }) {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const categoriesState = useSelector((state) => state.categoriesReducer);
    const { categories } = categoriesState;
    const suppliersState = useSelector((state) => state.suppliersReducer);
    const { suppliers } = suppliersState;

    useEffect(() => {
        const fetchProductById = () => async () => {
            let result = await getSingleRequest("products", id, currentUser.token);
            setProduct(result.data);
        };
        fetchProductById();
    }, [id]);

    return (
        <div className="my-2 m-3">
            <div>
                <h4 className="text-center border rounded p-1">Update Product</h4>
            </div>
            <div className="border p-3 rounded">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        brand: product.brand || "",
                        model: product.model || "",
                        unitPrice: product.unitPrice || "",
                        unitsInStock: product.unitsInStock || "",
                        category: product?.category?._id || "",
                        supplier: product?.supplier?._id || "",
                        description: product.description || "",
                        imageLink1: product?.image?.imageLink1 || "",
                        imageLink2: product?.image?.imageLink2 || "",
                        imageLink3: product?.image?.imageLink3 || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        if (values) {
                            const response = await updateRequest(
                                "products",
                                id,
                                currentUser.token,
                                values
                            );
                            if (response?.status === 201) {
                                toast.success("Successfully added!");
                                navigate("/admin/product-list");
                            } else {
                                toast.error("Something went wrong");
                            }
                        }
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit} className=" row">
                            <div className="col-lg-3">
                                <label htmlFor="brand" className="form-label">
                                    Brand
                                </label>

                                <input
                                    className="form-control"
                                    id="brand"
                                    name="brand"
                                    value={values.brand}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter product brand"
                                />
                                <div className="text-danger">
                                    {errors.brand && touched.brand && errors.brand}
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="model" className="form-label">
                                    Model
                                </label>
                                <input
                                    className="form-control"
                                    id="model"
                                    name="model"
                                    value={values.model}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter product model"
                                />
                                <div className="text-danger">
                                    {errors.model && touched.model && errors.model}
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="unitPrice" className="form-label">
                                    Unit Price
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="unitPrice"
                                    name="unitPrice"
                                    value={values.unitPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter unit price"
                                />
                                <div className="text-danger">
                                    {errors.unitPrice && touched.unitPrice && errors.unitPrice}
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="unitsInStock" className="form-label">
                                    Units in Stock
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="unitsInStock"
                                    name="unitsInStock"
                                    value={values.unitsInStock}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter stock"
                                />
                                <div className="text-danger">
                                    {errors.unitsInStock &&
                                        touched.unitsInStock &&
                                        errors.unitsInStock}
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <label htmlFor="category" className="form-label">
                                    Category
                                </label>
                                <select
                                    className="form-select"
                                    id="category"
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select Category</option>

                                    {categories &&
                                        categories.map((category, i) => (
                                            <option value={category._id} key={i}>
                                                {category.name}
                                            </option>
                                        ))}
                                </select>

                                <div className="text-danger">
                                    {errors.category && touched.category && errors.category}
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <label htmlFor="supplier" className="form-label">
                                    Supplier
                                </label>
                                <select
                                    className="form-select"
                                    id="supplier"
                                    name="supplier"
                                    value={values.supplier}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select Supplier</option>

                                    {suppliers &&
                                        suppliers.map((supplier, i) => (
                                            <option value={supplier._id} key={i}>
                                                {supplier.name}
                                            </option>
                                        ))}
                                </select>

                                <div className="text-danger">
                                    {errors.supplier && touched.supplier && errors.supplier}
                                </div>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter description"
                                />
                                <div className="text-danger">
                                    {errors.description &&
                                        touched.description &&
                                        errors.description}
                                </div>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="imageLink1" className="form-label">
                                    Image Link 1
                                </label>
                                <input
                                    className="form-control"
                                    id="imageLink1"
                                    name="imageLink1"
                                    value={values.imageLink1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="The picture resolution must be at least 1000x1000 and the aspect ratio must be 1:1."
                                />
                                <div className="text-danger">
                                    {errors.imageLink1 && touched.imageLink1 && errors.imageLink1}
                                </div>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="imageLink2" className="form-label">
                                    Image Link 2
                                </label>
                                <input
                                    className="form-control"
                                    id="imageLink2"
                                    name="imageLink2"
                                    value={values.imageLink2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="The picture resolution must be at least 1000x1000 and the aspect ratio must be 1:1."
                                />
                                <div className="text-danger">
                                    {errors.imageLink2 && touched.imageLink2 && errors.imageLink2}
                                </div>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="imageLink3" className="form-label">
                                    Image Link 3
                                </label>
                                <input
                                    className="form-control"
                                    id="imageLink3"
                                    name="imageLink3"
                                    value={values.imageLink3}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="The picture resolution must be at least 1000x1000 and the aspect ratio must be 1:1."
                                />
                                {/* <div className="text-danger">
                                    {errors.image.imageLink3 &&
                                        touched.image.imageLink3 &&
                                        errors.image.imageLink3}
                                </div> */}
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary"
                                >
                                    Update Product
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default UpdateProduct;
