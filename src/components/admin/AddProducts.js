import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
    addDoc,
    updateDoc,
    productsColl
} from '../../firebase/config';
import Loader from '../Loader/Loader';

const AddProducts = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { userID } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const addNewProduct = (e) => {
        e.preventDefault();
        console.log(title, desc, price, category, brand, productImg);
        const storageRef = ref(storage, `Images/${productImg.name}`);
        const today = new Date();
        const date = today.toDateString();
        setIsLoading(true);
        uploadBytes(storageRef, productImg).then(snapshot => {
            console.log("Uploaded", snapshot);
            getDownloadURL(snapshot.ref).then(url => {
                addDoc(productsColl, {
                    title,
                    desc,
                    price: Number(price),
                    category,
                    brand: brand.toLowerCase(),
                    imgUrl: url,
                    createdBy: userID,
                    createdOn: date
                }).then(docRef => {
                    updateDoc(docRef, {
                        id: docRef.id
                    });
                    setIsLoading(false);
                    toast.success(`${title} created successfully.`);
                    navigate("/products/list");
                });
            });
        }).catch(error => {
            setIsLoading(false);
            setError(error.code);
            toast.error("Something went wrong.");
        });
    };

    return (
        <div className='container-fluid'>
            {isLoading && !error && <Loader />}
            {
                !isLoading && (
                    <div className='row my-5'>
                        <h4 className='text-center mt-5 py-3'>Add Products</h4>
                        <div className='col-4'></div>
                        <div className='col-4'>
                            {
                                error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )
                            }
                            <form onSubmit={addNewProduct} autoComplete="off">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        onChange={event => setTitle(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows="3"
                                        onChange={event => setDesc(event.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder='0₹'
                                        required
                                        onChange={event => setPrice(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        onChange={event => setCategory(event.target.value)}
                                    >
                                        <option value="">Choose Category</option>
                                        <option value="laptops">Laptops</option>
                                        <option value="mobiles">Mobiles</option>
                                        <option value="cameras">Camera</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="brand" className="form-label">Brand</label>
                                    {/* <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        onChange={event => setBrand(event.target.value)}
                                    >
                                        <option value="">Choose Brand</option>
                                        <option value="apple">Apple</option>
                                        <option value="lenovo">Lenovo</option>
                                        <option value="canon">Canon</option>
                                        <option value="myntra">Myntra</option>
                                        <option value="meesho">Meesho</option>
                                        <option value="other">Other</option>
                                    </select> */}
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder='Enter the brand here'
                                        required
                                        value={brand}
                                        onChange={event => setBrand(event.target.value.toLowerCase())}
                                    />
                                </div>
                                <div className="mb-3">
                                    <img src={productImg ? URL.createObjectURL(productImg) : ''} alt=' ' width="300px" height="200px" />
                                    <input
                                        type="file"
                                        className="form-control"
                                        required
                                        onChange={event => setProductImg(event.target.files[0])}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success mb-5">ADD</button>
                            </form>
                        </div>
                        <div className='col-4'></div>
                    </div>
                )
            }
        </div>
    )
};

export default AddProducts;
