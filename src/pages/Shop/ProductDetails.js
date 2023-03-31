import styles from './ProductDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDoc, doc, deleteDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_TO_CART, CALCULATE_TOTAL_AMOUNT } from '../../redux/slices/cartSlice';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        title: "",
        desc: "",
        price: "",
        category: "",
        brand: "",
        imgUrl: ""
    });
    const [qty, setQty] = useState(1);
    const { isLoggedIn, isAdmin, userID } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteProduct = (id, name) => {
        Swal.fire({
            title: `Are you sure you want to delete ${name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#198754',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDoc(doc(db, "products", id)).then(() => {
                    Swal.fire(
                        'Deleted!',
                        `${name} has been deleted.`,
                        'success'
                    );
                    navigate("/products/list");
                });
            }
        });
    };

    const addToCart = (product) => {
        if (!isLoggedIn) {
            toast.info("Please login to continue.");
            navigate("/login", {
                state: product.id
            });
        }
        else if (isLoggedIn && isAdmin) {
            toast.warning("No permission.");
            navigate("/admin");
        }
        else if (isLoggedIn && !isAdmin) {
            console.log("product added ", product);
            dispatch(ADD_TO_CART({ ...product, qty, uid: userID }));
            dispatch(CALCULATE_TOTAL_AMOUNT());
            // addDoc(collection(db, "cart"), {
            //     product,
            //     pid: id,
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

    useEffect(() => {
        const docRef = doc(db, "products", id);
        getDoc(docRef).then(doc => {
            setProduct(doc.data());
        });
    }, [id]);

    return (
        <div className={`container-fluid my-5 ${styles.product}`}>
            <div className='row'>
                <h2 className='text-center py-5'>Product Details</h2>

                <div className='col-4'>
                    <img src={product.imgUrl} id={styles["product-detail-image"]} alt={product.title} />
                </div>
                <div className='col-8'>
                    <h3>{product.title}</h3>
                    <p className={styles.price}>{`₹ ${product.price}`}</p>
                    <p>{product.desc}</p>
                    <p>
                        <b>SKU : </b>{product.id}
                    </p>
                    <p>
                        <b>Brand : </b>{product.brand}
                    </p>
                    {
                        !isAdmin && (
                            <div>
                                <div className={styles.count}>
                                    <button className={styles.minus} disabled={qty === 1 ? true : false} onClick={() => setQty(qty - 1)}>-</button>
                                    <b>{qty}</b>
                                    <button className={styles.plus} onClick={() => setQty(qty + 1)}>+</button>
                                </div>
                                <button className="btn btn-success mb-5" onClick={() => addToCart(product)}>
                                    ADD TO CART
                                </button>
                            </div>
                        )
                    }
                    {
                        isAdmin && (
                            <button className="btn btn-danger mb-5" onClick={() => deleteProduct(id, product.title)}>
                                Delete
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default ProductDetails;
