import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogApi } from '../../api/api';
import cmedia from './authcss.module.css';

const Login = (props) => {

    const userRef = React.createRef();
    const passwRef = React.createRef();

    let history = useNavigate();

    const usNameChange = (e) => {
        props.setUserName(userRef.current.value)
    }
    const usPaswChange = (e) => {
        props.setUserPassword(passwRef.current.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.loginThunk(props.username, props.password);
    }

    const onRegisterClick = () => {
        history('/register/');
    }

    if (props.currentUser) {
        history('/');
    }

    return (
        <div className={cmedia.auth}>
            <h1>Авторизация</h1>
            <form>
                <input required type="text" name="username" placeholder='имя пользователя' onChange={usNameChange} value={props.username} ref={userRef} />
                <input required type="password" name="password" placeholder='пароль' onChange={usPaswChange} value={props.password} ref={passwRef} />
                <button onClick={handleSubmit}>Вход</button>
                {props.err && <p>{props.err}</p>}
                <span>У Вас еще нет аккаунта?</span>
                <br></br>
                <a href="#" onClick={onRegisterClick}>Зарегистрироваться!</a>
            </form>
        </div>
    )
}

export default Login;
