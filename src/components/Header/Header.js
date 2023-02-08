import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return <div className={styles.header}>
        <div className={styles.logo}>
            <h3>E<span>Kart</span></h3>
        </div>
        <div className={styles["nav-links"]}>
            <Link to='/'>Home</Link>
            <Link to='/products'>Shop</Link>
            <Link to='/my-orders'>My Orders</Link>
            <Link to='/cart'>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <sup>2</sup>
            </Link>
            <Link to='/admin'>Dashboard</Link>
            <Link to='/orders'>Orders</Link>
        </div>
        <div className={styles["nav-links"]}>
            <Link to='/login'>Login</Link>
            <span>
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
            </span>
            Welcome <span>user</span>!
            <button>Logout</button>
        </div>
    </div>
};

export default Header
