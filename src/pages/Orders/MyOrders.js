import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { CANCEL_ORDER } from '../../redux/slices/orderSlice';
import { toast } from 'react-toastify';

const MyOrders = () => {
    const { userID } = useSelector(state => state.auth);
    const { orders } = useSelector(state => state.order);
    const dispatch = useDispatch();
    const filteredOrders = orders.filter(order => order.userID === userID);

    const cancelOrder = id => {
        dispatch(CANCEL_ORDER(id));
        updateDoc(doc(db, `users/${userID}/orders`, id), {
            orderStatus: "cancelled"
        });
        toast.success(`Cancelled order ${id}`);
    };

    return <div className='container-fluid'>
        <h4 className='text-center pt-5'>My Orders</h4>
        <table className='table table-responsive mt-5 mb-5'>
            <thead>
                <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Order ID</th>
                    <th>Products</th>
                    <th>Product Images</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    filteredOrders.map((order, index) => {
                        const {
                            id,
                            orderDate,
                            orderTime,
                            orderTotalAmount,
                            orderStatus,
                            items
                        } = order;

                        const orderStatusColor = orderStatus === "delivered" ? "green" : orderStatus === "cancelled" ? "red" : "orange";

                        return (
                            <tr key={id}>
                                <td>{index + 1}</td>
                                <td>
                                    {orderDate}
                                </td>
                                <td>
                                    {orderTime}
                                </td>
                                <td>{id}</td>
                                <td>
                                    <ol>
                                        {
                                            items.map(item => <li key={item.id}>{item.title}</li>)
                                        }
                                    </ol>
                                </td>
                                <td>
                                    {
                                        items.map(item => <img key={item.id} src={item.imgUrl} width="100px" height="100px" alt={item.title} />)
                                    }
                                </td>
                                <td>₹ {orderTotalAmount}</td>
                                <td>
                                    <p style={{ color: orderStatusColor, fontWeight: "500" }}>
                                        {orderStatus}
                                    </p>
                                </td>
                                <td>
                                    <button className='btn btn-danger' disabled={orderStatus === "delivered" || orderStatus === "cancelled" ? true : false} onClick={() => cancelOrder(id)}>Cancel Order</button>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
        {
            !filteredOrders.length && <p className="text-center py-5" style={{ marginLeft: "6px" }}>No orders found.</p>
        }
    </div>
};

export default MyOrders;
