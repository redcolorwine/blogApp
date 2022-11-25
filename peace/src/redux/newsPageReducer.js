import { blogApi } from '../api/api';
import blockmountain from './../media/blockmountain.jpg';
import fold from './../media/fold.jpg';
import mountains from './../media/mountains.jpg';
import natumountains from './../media/natumountains.jpg';
import volcanoes from './../media/volcanoes.jpg';
import wilheim from './../media/wilheim.jpg';

let initialState = {
    newsItems: [
        {
            id: 0, topic: "Природа", img: natumountains,
            heading: "Горы ", about: "возникшие в результате тектонических движений земной коры, которые приводят к деформациям горных пород, возникновению складок, горных хребтов и впадин.",
            publicationTime: "20 минут назад",
            sizeItem: 'small',
        },
        {
            id: 1, topic: "Природа", img: fold,
            heading: "Горы ", about: "возникшие в результате тектонических движений земной коры, которые приводят к деформациям горных пород, возникновению складок, горных хребтов и впадин.",
            publicationTime: "20 минут назад",
            sizeItem: 'small',
        },
        {
            id: 2, topic: "Природа", img: blockmountain,
            heading: "Горы ", about: "возникшие в результате тектонических движений земной коры, которые приводят к деформациям горных пород, возникновению складок, горных хребтов и впадин.",
            publicationTime: "20 минут назад",
            sizeItem: 'small',
        },
        {
            id: 3, topic: "Природа", img: natumountains,
            heading: "Горы ", about: "возникшие в результате тектонических движений земной коры, которые приводят к деформациям горных пород, возникновению складок, горных хребтов и впадин.",
            publicationTime: "20 минут назад",
            sizeItem: 'small',
        },
        {
            id: 4, topic: "Природа", img: volcanoes,
            heading: "Горы ", about: "возникшие в результате тектонических движений земной коры, которые приводят к деформациям горных пород, возникновению складок, горных хребтов и впадин.",
            publicationTime: "20 минут назад",
            sizeItem: 'small',
        },
        {
            id: 5, topic: "Природа", img: natumountains,
            heading: "Горы ", about: "возникшие в результате тектонических движений земной коры, которые приводят к деформациям горных пород, возникновению складок, горных хребтов и впадин.",
            publicationTime: "20 минут назад",
            sizeItem: 'small',
        },
        {
            id: 6, topic: "Природа", img: mountains,
            heading: "Вулкан",
            about: "эффузивное геологическое образование, имеющее выводное отверстие (жерло, кратер, кальдера) или трещины, из которых горячая лава и вулканические газы поступают на поверхность из недр планеты, или поступали ранее.",
            publicationTime: "18 минут назад",
            sizeItem: 'medium',
        },
        {
            id: 7, topic: "Природа", img: wilheim,
            heading: "Вулкан",
            about: "эффузивное геологическое образование, имеющее выводное отверстие (жерло, кратер, кальдера) или трещины, из которых горячая лава и вулканические газы поступают на поверхность из недр планеты, или поступали ранее.",
            publicationTime: "18 минут назад",
            sizeItem: 'medium',
        },
        {
            id: 8, topic: "Природа", img: mountains, about: "— форма рельефа, изолированное резкое поднятие местности с выраженными склонами и подножием или вершина в горной стране.",
            heading: "Гора́ (мн. ч. — го́ры)",
            publicationTime: "18 минут назад",
            sizeItem: 'big',
        }
    ],
    currentItemInfo: '',
    isAuth: false,
    news: "",
    isPageLoading: true,

}

//редьюсер
let newsPageReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_CURRENT_ITEM': {

            let curItem = state.newsItems.filter(news => news.id === action.newsId);
            return {
                ...state,
                currentItemInfo: curItem,
            }
        }
        case 'SET_NEWS': {
            return {
                ...state,
                news: action.news
            }
        }
        case 'SET_IS_PAGE_LOADING': {
            return {
                ...state,
                isPageLoading: action.isPageLoading
            }
        }
        default: return state
    }
}


export const setNewsThunk = (cat) => {
    return (dispatch) => {
        blogApi.getPosts(cat).then(response => {
            dispatch(setNews(response));
        }).then(() => {
            dispatch(setIsPageLoading(false));
        })
    }
}

export const getCurrentItem = (newsId) => { return { type: 'GET_CURRENT_ITEM', newsId } }
export const setNews = (news) => {
    return {
        type: 'SET_NEWS',
        news
    }
}
export const setIsPageLoading = (isPageLoading) => {
    return {
        type: 'SET_IS_PAGE_LOADING',
        isPageLoading
    }
}
export default newsPageReducer;