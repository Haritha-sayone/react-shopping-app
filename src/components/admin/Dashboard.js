import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='container' style={{ marginTop: "78px" }}>
            <h4 className='pt-5'>Admin Dashboard</h4>
            <div className='row text-center mt-5'>
                <div className="card text-dark bg-success mx-2 col-6" style={{ maxWidth: "40%" }}>
                    <Link to='/products/add' style={{ textDecoration: "none" }}>
                        <div className="card-body text-white">
                            ADD PRODUCTS
                        </div>
                    </Link>
                </div>

                <div className="card text-dark bg-warning mx-2 col-6" style={{ maxWidth: "40%" }}>
                    <Link to='/products/list' style={{ textDecoration: "none" }}>
                        <div className="card-body text-white">
                            VIEW PRODUCTS
                        </div>
                    </Link>
                </div>
            </div>

            <div className='row text-center mt-5'>
                <div className="card text-dark bg-primary mx-2 col-6" style={{ maxWidth: "40%" }}>
                    <Link to='/orders' style={{ textDecoration: "none" }}>
                        <div className="card-body text-white">
                            MANAGE ORDERS
                        </div>
                    </Link>
                </div>

                {/* <div className="card text-dark bg-danger mx-2 col-6" style={{ maxWidth: "40%" }}>
                    <Link to='/products/list' style={{ textDecoration: "none" }}>
                        <div className="card-body text-white">
                            VIEW PRODUCTS
                        </div>
                    </Link>
                </div> */}
            </div>
        </div>


    )
}

export default Dashboard;