import cmedia from './menublock.module.css';
import React, { useEffect } from 'react'
import MenuItem from '../../../components/newsItems/menuItem';
import preloader from '../../../media/preloaders/preloader.svg';
import { useParams } from 'react-router-dom';
import Preloader from '../../../components/preloader/preloader';
const MenuBlock = (props) => {
    const { id } = useParams();
    useEffect(() => {
        // props.setPosts(props.cat);
        props.setMenuPosts(props.cat);
    }, [id, props.cat])

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');

        return doc.body.textContent;
    }

    let menuItems = props.newsItems.map(item => {
        if (item.sizeItem == 'small' && item.id < 5) {
            return (<MenuItem id={item.id} key={item.id} img={item.img} topic={item.topic} heading={item.heading} publicationTime={item.publicationTime} about={item.about} sizeItem={item.sizeItem} />)
        }
    })

    if (props.isMenuLoading) {
        return (
           <Preloader />
        )
    } else {

        let itemsfromApi = props.menuPosts.map(post => {
            if (post.id != id)
                return (<MenuItem id={post.id} key={post.id} img={`/upload/${post.img}`} heading={post.title} about={getText(post.about)} sizeItem="small" />)
        })
        return (
            <div className={cmedia.menuBlock}>
                <h3>Читайте также {props.cat}:</h3>
                {/* {menuItems} */}
                {itemsfromApi}
            </div>
        )
    }
}

export default MenuBlock