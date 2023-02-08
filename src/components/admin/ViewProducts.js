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
        { id: "1", title: "Apple MacBook", price: "100000", category: "laptop", brand: "apple", imgUrl: AppleLapImg },
        { id: "2", title: "Dell Laptop", price: "30000", category: "laptop", brand: "dell", imgUrl: DellLapImg },
        { id: "3", title: "Hp Laptop", price: "50000", category: "laptop", brand: "hp", imgUrl: HpLapImg },
        { id: "4", title: "Lenovo Laptop", price: "45000", category: "laptop", brand: "lenovo", imgUrl: LenovoLapImg },

        { id: "5", title: "Camera", price: "10000", category: "camera", brand: "canva", imgUrl: CamImg },
        { id: "6", title: "Shirt", price: "30000", category: "men", brand: "ajinora", imgUrl: MensShirt },
        { id: "7", title: "Ladys' Top", price: "50000", category: "women", brand: "adidas", imgUrl: LadysShirt },
        { id: "8", title: "Cotton Shirt", price: "45000", category: "men", brand: "meesho", imgUrl: CottonShirt },

        { id: "9", title: "Apple MacBook", price: "100000", category: "laptop", brand: "apple", imgUrl: AppleLapImg },
        { id: "10", title: "Dell Laptop", price: "30000", category: "laptop", brand: "dell", imgUrl: DellLapImg },
        { id: "11", title: "Hp Laptop", price: "50000", category: "laptop", brand: "hp", imgUrl: HpLapImg },
        { id: "12", title: "Lenovo Laptop", price: "45000", category: "laptop", brand: "lenovo", imgUrl: LenovoLapImg },
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
                                        <img src={product.imgUrl} width={"100px"} height={"100px"} alt={product.title} />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>₹{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        {/* <button className='btn btn-success' style={{ marginRight: "5px" }}>Edit</button> */}
                                        <i className="fa fa-pencil" aria-hidden="true" style={{ marginRight: "10px" }}></i>
                                        {/* <button className='btn btn-danger'>Delete</button> */}
                                        <i className="fa fa-trash" aria-hidden="true"></i>
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

