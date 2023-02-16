import CamImg from '../../assets/cam.jpg';
import MensShirt from '../../assets/mens-shirt.jpeg';

const MyOrders = () => {
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
    return <div className='container'>
        <h4 className='text-center pt-5'>My Orders</h4>
        <table className='table mt-5 mb-5'>
            <thead>
                <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => {
                    const {
                        id,
                        orderDate,
                        total,
                        status,
                    } = order;
                    return (
                        <tr key={id}>
                            <td>{index + 1}</td>
                            <td>
                                {orderDate}
                            </td>
                            <td>{id}</td>
                            <td>₹{total}</td>
                            <td>
                                <p>
                                    {status}
                                </p>
                            </td>
                            <td>
                                <button className='btn btn-danger'>Cancel Order</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
};

export default MyOrders;
