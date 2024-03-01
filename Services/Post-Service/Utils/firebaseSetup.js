const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const Post = require('../Models/postModel');
const config = require('../config/firebase');

initializeApp(config.firebaseConfig);

const storage = getStorage();

const fileUpload = async (req, res, next) => {
    try {
        console.log(req.body)
        const { content, title } = req.body;
        const userId = req.userId;
        console.log(req.file);

        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${req.file.originalname + '       ' + dateTime}`);
        
        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        
        const post = new Post({
            content,
            title,
            media: downloadURL,
            author:userId
        });

        await post.save();

        console.log('File successfully uploaded.',downloadURL);
        return res.status(201).json({success:true, data: downloadURL});

    } catch (error) {
        return res.status(500).json({success:false, data: error.message});
    }
};

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
};

module.exports = { fileUpload };
