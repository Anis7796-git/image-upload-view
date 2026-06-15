



async function getImageData(collection) {
    return await collection.find().toArray();
}

module.exports = getImageData;