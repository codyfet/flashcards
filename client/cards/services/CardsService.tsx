import ServiceUtils from './ServiceUtils';

export default class CardsService {

    static addCard = (categoryObjectId, queryparams) => {
        return ServiceUtils.put("categories/" + categoryObjectId, queryparams);
    }

    static updateCard = (cardObjectId, queryparams) => {
        return ServiceUtils.put("cards/" + cardObjectId, queryparams);
    }

    static deleteCard = (cardObjectId) => {
        return ServiceUtils.deleteRecord("cards/" + cardObjectId);
    }

}