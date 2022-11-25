import express from "express";
import postsRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import bodyparser from 'body-parser';

const app = express();


app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
//Опции для работы CORS и работы с куки 
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    ///..other options
};

app.use(cors(corsOptions));

app.use(cookieParser());

//Создаем хранилище для загружаемых с клиента фотографий на сервер
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../peace/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

//Для загрузки файлов с клиента на сервер
const upload = multer({ storage })
//папка, один файл, название файла
app.post('/api/upload', upload.single('file'), function (req, res) {
    console.log("Файл " + req.file.filename + " успешно загружен!"); // form files
    res.status(200).json("" + req.file.filename);
})

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.listen(8800, () => {
    console.log("server has been started on 8800 port")
});