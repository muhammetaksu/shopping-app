import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/site/layout/Navbar";
import HomePage from "./pages/site/pages/HomePage";
import ProductDetailPage from "./pages/site/pages/ProductDetailPage";
import CartPage from "./pages/site/pages/CartPage";
import FavoritePage from "./pages/site/pages/FavoritePage";
import {
    fetchCartLocalStorage,
    fetchCategories,
    fetchFavLocalStorage,
    fetchFilteredProducts,
    fetchOriginalProducts,
    fetchProducts,
    fetchSuppliers,
} from "./store/middleware/thunkActions";
import { useDispatch } from "react-redux";
import PageNotFound from "./pages/site/pages/PageNotFound";
import AdminHome from "./pages/admin/home/AdminHome";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOriginalProducts());
        dispatch(fetchProducts());
        dispatch(fetchFilteredProducts());
        dispatch(fetchCategories());
        dispatch(fetchSuppliers());
        dispatch(fetchCartLocalStorage());
        dispatch(fetchFavLocalStorage());
    }, []);

    return (
        <div className="appJs ">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritePage />} />
                <Route path="/productdetail/:id" element={<ProductDetailPage />} />
                <Route path="/*" element={<PageNotFound />} />
                <Route path="/admin/*" element={<AdminHome />} />
            </Routes>
        </div>
    );
}

// function App() {
//   return (
//     <>
//       <LoginProvider>
//         <TodoProvider>
//           <Layout>
//             <Header
//               style={{
//                 position: "fixed",
//                 zIndex: 1,
//                 width: "100%",
//               }}
//             >
//               <div className="logo" />

//               <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[0]}>
//                 <Menu.Item>
//                   <Link to="/admin/categories">Category List</Link>{" "}
//                 </Menu.Item>
//                 <Menu.Item>
//                   <Link to="/admin/addcategory">Add Category</Link>
//                 </Menu.Item>

//                 <Menu.Item>
//                   <Link to="/admin/products">Product List</Link>{" "}
//                 </Menu.Item>
//                 <Menu.Item>
//                  <Link to="/admin/addproduct">Add Product</Link>
//                 </Menu.Item>

//                 <Menu.Item>
//                   <Link to="/admin/suppliers">Supplier List</Link>{" "}
//                 </Menu.Item>
//                 <Menu.Item>
//                   <Link to="/admin/addsupplier">Add Supplier</Link>
//                 </Menu.Item>

//                 <Menu.Item>
//                   <Link to="/admin/todos"> Todos</Link>
//                 </Menu.Item>

//                 <Menu.Item>
//                   <Link to="/admin/addtodo">Add ToDo</Link>
//                 </Menu.Item>

//                 <Menu.Item>
//                   <Link to="/profile">Profile</Link>
//                 </Menu.Item>
//               </Menu>
//             </Header>
//             <Content
//               className="site-layout"
//               style={{ padding: "0 50px", marginTop: 64 }}
//             >
//               <div
//                 className="site-layout-background"
//                 style={{ padding: 24, minHeight: 380 }}
//               >
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/admin/categories" element={<CategoryList />} />
//                   <Route path="/admin/addcategory" element={<AddCategory />} />

//                   <Route path="/admin/products" element={<ProductList />} />
//                   <Route path="/admin/addproduct" element={<AddProduct />} />

//                   <Route path="/admin/suppliers" element={<SupplierList />} />
//                   <Route path="/admin/addsupplier" element={<AddSupplier />} />

//                   <Route path="/admin/todos" element={<TodoListPage />} />
//                   <Route path="/admin/addtodo" element={<AddTodoPage />} />

//                   <Route path="/login" element={<LoginPage />} />
//                   <Route path="/profile" element={<ProfilePage />} />
//                 </Routes>
//               </div>
//             </Content>
//             <Footer style={{ textAlign: "center" }}>Kampüs 365 @2022</Footer>
//           </Layout>
//         </TodoProvider>
//       </LoginProvider>
//     </>
//   );
// }

export default App;
