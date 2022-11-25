import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import cmedia from './newsInfo.module.css';
import userimg from './../../../media/user.png';
import MenuBlockContainer from '../menuBlock/menuBlockContainer';
import moment from 'moment';
import view from './../../../media/view.png';
import localization from 'moment/locale/ru';
import anyImg from '../../../media/wilheim.jpg';
import Preloader from '../../../components/preloader/preloader';
const NewsInfo = (props) => {

    let location = useLocation();
    //Получаем ID из URL
    const { id } = useParams();
    let history = useNavigate();

    const onEditClick = () => {
        history(`/write?edit=${id}`);

    }

    const onDeleteClick = () => {
        props.deleteCurrentPost(id);
        history('/');
    }

    useEffect(() => {
        props.setCurrentPost(id);
        props.updateViewPost(id);
    }, [id])

    //Чтобы убрать теги из текста
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');

        return doc.body.textContent;
    }

    if (props.isPostsLoading) {
        return (
            <Preloader />
        )
    } else {
        console.log(props.currentPost);
        return (
            <div className={cmedia.newsInfo}>
                <div className={cmedia.mainBlock}>
                    <img src={props.currentPost?.img
                        ? `/upload/${props.currentPost.img}`
                        : anyImg} alt="" />

                    <div className={cmedia.author}>
                        <div className={cmedia.about}>
                            <img src={props.currentPost?.userImg
                                ? props.currentPost.userImg
                                : userimg} alt="" />
                            <span>{props.currentPost?.username
                                ? props.currentPost.username
                                : "Sergey Lobetchevsky"}</span>
                        </div>

                        {props.currentUser?.username === props.currentPost.username && <div className={cmedia.edit}>
                            <button onClick={onEditClick}>Редактировать</button>
                            <button onClick={onDeleteClick}>Удалить</button>
                        </div>}
                    </div>
                    <div>
                        <h2>{props.newsItems[id]?.topic
                            ? props.newsItems[id].topic
                            : ""}</h2>
                        <h1>
                            {props.currentPost?.title
                                ? props.currentPost.title
                                : props.newsItems[id].heading}
                        </h1>
                        <h3>
                            {props.currentPost?.about
                                ? getText(props.currentPost.about)
                                : ""}
                        </h3>
                        <div className={cmedia.articleText}>
                            {props.currentPost?.desc
                                ? getText(props.currentPost.desc)
                                : ""}
                        </div>
                        <div className={cmedia.aboutPublication}>
                            <div className={cmedia.views}><span>{props.currentPost.views}</span><img src={view} /></div>
                            <p>Опубликовано: <span>{props.currentPost?.date
                                ? moment(props.currentPost.date).fromNow()
                                : ""}</span></p>
                        </div>
                    </div>
                </div>
                <div className={cmedia.menuBlock}>
                    <MenuBlockContainer cat={props.currentPost.cat} />
                </div>
            </div>
        )
    }
}

export default NewsInfo;