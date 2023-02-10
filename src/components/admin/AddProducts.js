import React from 'react'

const AddProduct = () => {
    return (
        <div className='row mx-5 my-5'>
            <h4 className='text-center mt-5'>Add Products</h4>
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
                            <option value="men">Mens wear</option>
                            <option value="women">Womens wear</option>
                            <option value="shoes">Shoes</option>
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
    )
}

export default AddProduct
