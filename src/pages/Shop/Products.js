import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, CALCULATE_TOTAL_AMOUNT } from "../../redux/slices/cartSlice";
import { db } from "../../firebase/config";
import { getDocs, collection, addDoc, updateDoc } from "firebase/firestore";
import styles from './Products.module.css';
import { toast } from "react-toastify";

function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterStatus, setFilterStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [productCategory, setProductCategory] = useState("all");
    const [productBrand, setProductBrand] = useState("all");
    const [priceRange, setPriceRange] = useState(200000);
    const { isLoggedIn, isAdmin, userID } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refObj = useRef();

    const filterByCategory = category => {
        setProductBrand("all");
        setPriceRange(200000);
        refObj.current.value = "";
        if (category === "all") {
            setFilterStatus(false);
            return;
        };
        setFilterStatus(true);
        setProductCategory(category);
        const selectedItems = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
        setFilteredProducts(selectedItems);
    };

    const filterByBrand = brand => {
        setProductCategory("all");
        setPriceRange(200000);
        refObj.current.value = "";
        if (brand === "all") {
            setFilterStatus(false);
            return;
        };
        setFilterStatus(true);
        setProductBrand(brand);
        const selectedItems = products.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
        setFilteredProducts(selectedItems);
    };

    const productSearchFilter = searchTerm => {
        setProductCategory("all");
        setProductBrand("all");
        setPriceRange(200000);
        setFilterStatus(true);
        const selectedItems = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredProducts(selectedItems);
    };

    const filterByPrice = price => {
        setProductCategory("all");
        setProductBrand("all");
        setPriceRange(price);
        refObj.current.value = "";
        setFilterStatus(true);
        const selectedItems = products.filter(product => Number(product.price) <= price);
        setFilteredProducts(selectedItems);
    };

    const clearAllFilters = () => {
        setFilterStatus(false);
        setProductCategory("all");
        setProductBrand("all");
        refObj.current.value = "";
        setPriceRange(200000);
    };

    useEffect(() => {
        getDocs(collection(db, "products")).then(snapshot => {
            const allProducts = snapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            ));
            setProducts(allProducts);
            setIsLoading(false);
        });
    }, []);

    const addToCart = (product) => {
        if (!isLoggedIn) {
            toast.info("Please login to continue.");
            navigate("/login");
        }
        else if (isLoggedIn && isAdmin) {
            toast.warning("No permission.");
            navigate("/admin");
        }
        else if (isLoggedIn && !isAdmin) {
            console.log("product added ", product);
            dispatch(ADD_TO_CART({ ...product, uid: userID }));
            dispatch(CALCULATE_TOTAL_AMOUNT());
            // addDoc(collection(db,`users/${userID}/cart`),{
            //     product,
            //     pid:product.id,
            //     uid:userID
            // })

            // addDoc(collection(db, "cart"), {
            //     product,
            //     pid: product.id,
            //     uid: userID
            // }).then(docRef => {
            //     updateDoc(docRef, {
            //         id: docRef.id
            //     });
            //     toast.success("Success! Product added to cart.");
            //     navigate("/cart");
            // }).catch(err => {
            //     toast.error("Something went wrong!");
            // });
            toast.success(`${product.title} added to cart.`);
            navigate("/cart");
        }
    }

    return (
        <div className={`container-fluid ${styles.products}`} style={{ maginTop: "78px" }}>
            <div className="row mt-5 mx-2 pt-5">
                <div className="col-1">
                    <button className="btn btn-outline-success" onClick={clearAllFilters}>
                        <i className="fa fa-repeat" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="col-3">
                    <select className="form-select" value={productCategory} onChange={(e) => filterByCategory(e.target.value)}>
                        <option value="all" disabled>Select Category</option>
                        <option value="laptops">Laptops</option>
                        <option value="mobiles">Mobiles</option>
                        <option value="cameras">Camera</option>
                        <option value="fashion">Fashion</option>
                    </select>
                </div>
                <div className="col-3">
                    <select className="form-select" value={productBrand} onChange={(e) => filterByBrand(e.target.value)}>
                        <option value="all" disabled>Select Brand</option>
                        <option value="apple">Apple</option>
                        <option value="lenovo">Lenovo</option>
                        <option value="HP">HP</option>
                        <option value="canon">Canon</option>
                        <option value="allen solly">Allen Solly</option>
                        <option value="puma">Puma</option>
                        <option value="nike">Nike</option>
                        <option value="adidas">Adidas</option>
                    </select>
                </div>
                <div className="col-3">
                    <input type="search" placeholder="Search product by name..." className="form-control" onChange={e => productSearchFilter(e.target.value)} ref={refObj} />
                </div>
                <div className="col-2">
                    <label>Price</label>
                    <input type="range" min={0} max={200000} step={1000} value={priceRange} onChange={e => filterByPrice(e.target.value)} />
                    <span>₹{priceRange}</span>
                </div>
            </div>

            <div className="card-group row mb-5">
                {
                    filterStatus && filteredProducts?.map(product => {
                        return (
                            <div className="col-3 text-center" key={product.id}>
                                <div className="card" style={{ margin: "20px" }}>
                                    <Link to={`/product/${product.id}/details`}>
                                        <img
                                            src={product.imgUrl}
                                            className="card-img-top"
                                            alt={product.title}
                                            width="10px"
                                            height="200px"
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-product">₹ {product.price}</li>
                                    </ul>
                                    <div className="card-body">
                                        <button className="btn block btn-success" onClick={() => addToCart(product)}>
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                {
                    !filterStatus && products.map(product => {
                        return (
                            <div className="col-3 text-center" key={product.id}>
                                <div className="card" style={{ margin: "20px" }}>
                                    <Link to={`/product/${product.id}/details`}>
                                        <img
                                            src={product.imgUrl}
                                            className="card-img-top"
                                            alt={product.title}
                                            width="10px"
                                            height="200px"
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                    </div>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-product">₹ {product.price}</li>
                                    </ul>

                                    <div className="card-body">
                                        <button className="btn block btn-success" onClick={() => addToCart(product)}>
                                            Add To Cart
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }

                {
                    filterStatus && !filteredProducts.length && !isLoading && <p className="text-center mt-5 py-5">No products found.</p>
                }

                {
                    !filterStatus && !products.length && !isLoading && <p className="text-center mt-5 py-5">No products found.</p>
                }
                {
                    isLoading && <p className="text-center mt-5 py-5">Loading...</p>
                }
            </div>
        </div >

    )
}

export default Products;
