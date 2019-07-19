const deletePackage = require('../../index');

const collectionsDirectory = '/home/ofm/Projects/resources/collections/';
const collection = 'User';
const readObject = {
    email: 'maxhaviland@gmail.com'
};

deletePackage.hardDelete(collectionsDirectory, collection, readObject)
    .then(res => {
        console.log(res);
    })
    .catch(rej => {
        console.log(rej);
    })