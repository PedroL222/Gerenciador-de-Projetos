import styles from './Footer.module.css';
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa';

function Footer(props){
    return(
       <footer className={styles.footer}>
        <ul className={styles.redes}>
            <li><FaFacebook /> </li>
            <li><FaInstagram /> </li>
            <li><FaLinkedin /> </li>
        </ul>
        <p className={styles.copy_right}><span>Cost</span> &copy; 2023 Pedro Lucas Freitas Sousa</p>
       </footer>
    )
}

export default Footer