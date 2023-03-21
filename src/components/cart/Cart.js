import { Link } from 'react-router-dom';
import styles from './Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    CALCULATE_TOTAL_AMOUNT,
    REMOVE_FROM_CART,
    INCREASE_CART_QUANTITY,
    DECREASE_CART_QUANTITY,
    CLEAR_CART
} from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
// import { deleteDoc,doc } from 'firebase/firestore';
// import { db } from '../../firebase/config';

const Cart = () => {
    const { cartItems, cartCount, totalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const increaseCartQuantity = (cartItem) => {
        dispatch(INCREASE_CART_QUANTITY(cartItem));
        dispatch(CALCULATE_TOTAL_AMOUNT());
        toast.info(`${cartItem.title} cart quantity increased by 1`);
    };

    const decreaseCartQuantity = (cartItem) => {
        dispatch(DECREASE_CART_QUANTITY(cartItem));
        dispatch(CALCULATE_TOTAL_AMOUNT());
        toast.info(`${cartItem.title} cart quantity decreased by 1`);
    };

    const removeFromCart = (pid, pName) => {
        console.log(pid);
        dispatch(REMOVE_FROM_CART(pid));
        dispatch(CALCULATE_TOTAL_AMOUNT());
        // deleteDoc(doc(db,"cart",itm.id))
        toast.info(`${pName} removed from cart.`);
    };

    const clearCart = () => {
        dispatch(CLEAR_CART());
        toast.success("Cart is cleared.");
    };

    return (
        <div className={`row my-5 py-5 ${styles.cart}`}>
            <h2 className='text-center py-3'>My Cart</h2>

            <div className='col-2 text-center'>
                <Link to="/products">
                    <button id={styles["shop-link"]}>Back to Shopping</button>
                </Link>
            </div>

            <div className='col-8'>
                {
                    cartItems.map(item => {
                        // const totalPrice = Number(item.price * item.qty);
                        return (
                            <div className='card-group row' key={item.id}>
                                <div className='col-2'></div>
                                <div className='col-8'>
                                    <div className={`card mb-3 ${styles["cart-card"]}`}>
                                        <div className="row g-0">

                                            <div className="col-md-4">
                                                <img
                                                    src={item.imgUrl}
                                                    className="img-fluid rounded-start"
                                                    alt={item.title}
                                                    style={{ minHeight: "100%" }}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p className="card-text text-muted">Price : ₹ {item.price}</p>
                                                    <p className="card-text"><small className="text-muted">
                                                        Quantity : <span className={styles["product-quantity"]}>
                                                            <button disabled={item.qty === 1 ? true : false} onClick={() => decreaseCartQuantity(item)}>-</button>
                                                            <b>{item.qty}</b>
                                                            <button onClick={() => increaseCartQuantity(item)}>+</button>
                                                        </span>

                                                    </small>
                                                    </p>
                                                    <p className="card-text">
                                                        <small className="text-muted">
                                                            Total : ₹ {item.price * item.qty}
                                                        </small>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="card-body">
                                                    <button className="btn btn-danger my-5" onClick={() => removeFromCart(item.id, item.title)}>
                                                        <i className="fa fa-trash-o fa-sm"></i> Remove</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='col-2'></div>
                            </div>
                        )
                    })
                }
                {
                    !cartItems.length && <p className="text-center mt-5 py-5">Your cart is empty.</p>
                }

            </div>

            <div className='col-2'>
                <div className={`card ${styles["cart-summary-card"]}`}>
                    <div className="card-body">
                        <h5 className="card-title">Cart Summary</h5>
                        <p className="card-text text-muted">Items in Cart : {cartCount}</p>
                        <p className="card-text text-muted">Total : ₹ {totalAmount}</p>
                        <Link to='/checkout'>
                            <button className='btn btn-success'>Checkout</button>
                        </Link>
                        <div className='mt-2' style={{ borderTop: "2px solid black" }}>
                            <button className='btn btn-danger mt-2' onClick={clearCart}>Clear Cart</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Cart;