// Packages
const readDocumentPackage = require('../../read-document/index');

// Vendors
const fs = require('fs');

const softDelete = (collectionsDirectory, collection, readObject) => {
    return new Promise((resolve, reject) => {
        try {
            // Params verification: start
            if (!collectionsDirectory) {
                const result = {
                    message: 'Collections directory was not defined',
                    status: 400
                };

                resolve(result);
            }

            if (!collection) {
                const result = {
                    message: 'Collection was not defined',
                    status: 400
                };

                resolve(result);
            }

            if (!readObject) {
                const result = {
                    message: 'Object to read query not defined',
                    status: 400
                };

                resolve(result);
            }
            // Params verification: end
            
            readDocumentPackage.read(collectionsDirectory, collection, readObject)
                .then(res => {
                    const documents = [];
                    collection = collection.toLowerCase();

                    (collectionsDirectory.substr(-1) === '/') ? collectionsDirectory = collectionsDirectory : collectionsDirectory = collectionsDirectory + '/';
                    collectionsDirectory = collectionsDirectory + collection + '/';
                    if (res.result.length > 0) {
                        const count = res.result.length;
                        for (let i = 0; i < res.result.length; i++) {
                            const object = res.result[i];
                            documents.push(object._id);
                            const newObject = {
                                ...object,
                                _deletedAt: new Date()
                            };
                            
                            fs.writeFileSync(collectionsDirectory + object._id, JSON.stringify(newObject));
                        }
                        const message = `${count} ${(documents.length > 1) ? ' documents deleted' : ' document deleted'}`;
                        const result = {
                            message: message,
                            status: 200,
                            result: documents
                        }
    
                        resolve(result);
                    } else {
                        const result = {
                            message: 'No document found',
                            status: 202,
                            result: documents
                        }
    
                        resolve(result);
                    }
                })
                .catch(rej => {
                    reject(rej);
                })
        } catch (error) {
            reject(error);
        }
    })
}

const softDeleteById = (collectionsDirectory, collection, id) => {
    return new Promise((resolve, reject) => {
        try {
            // Params verification: start
            if (!collectionsDirectory) {
                const result = {
                    message: 'Collections directory was not defined',
                    status: 400
                };

                resolve(result);
            }

            if (!collection) {
                const result = {
                    message: 'Collection was not defined',
                    status: 400
                };

                resolve(result);
            }

            if (!id) {
                const result = {
                    message: 'Id not defined',
                    status: 400
                };

                resolve(result);
            }
            // Params verification: end

            readDocumentPackage.readById(collectionsDirectory, collection, id)
                .then(res => {
                    const documents = [];
                    collection = collection.toLowerCase();

                    (collectionsDirectory.substr(-1) === '/') ? collectionsDirectory = collectionsDirectory : collectionsDirectory = collectionsDirectory + '/';
                    collectionsDirectory = collectionsDirectory + collection + '/';
                    if (res && res.result.length > 0) {
                        const count = res.result.length;
                        for (let i = 0; i < res.result.length; i++) {
                            const object = res.result[i];
                            documents.push(object._id);
                            const newObject = {
                                ...object,
                                _deletedAt: new Date()
                            };
                            
                            fs.writeFileSync(collectionsDirectory + object._id, JSON.stringify(newObject));
                        }
                        const message = `${count} ${(documents.length > 1) ? ' documents deleted' : ' document deleted'}`;
                        const result = {
                            message: message,
                            status: 200,
                            result: documents
                        }
    
                        resolve(result);
                    }

                    const result = {
                        message: 'No document found',
                        status: 202,
                        result: documents
                    }

                    resolve(result);
                })
                .catch(rej => {
                    reject(rej);
                })
        } catch (error) {

        }
    })
}

const hardDelete = (collectionsDirectory, collection, readObject, deleteSoftDeleted = false) => {
    return new Promise((resolve, reject) => {
        try {
            // Params verification: start
            if (!collectionsDirectory) {
                const result = {
                    message: 'Collections directory was not defined',
                    status: 400
                };

                resolve(result);
            }

            if (!collection) {
                const result = {
                    message: 'Collection was not defined',
                    status: 400
                };

                resolve(result);
            }

            if (!readObject) {
                const result = {
                    message: 'Object to read query not defined',
                    status: 400
                };

                resolve(result);
            }
            // Params verification: end

            readDocumentPackage.read(collectionsDirectory, collection, readObject)
                .then(res => {
                    const documents = [];
                    collection = collection.toLowerCase();

                    (collectionsDirectory.substr(-1) === '/') ? collectionsDirectory = collectionsDirectory : collectionsDirectory = collectionsDirectory + '/';
                    collectionsDirectory = collectionsDirectory + collection + '/';
                    if (res && res.result.length > 0) {
                        let count = 0;
                        for (let i = 0; i < res.result.length; i++) {
                            const object = res.result[i];
                            
                            if (!object._deletedAt && !deleteSoftDeleted) {
                                documents.push(object._id);
                                count ++;
                                fs.unlinkSync(collectionsDirectory + object._id);
                            }
                        }
                        const message = `${count}${(count > 1) ? ' documents deleted' : ' document deleted'}`;
                        const result = {
                            message: message,
                            status: 200,
                            result: documents
                        }
    
                        resolve(result);
                    } else {
                        const result = {
                            message: 'No document found',
                            status: 202,
                            result: documents
                        }
    
                        resolve(result);
                    }
                })
                .catch(rej => {
                    reject(rej);
                })
        } catch (error) {
            reject(error);
        }
    })
}

const hardDeleteById = (collectionsDirectory, collection, id, deleteSoftDeleted = false) => {
    return new Promise((resolve, reject) => {
        try {
            // Params verification: start
            if (!collectionsDirectory) {
                const result = {
                    message: 'Collections directory was not defined',
                    status: 400
                };

                resolve(result);
            }

            if (!collection) {
                const result = {
                    message: 'Collection was not defined',
                    status: 400
                };

                resolve(result);
            }

            if (!id) {
                const result = {
                    message: 'Id not defined',
                    status: 400
                };

                resolve(result);
            }
            // Params verification: end

            readDocumentPackage.readById(collectionsDirectory, collection, id)
                .then(res => {
                    const documents = [];
                    collection = collection.toLowerCase();
                    
                    (collectionsDirectory.substr(-1) === '/') ? collectionsDirectory = collectionsDirectory : collectionsDirectory = collectionsDirectory + '/';
                    collectionsDirectory = collectionsDirectory + collection + '/';
                    if (res && res.result.length > 0) {
                        let count = 0;
                        for (let i = 0; i < res.result.length; i++) {
                            const object = res.result[i];
                            
                            if (!object._deletedAt && !deleteSoftDeleted) {
                                documents.push(object._id);
                                count ++;
                                fs.unlinkSync(collectionsDirectory + object._id);
                            }
                        }
                        const message = `${count}${(count > 1) ? ' documents deleted' : ' document deleted'}`;
                        const result = {
                            message: message,
                            status: 200,
                            result: documents
                        }
    
                        resolve(result);
                    }

                    const result = {
                        message: 'No document found',
                        status: 400,
                        result: documents
                    }

                    resolve(result);
                })
                .catch(rej => {
                    reject(rej);
                })
        } catch (error) {

        }
    })
}

module.exports = {
    softDelete,
    softDeleteById,
    hardDelete,
    hardDeleteById
}