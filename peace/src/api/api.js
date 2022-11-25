import axios from 'axios';

//создаем настройки для запросов для переиспользования
const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8800/api/',
});

export const blogApi = {
    login(username, password) {
        return instance.post(`auth/login`, { username, password })
    },
    logout() {
        return instance.post(`auth/logout`)
    },
    register(username, password, email) {
        return instance.post(`auth/register`, { username, password, email })
    },
    getPosts(cat = "") {
        if (cat == "") {
            return instance.get(`/posts`).then(response => {
                return response.data;
            })
        } else {
            return instance.get(`/posts?cat=${cat}`).then(response => {
                return response.data;
            })
        }
    },
    getPost(postId = 0) {
        return instance.get(`/posts/${postId}`).then(response => {
            return response.data
        })
    },
    updateViewPost(postId) {
        return instance.post(`/posts/updateViewPost`, { postId: postId }).then(response => {
            return response.data;
        })
    },
    getAuthorPosts(userId = 0) {
        return instance.post(`/posts/uposts`, { userId: userId }).then(response => {
            return response.data;
        })
    },
    deletePost(postId) {
        return instance.delete(`/posts/${postId}`).then(response => {
            return response;
        });
    },
    updatePost(postId, title, desc, about, img, cat) {
        return instance.put(`/posts/${postId}`, { title, desc, about, img, cat }).then(response => {
            return response;
        });
    },
    addPost(title, desc, about, cat, img, date) {
        return instance.post(`/posts/`, { title, desc, about, cat, img, date }).then(response => {
            return response;
        });
    },
    postImg(formData) {
        return instance.post(`/upload`, formData).then(response => {
            return response;
        });
    }

}
