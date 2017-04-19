import * as request from 'superagent';

const REST_URL = "https://api.backendless.com/v1/data/";
const applicationId = "B6093C90-F307-8BA3-FF81-4A2048246800";
const secretKey = "56A0C12F-C5BA-AC18-FF37-A3522A041700";

// CREATE
const post = (type, queryparams) => {
    return request.post(REST_URL + type)
        .set('application-id', applicationId)
        .set('secret-key', secretKey)
        .send(queryparams)
}

// READ
const get = (type) => {
    return request.get(REST_URL + type)
        .set('application-id', applicationId)
        .set('secret-key', secretKey)
}

// UPDATE
const put = (type, queryparams) => {
    return request.put(REST_URL + type)
        .set('application-id', applicationId)
        .set('secret-key', secretKey)
        .send(queryparams)
}

// DELETE
const deleteRecord = (type) => {
    return request.delete(REST_URL + type)
        .set('application-id', applicationId)
        .set('secret-key', secretKey)
}

const ServiceUtils = {
    post,
    get,
    put,
    deleteRecord
};

export { ServiceUtils, post, get, put, deleteRecord }
export default ServiceUtils