import React from 'react'
import cmedia from './writePage.module.css';
import userimg from './../../../media/user.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { blogApi } from '../../../api/api';
import moment from 'moment';

const WritePage = (props) => {
    let location = useLocation();
    const params = new URLSearchParams(location.search);
    const curId = params.get('edit');
    console.log(curId)
    let history = useNavigate();
    const [value, setValue] = useState(props.currentPost?.desc || "");
    const [title, setTitle] = useState(props.currentPost?.title || "");
    const [about, setAbout] = useState(props.currentPost?.about || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(props.currentPost?.cat || "");
    const { id } = useParams();
    //Отправка картинки на сервер
    const upload = async () => {
        try {
            const formData = new FormData();
            //Имя файла должно совпадать с именем которое указано в роуте на сервере
            //В данном случае на сервере file, и тут file
            formData.append('file', file)
            const res = await blogApi.postImg(formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        console.log(props.currentPost)
        debugger;
        e.preventDefault();
        const imgUrl = await upload();

        try {
            debugger;
            (curId != null)
                ? await blogApi.updatePost(props.currentPost.id, title, value, about, file ? imgUrl : props.currentPost.img, cat)
                : await blogApi.addPost(title, value, about, cat, file ? imgUrl : "", moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));

        } catch (err) {

            console.log(err);
        }
        history('/');
    }

    return (
        <div className={cmedia.personalPage}>
            <div className={cmedia.articleList}>
                <div className={cmedia.writeBlock}>

                    <div className={cmedia.editContainer}>
                        <div className={cmedia.firstBlock}>
                            <input type="text" value={title} placeholder="Заголовок" onChange={e => setTitle(e.target.value)} />
                            <input type="text" value={about} placeholder="О статье" onChange={e => setAbout(e.target.value)} />
                            <ReactQuill className={cmedia.editorArea} theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className={cmedia.secondBlock}>
                            <h2>Публикация</h2>
                            <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                            <label htmlFor="file">Загрузить изображение</label>
                            <p>Видимость: публичная</p>
                            <h2>Категория</h2>

                            <div className={cmedia.cat}><input type="radio" checked={cat === "art"} name="cat" onChange={e => setCat(e.target.value)} id="art" value="art" />
                                <label htmlFor="art">Искусство</label></div>
                            <div className={cmedia.cat}><input type="radio" checked={cat === "nature"} name="cat" onChange={e => setCat(e.target.value)} id="nature" value="nature" />
                                <label htmlFor="nature">Природа</label></div>
                            <div className={cmedia.cat}><input type="radio" checked={cat === "history"} name="cat" onChange={e => setCat(e.target.value)} id="history" value="history" />
                                <label htmlFor="history">Истории</label></div>
                            <div className={cmedia.cat}><input type="radio" checked={cat === "music"} name="cat" onChange={e => setCat(e.target.value)} id="music" value="music" />
                                <label htmlFor="music">Музыка</label></div>
                            <div className={cmedia.cat}><input type="radio" checked={cat === "technology"} name="cat" onChange={e => setCat(e.target.value)} id="technology" value="technology" />
                                <label htmlFor="techonoly">Технологии</label></div>
                            <div className={cmedia.cat}><input type="radio" checked={cat === "cinema"} name="cat" onChange={e => setCat(e.target.value)} id="cinema" value="cinema" />
                                <label htmlFor="cinema">Кино</label></div>
                            <div className={cmedia.buttonsArea}>
                                <button onClick={handleClick}>Сохранить</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default WritePage;