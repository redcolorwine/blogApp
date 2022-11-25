import { db } from "../db.js";
import jwt from 'jsonwebtoken';

export const getPosts = (req, res) => {
    //Если задана категория
    const q = req.query.cat
        ? "SELECT * FROM posts WHERE cat=?"
        : "SELECT * FROM posts";
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data);
    });

};

export const getPost = (req, res) => {
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date`,`about`,`views` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data[0]);
    })

}
export const getAuthorPosts = (req, res) => {
    const q = "SELECT p.id, `title`,`views` FROM users u JOIN posts p ON u.id=p.uid WHERE u.id=?";

    db.query(q, [req.body.userId], (err, data) => {
        if (err) return res.status(500).send(err);
        console.log(req.body)
        console.log(data)
        return res.status(200).json(data);
    })

}
export const addPost = (req, res) => {
    //Для начала проверим jwt и есть ли у нас право удалять определенный пост
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Вы не авторизованы!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Неверный токен!");

        const q = "INSERT INTO posts(`title`, `desc`,`about`, `img`, `cat`, `date`, `uid`) VALUES (?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.about,
            req.body.img,
            req.body.cat,
            req.body.date,

            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Публикация была создана!");
        })
    });

}

export const deletePost = (req, res) => {
    //Для начала проверим jwt и есть ли у нас право удалять определенный пост
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Вы не авторизованы!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Неверный токен!");

        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("Вы можете удалять только Ваши публикации!");

            return res.json("Публикация была удалена!");
        });
    });
};
export const updatePostView = (req, res) => {

    const q = "UPDATE posts SET `views` = `views` + 1 WHERE id = ?";

    db.query(q, [req.body.postId], (err, data) => {
        if (err) return res.json(err);

        return res.json("Счётчик просмотров обновлен!");
    })

}
export const updatePost = (req, res) => {
    //Для начала проверим jwt и есть ли у нас право удалять определенный пост
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Вы не авторизованы!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Неверный токен!");

        const postId = req.params.id;

        const q = "UPDATE posts SET `title`=?, `desc`=?,`about`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.about,
            req.body.img,
            req.body.cat
        ]

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log('Публикация обновлена!');
            return res.json("Публикация была обновлена!");
        })
    });
}
