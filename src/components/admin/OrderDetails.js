import CamImg from '../../assets/cam.jpg';
import MensShirt from '../../assets/mens-shirt.jpeg';

const OrderDetails = () => {
    const order = {
        id: "TQIEHSNSDJDJ",
        products: [
            { id: "5", title: "Camera", descr: "Camera is an .........", price: "10000", category: "camera", brand: "canva", imgUrl: CamImg },
            { id: "6", title: "Shirt", descr: "Shirt is an .........", price: "30000", category: "men", brand: "ajinora", imgUrl: MensShirt },
        ],
        orderDate:"12-02-2023",
        userId: "abc",
        total: "10000",
        housename: "ABC Street",
        city: "Kottayam",
        state: "Kerala",
        zip: "686571",
        phone: "6534262729",
        status: "Delivered"
    };
    return (
        <div className="container-fluid">
            <h4 className='text-center pt-5'>Order Details</h4>
            <div className='row'>
                <div className='col-4 py-5' style={{ color: "grey" }}>
                    <p>
                        <b>{`Order Id : ${order.id}`}</b>
                    </p>
                    <p>
                        <b>{`Order Date : ${order.orderDate}`}</b>
                    </p>
                    <p>
                        <b>{`Customer : ${order.userId}`}</b>
                    </p>
                    <p>
                        <b>{`Order Amount : ₹${order.total}`}</b>
                    </p>
                    <p>
                        <b>{`Order status : ${order.status}`}</b>
                    </p>
                    <p>
                        <b>Shipping Address : </b>
                        <br />
                        {`${order.housename}, ${order.city}, ${order.state}, ${order.zip}`}
                    </p>
                    <select defaultValue="Ordered" onChange={(event) => console.log(event.target.value)}>
                        <option value="ordered">Ordered</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="cancelled">Shipped</option>
                        <option value="delivered">Delivered</option>
                    </select>
                    <br />
                    <button className='btn btn-success mt-3' style={{ marginRight: "5px" }}>Update Order status</button>
                </div>
                <div className='col-8'>
                    <table className='table mt-5 mb-5'>
                        <thead>
                            <tr>
                                <th scope="col">Product Id</th>
                                <th scope='col'>Product Name</th>
                                {/* <th scope="col">Products</th> */}
                                {/* <th scope="col">status</th>
                                    <th scope="col">Delivery status</th> */}
                                <th>Image</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                order.products.map(product => {
                                    return (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            {/* <td>{`${order.products.title}, `}</td> */}
                                            <td>{product.title}</td>
                                            <td>
                                                <img src={product.imgUrl} width="100px" height="100px" alt={product.title} />
                                            </td>
                                            <td>2</td>
                                            <td>₹{product.price}</td>
                                            <td>₹{product.price * 2}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Here */}
        </div>
    )
};

export default OrderDetails;