import styles from './Home.module.css';
import SliderImage from '../../assets/slider-img.jpg';
import Products from '../Shop/Products';

const Home = () => {
    return <div className={styles.home}>
        <img
            src={SliderImage}
            width="100%"
            height="500px"
            alt="A girl with shopping bags"
        />
        <h4>Our Featured Products</h4>
        <Products />
    </div>
};

export default Home;