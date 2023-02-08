import styles from './Footer.module.css';

const Footer = () => {
    return <div className={styles.footer}>
        <span>Copyright
            <i className="fa fa-copyright" aria-hidden="true"></i>2023.
        </span>
        All rights reserved.
    </div>
};

export default Footer;