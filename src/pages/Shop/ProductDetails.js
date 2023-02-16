import styles from './ProductDetails.module.css';
import AppleLapImg from '../../assets/apple-laptop.jpeg';

const ProductDetails = () => {
    const product = { id: "1", title: "Apple Laptop", desc: "Apple Laptop dolor sit amet. Sed officia consequatur ab voluptatem animi sed molestiae adipisci qui galisum dolor et repellendus galisum! Rem ipsa ullam aut excepturi numquam ab sit blanditiis magni sed vero ullam aut blanditiis corporis et libero aperiam. Qui consequuntur earum est voluptas maiores a quidem dolor sit repellendus odio.", price: "10000", category: "laptop", brand: "Apple", imageUrl: AppleLapImg }
    return (
        <div className={`container-fluid my-5 ${styles.product}`}>
            <div className='row'>
                <h2 className='text-center py-5'>Product Details</h2>

                <div className='col-4'>
                    <img src={product.imageUrl} id={styles["product-detail-image"]} alt={product.title} />
                </div>
                <div className='col-8'>
                    <h3>{product.title}</h3>
                    <p className={styles.price}>{`₹${product.price}`}</p>
                    <p>{product.desc}</p>
                    <p>
                        <b>SKU : </b>{product.id}
                    </p>
                    <p>
                        <b>Brand : </b>{product.brand}
                    </p>
                    <div className={styles.count}>
                        <button className={styles.minus}>-</button>
                        <b>1</b>
                        <button className={styles.plus}>+</button>
                    </div>
                    <button className="btn btn-success mb-5">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ProductDetails;
