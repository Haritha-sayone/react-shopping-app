const EditProduct = () => {
    return (
        <div className='row mx-5 my-5'>
            <h2 className="text-center mt-5">Edit Product</h2>
            <div className='col-4'></div>
            <div className='col-4'>
                <div className="alert alert-danger" role="alert">
                    Failed to edit product.
                </div>
                <form autoComplete="off">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="₹0"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select" aria-label="Default select example">
                            <option value="default">Choose Category</option>
                            <option value="laptops">Laptops</option>
                            <option value="mobiles">Mobiles</option>
                            <option value="camera">Camera</option>
                            <option value="fashion">Fashion</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="brand" className="form-label">brand</label>
                        <select className="form-select" aria-label="Default select example">
                            <option value="default">Choose Brand</option>
                            <option value="apple">Apple</option>
                            <option value="lenovo">Lenovo</option>
                            <option value="myntra">Myntra</option>
                            <option value="meesho">Meesho</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <img src='' alt=' ' width={"200px"} height={"200px"} />
                        <input
                            type="file"
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success mb-5">Update</button>
                </form>
            </div>
            <div className='col-4'></div>
        </div>
    )
};

export default EditProduct;
