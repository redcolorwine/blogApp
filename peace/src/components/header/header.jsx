import { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import cmedia from './header.module.css';

const Header = (props) => {
    let history = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            props.setAuthUserData(JSON.parse(localStorage.getItem("user")));
        }

    }, [])
    const onLoginClick = () => {
        history('/login/');
    }
    const onLogoutClick = (e) => {
        e.preventDefault();
        props.logout();
        history('/news');
    }
    const onNameClick = () => {
        history('/profile/');
    }

    return (
        <div className={cmedia.header}>

            <h4>devamira</h4>
            <nav>
                <li><NavLink end to="news" className={({ isActive }) => (isActive ? cmedia.active : cmedia.inactive)}>Главная</NavLink></li>
                <li><NavLink end to="news/cinema" className={({ isActive }) => (isActive ? cmedia.active : cmedia.inactive)}>Кино</NavLink></li>
                <li><NavLink end to="news/art" className={({ isActive }) => (isActive ? cmedia.active : cmedia.inactive)}>Искусство</NavLink></li>
                <li><NavLink end to="news/music" className={({ isActive }) => (isActive ? cmedia.active : cmedia.inactive)}>Музыка</NavLink></li>
                <li><NavLink end to="news/nature" className={({ isActive }) => (isActive ? cmedia.active : cmedia.inactive)}>Природа</NavLink></li>
            </nav>
            <div className={cmedia.login}>
                <ul>
                    <li><a href="#">EN</a></li>
                    <li><a href="#">Поиск</a></li>

                    {(props.currentUser !== null) ?
                        (<li className={cmedia.auth}><span onClick={onNameClick}>{props.currentUser.username}</span><a href="#" onClick={onLogoutClick}>Выйти</a></li>)
                        : (<li><a href="#" onClick={onLoginClick}>Войти</a></li>)}
                </ul>
            </div>

        </div>
    )
}

export default Header;