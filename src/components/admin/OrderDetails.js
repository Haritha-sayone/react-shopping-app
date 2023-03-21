import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useDispatch } from 'react-redux';
import { EDIT_ORDER_STATUS } from '../../redux/slices/orderSlice';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

const OrderDetails = () => {
    const { id, uid } = useParams();
    const dispatch = useDispatch();
    const [order, setOrder] = useState({
        id: "",
        orderDate: "",
        Total: "",
        orderStatus: "ordered",
        items: [],
        shippingAddress: { houseName: "", city: "", state: "", country: "", zipCode: "", phone: "" },
        uid: "",
        userEmail: ""
    });
    const [status, setStatus] = useState(order.orderStatus);
    const [isLoading, setIsLoading] = useState(false);

    const editOrderStatus = id => {
        if (order.orderStatus === "cancelled") {
            toast.warning("No permission.");
            return;
        }
        setIsLoading(true);
        updateDoc(doc(db, `users/${uid}/orders`, id), {
            orderStatus: status
        }).then(() => {
            setIsLoading(false);
            dispatch(EDIT_ORDER_STATUS({ id, status }));
            order.orderStatus = status;
        });

    };

    useEffect(() => {
        const docRef = doc(db, `users/${uid}/orders`, id);
        getDoc(docRef).then(doc => {
            setOrder(doc.data());
        });
    }, []);

    return (
        <div className="container-fluid">
            {isLoading && <Loader />}
            {/* <h4 className='text-center pt-5'>Order Details</h4> */}
            {
                !isLoading && (
                    <div className='row mt-5'>
                        <h4 className='text-center pt-5'>Order Details</h4>

                        <div className='col-4 py-5' style={{ color: "grey", backgroundColor: "whitesmoke" }}>
                            <p>
                                <b>Order Id : </b>
                                <i>{order.id}</i>
                            </p>
                            <p>
                                <b>Order Date : </b>
                                <i>{order.orderDate}</i>
                            </p>
                            <p>
                                <b>Order Time : </b>
                                <i>{order.orderTime}</i>
                            </p>
                            <p>
                                <b>Customer Id : </b>
                                <i>{order.uid}</i>
                            </p>
                            <p>
                                <b>Customer Email : </b>
                                <i>{order.userEmail}</i>
                            </p>
                            <p>
                                <b>Order Amount : </b>
                                <i>₹ {order.Total}</i>
                            </p>
                            <p>
                                <b>Order Status : </b>
                                <i>{order.orderStatus}</i>
                            </p>
                            <p>
                                <b>Shipping Address : </b>
                                <i>
                                    {`
                                        ${order.shippingAddress.houseName}, 
                                        ${order.shippingAddress.city}, 
                                        ${order.shippingAddress.state}, 
                                        ${order.shippingAddress.zipCode}
                                    `}
                                </i>
                            </p>
                            <p>
                                <b>Phone : </b>
                                <i>{order.shippingAddress.phone}</i>
                            </p>
                            <select value={status} onChange={e => setStatus(e.target.value)}>
                                <option value="ordered">Ordered</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                {/* <option value="cancelled">Cancelled</option> */}
                            </select>
                            <button className='btn btn-success' style={{ marginLeft: "5px" }} onClick={() => editOrderStatus(order.id)}>
                                Edit Order status
                            </button>
                        </div>
                        <div className='col-8'>
                            <table className='table mt-5'>
                                <thead>
                                    <tr>
                                        <th scope="col">Product Id</th>
                                        <th scope='col'>Product Name</th>
                                        <th>Image</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        order.items.map(item => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.title}</td>
                                                    <td>
                                                        <img src={item.imgUrl} width="100px" height="100px" alt={item.title} />
                                                    </td>
                                                    <td>₹ {item.price}</td>
                                                    <td>{item.qty}</td>
                                                    <td>₹ {item.price * item.qty}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default OrderDetails;