import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogApi } from '../../api/api';
import cmedia from './authcss.module.css';

const Register = (props) => {

    const userRef = React.createRef();
    const passwRef = React.createRef();
    const emailRef = React.createRef();

    const [err, setError] = useState(null);

    let history = useNavigate();

    const usNameChange = (e) => {
        props.setUserName(userRef.current.value)
    }
    const usPaswChange = (e) => {
        props.setUserPassword(passwRef.current.value)
    }
    const usEmChange = (e) => {
        props.setUserEmail(emailRef.current.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await blogApi.register(props.username, props.password, props.email);
            history('/login/');
        } catch (err) {
            setError(err.response.data);
        }
    }

    const onLoginClick = () => {
        history('/login/');
    }

    return (
        <div className={cmedia.auth}>
            <h1>Регистрация</h1>
            <form>
                <input required type="text" name="username" placeholder='имя пользователя' onChange={usNameChange} value={props.username} ref={userRef} />
                <input required type="email" name="email" placeholder='электронная почта' onChange={usEmChange} value={props.email} ref={emailRef} />
                <input required type="password" name="password" placeholder='пароль' onChange={usPaswChange} value={props.password} ref={passwRef} />
                <button onClick={handleSubmit}>Зарегистрироваться</button>
                {err && <p>{err}</p>}
                <span>Уже есть аккаунт?</span>
                <br></br>
                <a href="#" onClick={onLoginClick}>Войти сейчас!</a>
            </form>
        </div>
    )
}

export default Register;