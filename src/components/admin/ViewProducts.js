import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, productsColl, db } from '../../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const deleteProduct = (id, name) => {
        Swal.fire({
            title: `Are you sure you want to delete ${name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#198754',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDoc(doc(db, "products", id)).then(() => {
                    Swal.fire(
                        'Deleted!',
                        `${name} has been deleted.`,
                        'success'
                    );
                });
            }
        });
    };

    useEffect(() => {
        getDocs(productsColl).then(snapshot => {
            const allProducts = snapshot.docs.map(doc => (
                {
                    ...doc.data(),

                }
            ));
            setProducts(allProducts);
            setIsLoading(false);
        });
    }, [products]);

    return (
        <div className="container" style={{ marginTop: "78px" }}>
            <h4 className='text-center pt-5'>Products List</h4>
            <table className='table mt-5 mb-5'>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope='col'>Brand</th>
                        <th scope="col">Price</th>
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
                                        <Link to={`/product/${product.id}/details`}>
                                            <img src={product.imgUrl} width={"100px"} height={"100px"} alt={product.title} />
                                        </Link>
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>₹ {product.price}</td>
                                    <td>
                                        <Link to={`/product/${product.id}/edit`}>
                                            <i className="fa fa-pencil" aria-hidden="true" style={{ marginRight: "10px", color: "#212529" }}></i>
                                        </Link>
                                        <button style={{ border: "none", background: "none" }} onClick={() => deleteProduct(product.id, product.title)}>
                                            <i className="fa fa-trash" aria-hidden="true" style={{ color: "#212529" }}></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>

            </table>
            {
                !isLoading && products.length === 0 && <p className="text-center">No products found.</p>
            }
            {
                isLoading && <p className="text-center">Loading...</p>
            }
        </div>
    )
}

export default ViewProducts;


