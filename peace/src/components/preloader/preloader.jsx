import cmedia from './preloader.module.css';
import preloader from './../../media/preloaders/preloader.svg';

const Preloader = () => {
    return (
        <div className={cmedia.preloader}>
            <img src={preloader} alt="" />
        </div>
    )
}

export default Preloader;