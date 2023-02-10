import { Link } from 'react-router-dom';
import AppleLapImg from '../../assets/apple-laptop.jpeg';
import DellLapImg from '../../assets/dell-laptop.jpeg';
import HpLapImg from '../../assets/hp-laptop.jpeg';
import LenovoLapImg from '../../assets/lenovo-laptop.jpeg';
import CamImg from '../../assets/cam.jpg';
import MensShirt from '../../assets/mens-shirt.jpeg';
import LadysShirt from '../../assets/ladys-shirt.jpeg';
import CottonShirt from '../../assets/cotton-shirt.jpg';

const ViewProducts = () => {
    const products = [
        { id: "1", title: "Apple MacBook", desc: "Apple MacBook is an .........", price: "100000", category: "laptop", brand: "apple", imgUrl: AppleLapImg },
        { id: "2", title: "Dell Laptop", desc: "Apple MacBook is an .........", price: "30000", category: "laptop", brand: "dell", imgUrl: DellLapImg },
        { id: "3", title: "Hp Laptop", desc: "Apple MacBook is an .........", price: "50000", category: "laptop", brand: "hp", imgUrl: HpLapImg },
        { id: "4", title: "Lenovo Laptop", desc: "Apple MacBook is an .........", price: "45000", category: "laptop", brand: "lenovo", imgUrl: LenovoLapImg },

        { id: "5", title: "Camera", desc: "Camera is an .........", price: "10000", category: "camera", brand: "canva", imgUrl: CamImg },
        { id: "6", title: "Shirt", desc: "Shirt is an .........", price: "30000", category: "men", brand: "ajinora", imgUrl: MensShirt },
        { id: "7", title: "Ladys' Top", desc: "Ladys' top is an .........", price: "50000", category: "women", brand: "adidas", imgUrl: LadysShirt },
        { id: "8", title: "Cotton Shirt", desc: "Cotton Shirt is an .........", price: "45000", category: "men", brand: "meesho", imgUrl: CottonShirt },

        { id: "9", title: "Apple MacBook", desc: "Apple MacBook is an .........", price: "100000", category: "laptop", brand: "apple", imgUrl: AppleLapImg },
        { id: "10", title: "Dell Laptop", desc: "Apple MacBook is an .........", price: "30000", category: "laptop", brand: "dell", imgUrl: DellLapImg },
        { id: "11", title: "Hp Laptop", desc: "Apple MacBook is an .........", price: "50000", category: "laptop", brand: "hp", imgUrl: HpLapImg },
        { id: "12", title: "Lenovo Laptop", desc: "Apple MacBook is an .........", price: "45000", category: "laptop", brand: "lenovo", imgUrl: LenovoLapImg },
    ];
    return (
        <div className="container" style={{ marginTop: "78px" }}>
            <h4 className='text-center pt-5'>Products List</h4>
            <table className='table mt-5 mb-5'>

                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        <Link to={`/product/${product.id}`}>
                                            <img src={product.imgUrl} width={"100px"} height={"100px"} alt={product.title} />
                                        </Link>
                                    </td>
                                    <td>{product.title}</td>
                                    <td>₹{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        {/* <button className='btn btn-success' style={{ marginRight: "5px" }}>Edit</button> */}
                                        <Link to={`/product/${product.id}`}>
                                            <i className="fa fa-pencil" aria-hidden="true" style={{ marginRight: "10px", color: "#212529" }}></i>
                                        </Link>
                                        {/* <button className='btn btn-danger'>Delete</button> */}
                                        <Link>
                                            <i className="fa fa-trash" aria-hidden="true" style={{ color: "#212529" }}></i>
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
}

export default ViewProducts;


