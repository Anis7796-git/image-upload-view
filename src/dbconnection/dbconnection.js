require('dotenv').config();
const {MongoClient}= require('mongodb');

const murl = process.env.MONGOURL;

console.log(`db connection page ${murl}`);



async function connectionDB(){

    const client= new MongoClient(murl);

await client.connect();
console.log("Db connected successfully");

const db = client.db('imageupload');

const collections = await db.listCollections({
    name:'images'
}).toArray();

if(collections.length===0){

    await db.createCollection('images');
    console.log("images collection created");
}

return db.collection('images');

}
module.exports = connectionDB;