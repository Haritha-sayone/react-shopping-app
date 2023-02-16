const Checkout = () => {
    return (
        <div className="container-fluid">
            <div className="row my-5">
                <h4 className="text-center pt-5">Checkout Details</h4>

                <div className='col-2'></div>
                <div className='col-4'>
                    <h5 className="py-3">Shipping Address</h5>
                    <form autoComplete="off">
                        <div className="mb-3">
                            <label htmlFor="house-name" className="form-label">House name</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City/Street</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="state" className="form-label">State</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="zip" className="form-label">Pin code</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Contact Number</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success mb-5">Order</button>
                    </form>
                </div>

                <div className='col-4' style={{ marginLeft: "50px" }}>
                    <h5 className="py-3">Checkout Summary</h5>
                    <p className="card-text text-muted">Items Count : 4</p>
                    <p className="card-text text-muted">Total : ₹10000</p>
                    <p className="card-text text-muted">Products :
                        <ul>
                            <li>Apple Laptop</li>
                            <li>Camera</li>
                        </ul>
                    </p>
                    <div>

                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
};

export default Checkout;
