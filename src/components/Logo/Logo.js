import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo/logo.svg';

export default function Logo() {
    return (
        <Link className="" to="/">
            <img src={logo} alt="Логотип" />
        </Link>
    );
}