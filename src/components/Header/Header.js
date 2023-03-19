import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, } from '../../firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER } from '../../redux/slices/authSlice';


const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn, isAdmin, userName } = useSelector(state => state.auth);
    const { cartCount } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const logoutUser = () => {
        console.log("logged out");
        signOut(auth).then(() => {
            dispatch(REMOVE_ACTIVE_USER());
            navigate("/login");
        });
    };

    return <div className={styles.header}>
        <div className={styles.logo}>
            <h3>E<span>Kart</span></h3>
        </div>
        <div className={styles["nav-links"]}>
            <Link to='/'>Home</Link>
            <Link to='/products'>Shop</Link>
            {
                isLoggedIn && !isAdmin && <Link to='/cart'>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <sup>{cartCount}</sup>
                </Link>
            }
            {isLoggedIn && !isAdmin && <Link to='/my-orders'>My Orders</Link>}
            {isAdmin && <Link to='/admin'>Dashboard</Link>}
            {isAdmin && <Link to='/orders'>Orders</Link>}
        </div>
        <div className={styles["nav-links"]}>
            {!isLoggedIn && <Link to='/login'>Login</Link>}
            <span>
                <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
            </span>
            {isLoggedIn && <>Welcome <span>{userName}</span>!</>}
            {isLoggedIn && <button onClick={logoutUser}>Logout</button>}
        </div>
    </div>
};

export default Header
