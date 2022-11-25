import { NavLink } from 'react-router-dom';
import cmedia from './footer.module.css';

const Footer = (props) => {
    return (
        <>
            <div className={cmedia.footer}>

                <div className={cmedia.aboutBlock}>
                    DEVAMIRA
                    <nav>
                        <li><a href="#">О редакции</a></li>
                        <li><a href="#">Блог</a></li>
                        <li><a href="#">Использование куки</a></li>
                        <li><a href="#">Обработка данных</a></li>
                        <li><a href="#">Связаться анонимно</a></li>
                        <li><a href="#">Поддержать</a></li>
                    </nav>
                </div>

                <div className={cmedia.appBlock}>
                    Приложения
                    <li><a href="#">iOS</a></li>
                    <li><a href="#">Android</a></li>
                </div>

                <div className={cmedia.platformBlock}>
                    Платформы
                    <li><a href="#">Инстаграм</a></li>
                    <li><a href="#">Телеграм</a></li>
                    <li><a href="#">Фейсбук</a></li>
                    <li><a href="#">Твиттер</a></li>
                    <li><a href="#">Ютуб</a></li>
                </div>

                <div className={cmedia.mailBlock}>
                    Рассылка
                    <div className={cmedia.mailText}>Подпишитесь на "devamira".
                        Эта имейл-рассылка помогает оставаться в курсе новостей.</div>
                    <input type="text" value='Email' readOnly/>
                    <input type="button" value="Подписаться" />
                </div>

            </div>

            <hr className={cmedia.hr} />
            
            <div className={cmedia.endFooter}>
                <div>Нашли ошибку? Cообщиие нам о ней!</div>
                <div>© devamira, 2022</div>
            </div>
        </>
    )
}

export default Footer;