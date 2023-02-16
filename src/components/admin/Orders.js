import { Link } from "react-router-dom";
import CamImg from '../../assets/cam.jpg';
import MensShirt from '../../assets/mens-shirt.jpeg';

const Orders = () => {
    const orders = [
        {
            id: "TQIEHSNSDJDJ",
            products: [
                { id: "5", title: "Camera", descr: "Camera is an .........", price: "10000", category: "camera", brand: "canva", imgUrl: CamImg },
                { id: "6", title: "Shirt", descr: "Shirt is an .........", price: "30000", category: "men", brand: "ajinora", imgUrl: MensShirt },
            ],
            orderDate: "12-02-2023",
            userId: "abc",
            total: "10000",
            housename: "ABC Street",
            city: "Kottayam",
            state: "Kerala",
            zip: "686571",
            phone: "6534262729",
            status: "Delivered"
        },
    ];
    return (
        <div className="container" style={{ marginTop: "78px" }}>
            <h4 className='text-center pt-5'>All Orders</h4>
            <table className='table mt-5 mb-5'>
                <thead>
                    <tr>
                        <th scope="col">s/n</th>
                        <th scope="col">Id</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Order Date</th>
                        {/* <th scope="col">Products</th> */}
                        <th scope="col">Order Status</th>
                        {/* <th scope="col">Delivery Status</th> */}
                        <th scope="col">Order Amount</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map((order, index) => {
                            return (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>{order.id}</td>
                                    <td>{order.userId}</td>
                                    <td>{order.orderDate}</td>
                                    {/* <td>{`${order.products.title}, `}</td> */}
                                    <td>{order.status}</td>
                                    {/* <td>Delivered</td> */}
                                    <td>₹{order.total}</td>
                                    <td>
                                        {/* <button className='btn btn-success' style={{ marginRight: "5px" }}>Edit</button> */}
                                        <Link to={`/order/${order.id}/details`}>
                                            <i className="fa fa-eye" aria-hidden="true" style={{ marginRight: "10px", color: "#212529" }}></i>
                                        </Link>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

export default Orders;
