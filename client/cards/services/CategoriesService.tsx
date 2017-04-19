import ServiceUtils from './ServiceUtils';

export default class CategoriesService {

    static getCategories = () => {
        return ServiceUtils.get("categories");
    }

    static addCategory = (queryparams) => {
        return ServiceUtils.post("categories", queryparams);
    }

    static updateCategory = (objectId, queryparams) => {
        return ServiceUtils.put("categories/" + objectId, queryparams);
    }

    static deleteCategory = (objectId) => {
        return ServiceUtils.deleteRecord("categories/" + objectId);
    }

}