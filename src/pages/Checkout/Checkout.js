import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { db, } from "../../firebase/config";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SAVE_ORDER } from "../../redux/slices/orderSlice";
import { CLEAR_CART } from "../../redux/slices/cartSlice";
import Loader from "../../components/Loader/Loader";

const Checkout = () => {
    const [shippingAddress, setShippingAddress] = useState({
        houseName: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        phone: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const { cartItems, cartCount, totalAmount } = useSelector(state => state.cart);
    const { userID, email } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShippingAddress = e => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const placeOrder = e => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast.info("Please add items to your cart to place an order.");
            navigate("/products");
            return;
        };
        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleTimeString();
        setIsLoading(true);
        addDoc(collection(db, `users/${userID}/orders`), {
            items: cartItems,
            Total: totalAmount,
            uid: userID,
            userEmail: email,
            orderDate: date,
            orderTime:time,
            orderStatus: "ordered",
            shippingAddress
        }).then(docRef => {
            setIsLoading(false);
            const orderId = docRef.id;
            updateDoc(doc(db, `users/${userID}/orders`, docRef.id), { id: docRef.id });
            dispatch(SAVE_ORDER({ cartItems, totalAmount, shippingAddress, userID, email, date,time, orderId }));
            dispatch(CLEAR_CART());
            toast.success("order placed");
            navigate("/my-orders");
        }).catch(err => {
            setIsLoading(false);
            toast.error("Could not place order.");
        });


    };

    return (
        <div className="container-fluid">
            {isLoading && <Loader />}
            {
                !isLoading && (
                    <div className="row my-5">
                        <h4 className="text-center pt-5">Checkout Details</h4>

                        <div className='col-2'></div>
                        <div className='col-4'>
                            <h5 className="py-3">Shipping Address</h5>
                            <form onSubmit={placeOrder} autoComplete="off">
                                <div className="mb-3">
                                    <label htmlFor="house-name" className="form-label">House name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        name="houseName"
                                        value={shippingAddress.houseName}
                                        onChange={e => handleShippingAddress(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City/Street</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        name="city"
                                        value={shippingAddress.city}
                                        onChange={e => handleShippingAddress(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        name="state"
                                        value={shippingAddress.state}
                                        onChange={e => handleShippingAddress(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        name="country"
                                        value={shippingAddress.country}
                                        onChange={e => handleShippingAddress(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="zip" className="form-label">Pin code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        name="zipCode"
                                        value={shippingAddress.zipCode}
                                        onChange={e => handleShippingAddress(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Contact Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        name="phone"
                                        value={shippingAddress.phone}
                                        onChange={e => handleShippingAddress(e)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success mb-5">Order</button>
                            </form>
                        </div>

                        <div className='col-4' style={{ marginLeft: "50px" }}>
                            <h5 className="py-3">Checkout Summary</h5>
                            <p className="card-text text-muted">Items Count : {cartCount}</p>
                            <p className="card-text text-muted">Total : ₹ {totalAmount}</p>
                            <p className="card-text text-muted">Products : </p>
                            <ul>
                                {
                                    cartItems.map(item => <li key={item.id}>{item.title}</li>)
                                }
                            </ul>
                            <div>

                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                )
            }
        </div>
    )
};

export default Checkout;
