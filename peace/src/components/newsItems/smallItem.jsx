import { useNavigate } from 'react-router-dom';
import cmedia from './newsItems.module.css';

const SmallItem = (props) => {
    let history = useNavigate();

    const onNewsClick = () => {
        history('/news/read/' + props.id);
    }
    
    return (
        <div className={cmedia.smallItem} onClick={onNewsClick}>
            <img src={props.img} alt={props.img} />
            <div className={cmedia.smallItemText}>
                <h2>{props.topic}</h2>
                <h1>
                    {props.heading}
                </h1>
                <h3>
                    {props.about}
                </h3>
                <p>{props.publicationTime}</p>
            </div>
        </div>
    )
}

export default SmallItem;