import express from 'express';

const router = express.Router();

router.get("/test", (req, res) => {
    return res.json("test dsd");
});


export default router;