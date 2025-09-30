import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo" onClick={closeMobileMenu}>
                    Tatu Studio
                </Link>
                <button
                    className="mobile-menu-btn"
                    onClick={toggleMobileMenu}
                    aria-label="Открыть меню"
                >
                    <img src="/images/menu.png" alt="" srcset="" className='menu'/>
                </button>

                <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <Link
                        to="/"
                        className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
                        onClick={closeMobileMenu}
                    >
                        Главная
                    </Link>
                    <Link
                        to="/services"
                        className={location.pathname === '/services' ? 'nav-link active' : 'nav-link'}
                        onClick={closeMobileMenu}
                    >
                        Услуги
                    </Link>
                    <Link
                        to="/appointment"
                        className={location.pathname === '/appointment' ? 'nav-link active' : 'nav-link'}
                        onClick={closeMobileMenu}
                    >
                        Записаться
                    </Link>
                    <Link
                        to="/masters"
                        className={location.pathname === '/masters' ? 'nav-link active' : 'nav-link'}
                        onClick={closeMobileMenu}
                    >
                        Мастера
                    </Link>
                    <Link
                        to="/gallery"
                        className={location.pathname === '/gallery' ? 'nav-link active' : 'nav-link'}
                        onClick={closeMobileMenu}
                    >
                        Галерея
                    </Link>
                    <Link
                        to="/contacts"
                        className={location.pathname === '/contacts' ? 'nav-link active' : 'nav-link'}
                        onClick={closeMobileMenu}
                    >
                        Контакты
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;