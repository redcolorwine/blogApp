import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/footer';
import HeaderContainer from './components/header/headerContainer';
import LoginContainer from './pages/auth/loginContainer';
import RegisterContainer from './pages/auth/registerContainer';
import NewsContainer from './pages/news/newsContainer';
import NewsInfoContainer from './pages/news/newsInfo/newsInfoContainer';
import ProfileContainer from './pages/personalPage/profileContainer';
import WritePageContainer from './pages/personalPage/writePage/writePageContainer';
import store from './redux/redux_store.js';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="app-wrapper">
          <HeaderContainer />
          <Routes>
            <Route path="about" element={<NewsContainer />} />
            <Route path="news" element={<NewsContainer />} />
            <Route path={`/news/read/:id`} element={<NewsInfoContainer key={window.location.pathname} />} />
            <Route path={`/news/:cat`} element={<NewsContainer />} />
            <Route path="register" element={<RegisterContainer />} />
            <Route path="login" element={<LoginContainer />} />
            <Route path='profile' element={<ProfileContainer />}/>
            <Route path='write' element={<WritePageContainer />} />
            <Route path='*' element={<NewsContainer />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
