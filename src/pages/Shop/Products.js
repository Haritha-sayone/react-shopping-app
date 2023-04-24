import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, CALCULATE_TOTAL_AMOUNT } from "../../redux/slices/cartSlice";
import { productsColl } from "../../firebase/config";
import { getDocs, query, where, limit, startAfter } from "firebase/firestore";
import styles from './Products.module.css';
import { toast } from "react-toastify";

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterStatus, setFilterStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [productCategory, setProductCategory] = useState("all");
    const [productBrand, setProductBrand] = useState("all");
    const [priceRange, setPriceRange] = useState(200000);
    const [searchVal, setSearchVal] = useState("");

    const { isLoggedIn, isAdmin, userID } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refObj = useRef();

    const [lastIndex, setLastIndex] = useState();
    const [isEmpty, setIsEmpty] = useState(false);
    const productsPerPage = 4;

    const productName = searchParams.get('name');
    const searchCategory = searchParams.get('category');
    const searchBrand = searchParams.get('brand');
    const searchPrice = searchParams.get('priceRange');
    const page = searchParams.get('page');

    // const params = Object.fromEntries([...searchParams]);

    const filterByCategory = category => {
        refObj.current.value = "";
        setProductCategory(category);
        setSearchParams({
            category,
            brand: productBrand,
            priceRange,
            page
        });
    };
    useEffect(() => {
        if (productCategory === "all") {
            return;
        }
        if (productBrand !== "all") {
            setIsLoading(true);
            const q = query(
                productsColl,
                where("brand", "==", searchBrand),
                where("category", "==", searchCategory),
                where("price", "<=", Number(searchPrice)),
                limit(productsPerPage)
            );
            getDocs(q).then(snapshot => {
                snapshot.forEach((doc) => {
                    console.log(doc.data())
                });
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const selectedItems = snapshot.docs.map(doc => doc.data());
                    setIsLoading(false);
                    setFilteredProducts(selectedItems);
                    setFilterStatus(true);
                    setLastIndex(lastVisible);
                }
                else {
                    setFilteredProducts([]);
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
        }
        else {
            setIsLoading(true);
            const q = query(
                productsColl,
                where("category", "==", searchCategory),
                where("price", "<=", Number(searchPrice)),
                limit(productsPerPage)
            );
            getDocs(q).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const selectedItems = snapshot.docs.map(doc => doc.data());
                    setIsLoading(false);
                    setFilteredProducts(selectedItems);
                    setFilterStatus(true);
                    setLastIndex(lastVisible);
                }
                else {
                    setFilteredProducts([]);
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
        }
    }, [productCategory]);

    const filterByBrand = brand => {
        refObj.current.value = "";
        setProductBrand(brand);
        setSearchParams({
            category: productCategory,
            brand,
            priceRange,
            page
        });
    };
    useEffect(() => {
        if (productBrand === "all") {
            return;
        }
        if (productCategory !== "all") {
            setIsLoading(true);
            const q = query(
                productsColl,
                where("category", "==", searchCategory),
                where("brand", "==", searchBrand),
                where("price", "<=", Number(searchPrice)),
                limit(productsPerPage)
            );
            getDocs(q).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const selectedItems = snapshot.docs.map(doc => doc.data());
                    setIsLoading(false);
                    setFilteredProducts(selectedItems);
                    setFilterStatus(true);
                    setLastIndex(lastVisible);
                }
                else {
                    setFilteredProducts([]);
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
        }
        else {
            setIsLoading(true);
            const q = query(
                productsColl,
                where("brand", "==", searchBrand),
                where("price", "<=", Number(searchPrice)),
                limit(productsPerPage)
            );
            getDocs(q).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const selectedItems = snapshot.docs.map(doc => doc.data());
                    setIsLoading(false);
                    setFilteredProducts(selectedItems);
                    setFilterStatus(true);
                    setLastIndex(lastVisible);
                }
                else {
                    setFilteredProducts([]);
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
        }
    }, [productBrand]);

    const productSearchFilter = searchTerm => {
        setSearchVal(searchTerm);
        setSearchParams({ name: searchTerm, page });
        setProductCategory("all");
        setProductBrand("all");
        setPriceRange(200000);
    };
    useEffect(() => {
        // console.log("search params search = ", productName, typeof (productName));
        // setIsLoading(true);
        // let search = [];
        // if (productName !== null) {
        //     search.push(productName);
        //     console.log(search);
        //     const q = query(productsColl, where("title", "in", search));
        //     getDocs(q).then(snapshot => {
        //         if (snapshot.docs.length !== 0) {
        //             const selectedItems = snapshot.docs.map(doc => doc.data());
        //             setIsLoading(false);
        //             setFilteredProducts(selectedItems);
        //             setFilterStatus(true);
        //         }
        //         else {
        //             setIsLoading(false);
        //             setIsEmpty(true);
        //         }
        //     });
        // }
        // search = [];
        const selectedItems = products.filter(product => product.title.toLowerCase().includes(productName));
        setFilteredProducts(selectedItems);
        setFilterStatus(true);
    }, [searchVal]);

    const filterByPrice = price => {
        console.log("price val = ", price);
        refObj.current.value = "";
        setPriceRange(price);
        setSearchParams({
            category: productCategory,
            brand: productBrand,
            priceRange: price,
            page: 1
        });
    };
    useEffect(() => {
        setFilteredProducts([]);
        if (priceRange === 200000) {
            return;
        }
        if (productCategory !== "all" && productBrand !== "all") {
            setIsLoading(true);
            const q = query(
                productsColl,
                where("category", "==", searchCategory),
                where("brand", "==", searchBrand),
                where("price", "<=", Number(searchPrice)),
                limit(productsPerPage)
            );
            getDocs(q).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const selectedItems = snapshot.docs.map(doc => doc.data());
                    setIsLoading(false);
                    setFilteredProducts(selectedItems);
                    setFilterStatus(true);
                    setLastIndex(lastVisible);
                }
                else {
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
        }
        else if (productCategory === "all" && productBrand !== "all") {
            setIsLoading(true);
            const q = query(
                productsColl,
                where("brand", "==", searchBrand),
                where("price", "<=", Number(searchPrice)),
                limit(productsPerPage)
            );
            getDocs(q).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const selectedItems = snapshot.docs.map(doc => doc.data());
                    setIsLoading(false);
                    setFilteredProducts(selectedItems);
                    setFilterStatus(true);
                    setLastIndex(lastVisible);
                }
                else {
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
        }

        else if (productCategory !== "all" && productBrand === "all") {
            setIsLoading(true);
            const q = query(
                productsColl,
                where("category", "==", searchCategory),
                where("price", "<=", Number(searchPrice)),
                limit(productsPerPage)
            );
            getDocs(q).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const selectedItems = snapshot.docs.map(doc => doc.data());
                    setIsLoading(false);
                    setFilteredProducts(selectedItems);
                    setFilterStatus(true);
                    setLastIndex(lastVisible);
                }
                else {
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
        }

        else {
            setIsLoading(true);
            const q = query(productsColl, where("price", "<=", Number(searchPrice)), limit(productsPerPage));
            getDocs(q).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const selectedItems = snapshot.docs.map(doc => doc.data());
                    setIsLoading(false);
                    setLastIndex(lastVisible);
                    setFilteredProducts(selectedItems);
                    setFilterStatus(true);
                }
                else {
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
        }
    }, [priceRange]);

    const clearAllFilters = () => {
        setProductCategory("all");
        setProductBrand("all");
        refObj.current.value = "";
        setPriceRange(200000);
        setFilterStatus(false);

        setSearchParams({ category: "all", brand: "all", priceRange: 200000, page });

        setIsEmpty(false);
    };

    // useEffect(() => {
    //     setFilterStatus(false);
    // setSearchParams({ category: "all", brand: "all", priceRange: 200000, page: 1 });
    //     getDocs(collection(db, "products")).then(snapshot => {
    //         const allProducts = snapshot.docs.map(doc => (
    //             {
    //                 ...doc.data(),
    //                 id: doc.id
    //             }
    //         ));
    //         setProducts(allProducts);
    //         setIsLoading(false);
    //     });
    // }, []);

    useEffect(() => {
        if (searchCategory !== null && searchBrand !== null & searchPrice !== null && page !== null) {
            if (searchCategory !== "all" && searchBrand === "all") {
                const q = query(
                    productsColl,
                    where("category", "==", searchCategory),
                    where("price", "<=", Number(searchPrice)),
                    limit(productsPerPage)
                );
                getDocs(q).then(snapshot => {
                    if (snapshot.docs.length !== 0) {
                        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                        const selectedItems = snapshot.docs.map(doc => (
                            { ...doc.data() }
                        ));
                        setSearchParams({ category: searchCategory, brand: "all", priceRange: searchPrice, page: page });
                        setFilteredProducts(selectedItems);
                        setFilterStatus(true);
                        setLastIndex(lastVisible);
                        setIsLoading(false);
                    }
                    else {
                        setIsLoading(false);
                        setIsEmpty(true);
                    }
                });
                return;
            }

            else if (searchCategory === "all" && searchBrand !== "all") {
                const q = query(
                    productsColl,
                    where("brand", "==", searchBrand),
                    where("price", "<=", Number(searchPrice)),
                    limit(productsPerPage)
                );
                getDocs(q).then(snapshot => {
                    if (snapshot.docs.length !== 0) {
                        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                        const selectedItems = snapshot.docs.map(doc => doc.data());
                        setSearchParams({ category: "all", brand: searchBrand, priceRange: searchPrice, page: page });
                        setFilteredProducts(selectedItems);
                        setFilterStatus(true);
                        setLastIndex(lastVisible);
                        setIsLoading(false);
                    }
                    else {
                        setIsLoading(false);
                        setIsEmpty(true);
                    }
                });
                return;
            }

            else if (searchCategory !== "all" && searchBrand !== "all") {
                const q = query(
                    productsColl,
                    where("category", "==", searchCategory),
                    where("brand", "==", searchBrand),
                    where("price", "<=", Number(searchPrice)),
                    limit(productsPerPage)
                );
                getDocs(q).then(snapshot => {
                    if (snapshot.docs.length !== 0) {
                        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                        const selectedItems = snapshot.docs.map(doc => doc.data());
                        setSearchParams({ category: searchCategory, brand: searchBrand, priceRange: searchPrice, page: page });
                        setFilteredProducts(selectedItems);
                        setFilterStatus(true);
                        setLastIndex(lastVisible);
                        setIsLoading(false);
                    }
                    else {
                        setIsLoading(false);
                        setIsEmpty(true);
                    }
                });
                return;
            }

            else if (searchCategory === "all" && searchBrand === "all" && Number(searchPrice) !== 200000) {
                const q = query(
                    productsColl,
                    where("price", "<=", Number(searchPrice)),
                    limit(productsPerPage)
                );
                getDocs(q).then(snapshot => {
                    if (snapshot.docs.length !== 0) {
                        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                        const selectedItems = snapshot.docs.map(doc => doc.data());
                        setSearchParams({ category: "all", brand: "all", priceRange: searchPrice, page: page });
                        setFilteredProducts(selectedItems);
                        setFilterStatus(true);
                        setLastIndex(lastVisible);
                        setIsLoading(false);
                    }
                    else {
                        setIsLoading(false);
                        setIsEmpty(true);
                    }
                });
                return;
            }
        }

        setIsLoading(true);
        const firstBatch = query(productsColl, limit(productsPerPage));
        getDocs(firstBatch)
            .then(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                const firstBatchProducts = snapshot.docs.map(doc => (
                    { ...doc.data() }
                ));
                setIsLoading(false);
                setSearchParams({ category: "all", brand: "all", priceRange: 200000, page: 1 });
                setProducts(firstBatchProducts);
                setFilterStatus(false);
                setLastIndex(lastVisible);
            });
    }, []);

    const fetchNextBatch = () => {
        setIsLoading(true);
        if (searchCategory !== "all" && searchBrand === "all") {
            const nextBatch = query(
                productsColl,
                where("category", "==", searchCategory),
                where("price", "<=", Number(searchPrice)),
                startAfter(lastIndex),
                limit(productsPerPage)
            );
            getDocs(nextBatch).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const nextProducts = snapshot.docs.map(doc => (
                        { ...doc.data() }
                    ));
                    setSearchParams({ category: searchCategory, brand: "all", priceRange: searchPrice, page: +page + 1 });
                    setFilteredProducts([...filteredProducts, ...nextProducts]);
                    setLastIndex(lastVisible);
                    setIsLoading(false);
                }
                else {
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });

        }

        else if (searchCategory === "all" && searchBrand !== "all") {
            const nextBatch = query(
                productsColl,
                where("brand", "==", searchBrand),
                where("price", "<=", Number(searchPrice)),
                startAfter(lastIndex),
                limit(productsPerPage)
            );
            getDocs(nextBatch).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const nextProducts = snapshot.docs.map(doc => (
                        { ...doc.data() }
                    ));
                    setSearchParams({ category: "all", brand: searchBrand, priceRange: searchPrice, page: +page + 1 });
                    setFilteredProducts([...filteredProducts, ...nextProducts]);
                    setLastIndex(lastVisible);
                    setIsLoading(false);
                }
                else {
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
        }

        else if (searchCategory !== "all" && searchBrand !== "all") {
            const nextBatch = query(
                productsColl,
                where("category", "==", searchCategory),
                where("brand", "==", searchBrand),
                where("price", "<=", Number(searchPrice)),
                startAfter(lastIndex),
                limit(productsPerPage)
            );
            getDocs(nextBatch).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const nextProducts = snapshot.docs.map(doc => (
                        { ...doc.data() }
                    ));
                    setSearchParams({ category: searchCategory, brand: searchBrand, priceRange: searchPrice, page: +page + 1 });
                    setFilteredProducts([...filteredProducts, ...nextProducts]);
                    setLastIndex(lastVisible);
                    setIsLoading(false);
                }
                else {
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
        }

        else if (searchCategory === "all" && searchBrand === "all" && Number(searchPrice) !== 200000) {
            const nextBatch = query(
                productsColl,
                where("price", "<=", Number(searchPrice)),
                startAfter(lastIndex),
                limit(productsPerPage)
            );
            getDocs(nextBatch).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    console.log("i am in");
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const nextProducts = snapshot.docs.map(doc => (
                        { ...doc.data() }
                    ));
                    setSearchParams({ category: "all", brand: "all", priceRange: searchPrice, page: +page + 1 });
                    setFilteredProducts([...filteredProducts, ...nextProducts]);
                    setLastIndex(lastVisible);
                    setIsLoading(false);
                }
                else {
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
        }

        else {
            const nextBatch = query(productsColl, startAfter(lastIndex), limit(productsPerPage));
            getDocs(nextBatch).then(snapshot => {
                if (snapshot.docs.length !== 0) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const nextProducts = snapshot.docs.map(doc => (
                        { ...doc.data() }
                    ));
                    setSearchParams({ category: "all", brand: "all", priceRange: 200000, page: +page + 1 });
                    setProducts([...products, ...nextProducts]);
                    setLastIndex(lastVisible);
                    setIsLoading(false);
                }
                else {
                    setIsLoading(false);
                    setIsEmpty(true);
                }

            });
        }
    };

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
                        <option value="hp">HP</option>
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
                <div className="col-2 pt-1">
                    <label>Price</label>
                    <input type="range" min={0} max={200000} step={1000} value={priceRange} onChange={e => filterByPrice(e.target.value)} />
                    <span>₹{priceRange}</span>
                </div>
            </div>

            <div className="card-group row mb-3">
                {
                    !isLoading && filterStatus && filteredProducts?.map(product => {
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
                    !isLoading && !filterStatus && products.map(product => {
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
                    filterStatus && !filteredProducts.length && !isLoading && <p className="text-center mt-5 py-5">No products found for this combination of filters.</p>
                }

                {
                    !filterStatus && !products.length && !isLoading && <p className="text-center mt-5 py-5">No products found.</p>
                }
                {
                    isLoading && <p className="text-center mt-5">Loading...</p>
                }

            </div>

            <div className='row mb-5 pb-5'>
                <div className='col-5'></div>
                <div className='col-5'>
                    {
                        !isLoading && !isEmpty && <button className='btn btn-outline-success' onClick={fetchNextBatch}>View More</button>
                    }

                    {
                        !isLoading && isEmpty && <p>No more products found.</p>
                    }
                </div>
            </div>

        </div >

    )
}

export default Products;
