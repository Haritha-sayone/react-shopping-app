import React from 'react'

const AddProducts = () => {
    return (
        <div className='container-fluid'>
            <div className='row my-5'>
                <h4 className='text-center mt-5 py-3'>Add Products</h4>
                <div className='col-4'></div>
                <div className='col-4'>
                    <div className="alert alert-danger" role="alert">
                        This product already exists.
                    </div>
                    <form autoComplete="off">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder='0₹'
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            {/* <input
                            type="text"
                            className="form-control"
                            placeholder='Category'
                            required
                            value=""
                        /> */}
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
                            <label htmlFor="brand" className="form-label">Brand</label>
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
                        <button type="submit" className="btn btn-success mb-5">ADD</button>
                    </form>
                </div>
                <div className='col-4'></div>
            </div>
        </div>
    )
};

export default AddProducts;
