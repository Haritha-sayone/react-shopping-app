import styles from './Products.module.css';
import AppleLapImg from '../../assets/apple-laptop.jpeg';
import DellLapImg from '../../assets/dell-laptop.jpeg';
import HpLapImg from '../../assets/hp-laptop.jpeg';
import LenovoLapImg from '../../assets/lenovo-laptop.jpeg';
import CamImg from '../../assets/cam.jpg';
import MensShirt from '../../assets/mens-shirt.jpeg';
import LadysShirt from '../../assets/ladys-shirt.jpeg';
import CottonShirt from '../../assets/cotton-shirt.jpg';
import { Link } from 'react-router-dom';

const Products = () => {
    const products = [
        { id: "1", title: "Apple MacBook", desc: "Apple MacBook is an .........", price: "100000", category: "laptop", brand: "apple", imgUrl: AppleLapImg },
        { id: "2", title: "Dell Laptop", desc: "Dell Laptop is an .........", price: "30000", category: "laptop", brand: "dell", imgUrl: DellLapImg },
        { id: "3", title: "Hp Laptop", desc: "Hp Laptop is an .........", price: "50000", category: "laptop", brand: "hp", imgUrl: HpLapImg },
        { id: "4", title: "Lenovo Laptop", desc: "Lenovo Laptop is an .........", price: "45000", category: "laptop", brand: "lenovo", imgUrl: LenovoLapImg },

        { id: "5", title: "Camera", desc: "Camera is an .........", price: "10000", category: "camera", brand: "canva", imgUrl: CamImg },
        { id: "6", title: "Shirt", desc: "Shirt is an .........", price: "30000", category: "fashion", brand: "ajinora", imgUrl: MensShirt },
        { id: "7", title: "Ladys' Top", desc: "Ladys' top is an .........", price: "50000", category: "fashion", brand: "adidas", imgUrl: LadysShirt },
        { id: "8", title: "Cotton Shirt", desc: "Cotton Shirt is an .........", price: "45000", category: "fashion", brand: "meesho", imgUrl: CottonShirt },

        { id: "9", title: "Apple MacBook", desc: "Apple MacBook is an .........", price: "100000", category: "laptop", brand: "apple", imgUrl: AppleLapImg },
        { id: "10", title: "Dell Laptop", desc: "Apple MacBook is an .........", price: "30000", category: "laptop", brand: "dell", imgUrl: DellLapImg },
        { id: "11", title: "Hp Laptop", desc: "Apple MacBook is an .........", price: "50000", category: "laptop", brand: "hp", imgUrl: HpLapImg },
        { id: "12", title: "Lenovo Laptop", desc: "Apple MacBook is an .........", price: "45000", category: "laptop", brand: "lenovo", imgUrl: LenovoLapImg },
    ]
    return <div className={`card-group row mt-5 mb-5 ${styles.products} `}>

        <div className={`col-2 ${styles["filters"]}`}>
            <div className={styles.category}>
                <h6>Filter By Category</h6>
                <button>All</button>
                <button>Laptops</button>
                <button>Mobiles</button>
                <button>Camera</button>
                <button>Fashion</button>
            </div>
            <div className={styles.brand}>
                <h6>Filter By Brand</h6>
                <button>All</button>
                <button>Apple</button>
                <button>Lenovo</button>
                <button>Myntra</button>
                <button>Meesho</button>
            </div>
            {/* <button className="btn btn-outline-primary">All</button>
            <button className="btn btn-outline-info">Laptops</button>
            <button className="btn btn-outline-success">Mobiles</button>
            <button className="btn btn-outline-danger">Clothes</button>
            <button className="btn btn-outline-warning">Chicken</button>
            <button className="btn btn-outline-secondary">Fish</button>
            <button className="btn btn-outline-dark">Fruits</button> */}
        </div>

        <div className='col-9'>
            <div className="row mt-5">
                {
                    products.map(product => {
                        return <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center' key={product.id}>
                            <div className="card" style={{ margin: "20px" }}>
                                <Link to={`/product/${product.id}/details`}>
                                    <img
                                        src={product.imgUrl}
                                        className="card-img-top"
                                        alt={product.title}
                                        width={"10px"}
                                        height={"200px"}
                                    />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    {/* <p class="card-text">{product.desc}</p> */}
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">₹{product.price}</li>
                                </ul>
                                <div className="card-body">
                                    <button className="btn block btn-success">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
};

export default Products;