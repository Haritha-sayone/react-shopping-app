import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, productsColl, db } from '../../firebase/config';
import { query, limit, orderBy, startAfter } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastIndex, setLastIndex] = useState();
    const [triggerEffect, setTriggerEffect] = useState(false);
    const productsPerPage = 3;

    useEffect(() => {
        setIsLoading(true);
        const firstBatch = query(productsColl, orderBy("createdOn"), limit(productsPerPage));
        getDocs(firstBatch).then(snapshot => {
            const lastVisible = snapshot.docs[snapshot.docs.length - 1];
            const firstBatchProducts = snapshot.docs.map(doc => (
                { ...doc.data() }
            ));
            setProducts(firstBatchProducts);
            setLastIndex(lastVisible);
            setIsLoading(false);
        });

    }, [triggerEffect]);

    const fetchNextBatch = () => {
        setIsLoading(true);
        const nextBatch = query(
            productsColl,
            orderBy("createdOn"),
            startAfter(lastIndex),
            limit(productsPerPage)
        );
        getDocs(nextBatch).then(snapshot => {
            if (snapshot.docs.length !== 0) {
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                const nextProducts = snapshot.docs.map(doc => (
                    { ...doc.data() }
                ));
                setProducts([...products, ...nextProducts]);
                setLastIndex(lastVisible);
                setIsLoading(false);
            }
            else {
                setIsLoading(false);
                setIsEmpty(true);
            }

        });
    };

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
                    setTriggerEffect(true);
                    Swal.fire(
                        'Deleted!',
                        `${name} has been deleted.`,
                        'success'
                    );
                });
            }
        });
    };

    return (
        <div className="container" style={{ marginTop: "78px" }}>
            <h4 className='text-center pt-3'>Products List</h4>
            <table className='table mt-2 mb-3'>
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
                isLoading && <p className="text-center mt-5">Loading...</p>
            }

            <div className='row mb-5 pb-5'>
                <div className='col-5'></div>
                <div className='col-6'>
                    {
                        !isLoading && !isEmpty && <button className='btn btn-outline-success' onClick={fetchNextBatch}>View More</button>
                    }

                    {
                        !isLoading && isEmpty && <p>No more products found.</p>
                    }
                </div>
            </div>

        </div>
    )
}

export default ViewProducts;


