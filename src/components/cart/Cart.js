import CamImg from '../../assets/cam.jpg';
import MensShirt from '../../assets/mens-shirt.jpeg';
import LadysShirt from '../../assets/ladys-shirt.jpeg';
import CottonShirt from '../../assets/cotton-shirt.jpg';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = () => {
    const products = [
        { id: "5", title: "Camera", descr: "Camera is an .........", price: "10000", category: "camera", brand: "canva", imgUrl: CamImg },
        { id: "6", title: "Shirt", descr: "Shirt is an .........", price: "30000", category: "men", brand: "ajinora", imgUrl: MensShirt },
        { id: "7", title: "Ladys' Top", descr: "Ladys' top is an .........", price: "50000", category: "women", brand: "adidas", imgUrl: LadysShirt },
        { id: "8", title: "Cotton Shirt", descr: "Cotton Shirt is an .........", price: "45000", category: "men", brand: "meesho", imgUrl: CottonShirt },
    ];
    return (
        <div className='row my-5 py-5' style={{ backgroundColor: "tan" }}>
            <h2 className='text-center py-3'>Cart</h2>

            <div className='col-2 text-center'>
                <Link to="/products">
                    <button id={styles["shop-link"]}>Back to Shopping</button>
                </Link>
            </div>

            <div className='col-8'>
                {
                    products.map(product => {
                        return (
                            <div className='card-group row' key={product.id}>
                                <div className='col-2'></div>
                                <div className='col-8'>
                                    <div className="card mb-3" style={{ maxWidth: "540px" }}>
                                        <div className="row g-0">

                                            <div className="col-md-4">
                                                <img
                                                    src={product.imgUrl}
                                                    className="img-fluid rounded-start"
                                                    alt={product.title}
                                                    style={{ minHeight: "100%" }}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.title}</h5>
                                                    <p className="card-text text-muted">Price : {product.price} ₹</p>
                                                    <p className="card-text"><small className="text-muted">
                                                        Quantity : <span className={styles["product-quantity"]}>
                                                            <button>-</button>
                                                            <b>1</b>
                                                            <button>+</button>
                                                        </span>

                                                    </small>
                                                    </p>
                                                    <p className="card-text">
                                                        <small className="text-muted">
                                                            Total : ₹{product.price * 2}
                                                        </small>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="card-body">
                                                    <button className="btn btn-danger my-5">
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
            </div>

            <div className='col-2'>
                <div className='card' style={{ maxWidth: "150px" }}>
                    <div className="card-body">
                        <h5 className="card-title">Checkout</h5>
                        <p className="card-text text-muted">Total : ₹1000</p>
                        <button className='btn btn-success'>Order Now</button>
                        <div className='mt-2' style={{ borderTop: "2px solid black" }}>
                            <button className='btn btn-danger mt-2'>Clear Cart</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Cart;