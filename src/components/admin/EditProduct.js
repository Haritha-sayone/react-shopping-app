import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const EditProduct = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [productImg, setProductImg] = useState(null)
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const docRef = doc(db, "products", id);
        getDoc(docRef).then(doc => {
            // console.log(doc.data());
            setTitle(doc.data().title);
            setDesc(doc.data().desc);
            setPrice(doc.data().price);
            setCategory(doc.data().category);
            setBrand(doc.data().brand);
            setProductImg(doc.data().imgUrl)
        })
    }, [id]);

    const updateProductDetails = event => {
        event.preventDefault();
        const docRef = doc(db, "products", id);
        setIsLoading(true);
        updateDoc(docRef, {
            title,
            desc,
            price,
            category,
            brand
        }).then(() => {
            setIsLoading(false);
            toast.success("Edited successfully.");
            navigate("/products/list");
        }).catch(error => {
            setIsLoading(false);
            setError(error.code);
            toast.error("Failed to update product!");
        });
    };

    return (
        <>
            {isLoading && !error && <Loader />}
            {
                !isLoading && (
                    <div className='row mx-5 my-5'>
                        <h2 className="text-center mt-5">Edit Product</h2>
                        <div className='col-4'></div>
                        <div className='col-4'>
                            {
                                error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )
                            }
                            <form onSubmit={updateProductDetails} autoComplete="off">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Title"
                                        required
                                        value={title}
                                        onChange={event => setTitle(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows="3"
                                        value={desc}
                                        onChange={event => setDesc(event.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="₹0"
                                        required
                                        value={price}
                                        onChange={event => setPrice(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={category}
                                        onChange={event => setCategory(event.target.value)}
                                    >
                                        <option value="default">Choose Category</option>
                                        <option value="laptops">Laptops</option>
                                        <option value="mobiles">Mobiles</option>
                                        <option value="camera">Camera</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="other">Other</option>
                                    </select>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="brand" className="form-label">Brand</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder='Enter the brand here'
                                        required
                                        value={brand}
                                        onChange={event => setBrand(event.target.value)}
                                    />
                                    {/* <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={brand}
                                        onChange={event => setBrand(event.target.value)}
                                    >
                                        <option value="default">Choose Brand</option>
                                        <option value="apple">Apple</option>
                                        <option value="lenovo">Lenovo</option>
                                        <option value="myntra">Myntra</option>
                                        <option value="meesho">Meesho</option>
                                        <option value="other">Other</option>
                                    </select> */}
                                </div>
                                <div className="mb-3">
                                    <img src={productImg} alt=' ' width="300px" height="200px" />
                                    {/* <input
                                        type="file"
                                        className="form-control"
                                        onChange={event => setProductImg(event.target.files[0])}
                                    /> */}
                                </div>
                                <button type="submit" className="btn btn-success mb-5">Update</button>
                            </form>
                        </div>
                        <div className='col-4'></div>
                    </div>
                )
            }
        </>
    )
};

export default EditProduct;
