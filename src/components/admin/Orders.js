import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_CANCELLED_ORDER } from "../../redux/slices/orderSlice";
import { toast } from "react-toastify";

const Orders = () => {

    const { orders } = useSelector(state => state.order);
    const dispatch = useDispatch();

    const removeCancelledOrder = (id, userID) => {
        dispatch(REMOVE_CANCELLED_ORDER(id));
        deleteDoc(doc(db, `users/${userID}/orders`, id));
        toast.info(`Deleted order ${id}`);
    };

    return (
        <div className="container-fluid" style={{ marginTop: "78px" }}>
            <h4 className='text-center pt-5'>All Orders</h4>
            <table className='table mt-5 mb-5'>
                <thead>
                    <tr>
                        <th scope="col">s/n</th>
                        <th scope="col">Id</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Order Time</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Order Amount</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map((order, index) => {
                            const {
                                id,
                                userID,
                                orderDate,
                                orderTime,
                                orderStatus,
                                orderTotalAmount
                            } = order;

                            const color = orderStatus === "delivered" ? "green" : orderStatus === "cancelled" ? "red" : "orange";

                            return (
                                <tr key={id}>
                                    <td>{index + 1}</td>
                                    <td>{id}</td>
                                    <td>{userID}</td>
                                    <td>{orderDate}</td>
                                    <td>{orderTime}</td>
                                    <td style={{ color: color, fontWeight: "500" }}>{orderStatus}</td>
                                    <td>₹ {orderTotalAmount}</td>
                                    <td>
                                        <Link to={`/users/${userID}/order/${id}/details`}>
                                            <i
                                                className="fa fa-eye"
                                                aria-hidden="true"
                                                style={{ marginRight: "10px", color: "#212529" }}
                                            ></i>
                                        </Link>

                                        {
                                            orderStatus === "cancelled" && <button style={{ border: "none", background: "none" }} onClick={() => removeCancelledOrder(id, userID)}>
                                                <i className="fa fa-trash" aria-hidden="true" style={{ color: "#212529" }}></i>
                                            </button>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                !orders.length && <p className="text-center py-5" style={{ marginLeft: "6px" }}>No orders found.</p>
            }
        </div>
    )
};

export default Orders;
