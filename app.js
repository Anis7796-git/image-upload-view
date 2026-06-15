

const express = require('express');


const fileupload = require('express-fileupload');
const dotenv = require('dotenv');
const getImageData= require('./src/service/imageData');
const app = express();





dotenv.config();
const port = process.env.PORT || 9980;
var images;

let collection;

//static file path
app.use(express.static(__dirname+"/public"));
app.set('view engine','ejs');
app.set('views',"./src/views");

const connectDB = require('./src/dbconnection/dbconnection');
app.use(fileupload());





app.get('/',async(req,res)=>{
    const images = await getImageData(collection);


    const formattedImages = images.map(img => ({
        ...img,
        base64: img.imageData.buffer.toString('base64')
    }));

    console.log(images);
    res.render('index',{  images: formattedImages });
});



app.post('/upload', async (req, res) => {

    const image = req.files.image;

    const imageData = {
        title: req.body.imagetitle,
        description: req.body.image_description,
        imageName: image.name,
        imageType: image.mimetype,
        imageSize: image.size,
        imageData: image.data,
        uploadDate: new Date()
    };

    await collection.insertOne(imageData);

   console.log('Image Uploaded Successfully');
     res.redirect('/');
});






async function startServer() {
    collection = await connectDB();
   app.listen(port, ()=>{
    console.log(`${port}`);
}); 
}

startServer();


