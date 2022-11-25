import React from 'react'
import cmedia from './personalPage.module.css';
import userimg from './../../media/user.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { blogApi } from '../../api/api';
import moment from 'moment';
import { useEffect } from 'react';
import Preloader from '../../components/preloader/preloader';

const Profile = (props) => {

    let history = useNavigate();

    useEffect(() => {
        if (props.currentUser) {
            props.setMyPosts(props.currentUser.id);
        }
    }, [props.currentUser])

    const onNewsClick = () => {
        history('/news/read/' + props.id);
    }

    if (!props.currentUser) {
        return (
            <div className={cmedia.unAuth}>
                <h1>Ошибка!</h1>
                <h2>Вы не можете войти в личный кабинет,
                    пока Вы не авторизованы! Пожалуйста, пройдите авторизацию.</h2>
                <button>Перейти к авторизации</button>
            </div>
        )
    } else if (props.profileLoading) {
        return (
            <div className={cmedia.personalPage}>
                <Preloader />
            </div>
        )
    }
    else {
        let viewCount = 0;
        const myArticles = props.myPosts.map(post => {
            viewCount += post.views;
            return (<li><a href={`/news/read/${post.id}`}>{post.title}</a></li>)
        })
        const sortedArticles = (props.myPosts.sort((a, b) => a.views < b.views ? 1 : -1)).map(post => {
            if (post.views > 16)
                return (<li><a href={`/news/read/${post.id}`}>{post.title} <span>{post.views} просмотров</span></a></li>)
        });

        return (
            <div className={cmedia.personalPage}>
                <h1>Личный кабинет</h1>
                <div className={cmedia.wrapper}>
                    <div className={cmedia.personalData}>
                        <div className={cmedia.imgBlock}>
                            <h2>{props.currentUser.username}</h2>
                            <img src={userimg} alt="" />
                        </div>

                        <div className={cmedia.aboutUser}>
                            <label>Имя</label>
                            <input type="text" readOnly value="Sergey" />
                            <label>Фамилия</label>
                            <input type="text" readOnly value="Lobetchevsky" />
                            <label>Дата рождения</label>
                            <input type="text" readOnly value="12.06.1997" />
                            <label>Статус пользователя</label>
                            <input type="text" readOnly value="Автор" />
                        </div>

                    </div>
                    <div className={cmedia.authorInfo}>
                        <div className={cmedia.articleList}>
                            <div className={cmedia.articleTypes}>
                                <ul className={cmedia.myArticles}>
                                    <h2>Список моих статей</h2>
                                    {myArticles}
                                    {/* <li><a href="#">Что-то интересное</a></li>
                                    <li><a href="#">Что-то важное</a></li>
                                    <li><a href="#">Что-то любимое</a></li>
                                    <li><a href="#">Что-то хорошее</a></li>
                                    <li><a href="#">Что-то теплое</a></li>
                                    <li><a href="#">Что-то скучное</a></li>
                                    <li><a href="#">Что-то грустное</a></li>
                                    <li><a href="#">Что-то ностальгическое</a></li>
                                    <li><a href="#">Что-то удивительное</a></li>
                                    <li><a href="#">Что-то пугающее</a></li> */}
                                </ul>
                                <ul className={cmedia.mostReadable}>
                                    <h2>Самые читаемые</h2>
                                    {sortedArticles}
                                </ul>
                            </div>
                            <div className={cmedia.counts}>
                                <p>Количество статей: <span>{props.myPosts.length}</span></p>
                                <p>Количество просмотров: <span>{viewCount}</span></p>
                                <button onClick={() => { history('/write') }}>Написать статью!</button>
                                {/* {myArticles.map(art => {
                                    return (<p>{art.title}</p>)
                                })} */}
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        )
    }
}

export default Profile;