import cmedia from "./news.module.css";
import MediumItem from "../../components/newsItems/mediumItem";
import SmallItem from "../../components/newsItems/smallItem";
import BigItem from "../../components/newsItems/bigItem";
import preloader from '../../media/preloaders/preloader.svg';
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
import localization from 'moment/locale/ru';
import { useState } from "react";
import Preloader from "../../components/preloader/preloader";
const News = (props) => {
    // const cat = useLocation().search;
    const { cat } = useParams();
    const [loading, setLoading] = useState(true);
    //Добавил зависимость от категории и от постов. 
    //Чтобы ререндер происходил при изменении категории
    // и при изменении постов

    useEffect(() => {
        props.setNews(cat);

    }, [cat])

    //Чтобы убрать теги из текста
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');

        return doc.body.textContent;
    }

    let mediumNewsItems = props.newsItems.map(item => {
        if (item.sizeItem == 'medium') {
            return (<MediumItem id={item.id} key={item.id} img={item.img} topic={item.topic} heading={item.heading} about={item.about} publicationTime={item.publicationTime} sizeItem={item.sizeItem} />)
        }
    });
    let smallNewsItems = props.newsItems.map(item => {
        if (item.sizeItem == 'small') {
            return (<SmallItem id={item.id} key={item.id} img={item.img} topic={item.topic} heading={item.heading} publicationTime={item.publicationTime} about={item.about} sizeItem={item.sizeItem} />)
        }
    });
    let bigNewsItems = props.newsItems.map(item => {
        if (item.sizeItem == 'big') {
            return (<BigItem id={item.id} key={item.id} img={item.img} topic={item.topic} heading={item.heading} publicationTime={item.publicationTime} about={item.about} sizeItem={item.sizeItem} />)
        }
    })


    if (props.isPageLoading) {
        return (
           <Preloader />
        )
    } else {
        let index = 0;
        let itemsfromApi = props.news.map(post => {
            index++;
            if (index < (props.news.length) && (index % 4 == 0)) {
                return (<BigItem id={post.id} key={post.id} img={`/upload/${post.img}`} topic={post.cat} heading={post.title} about={getText(post.about)} sizeItem="small" publicationTime={moment(post.date).fromNow()} />)
            }
            else {
                return (<SmallItem id={post.id} key={post.id} img={`/upload/${post.img}`} topic={post.cat} heading={post.title} about={getText(post.about)} sizeItem="small" publicationTime={moment(post.date).fromNow()} />)
            }
        })

        return (
            <div className={cmedia.News}>
                
                <div className={cmedia.secondBlock}>
                    {itemsfromApi}
                    {/* {smallNewsItems}
                    {bigNewsItems} */}

                </div>

            </div>
        )
    }
}

export default News;