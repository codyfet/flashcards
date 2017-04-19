import CategoriesService from './services/CategoriesService';
import CardsService from './services/CardsService';

import { BackendlessCategory } from './model';

export const CHANGE_SETTINGS_CATEGORIES = 'CHANGE_SETTINGS_CATEGORIES';
export const CHANGE_SETTINGS_ORDER = 'CHANGE_SETTINGS_ORDER';
export const CHANGE_SETTINGS_LANGUAGE = 'CHANGE_SETTINGS_LANGUAGE';
export const CHANGE_SETTINGS_MODE = 'CHANGE_SETTINGS_MODE';

export const CHANGE_SETTINGS_CATEGORY_AVAILABILITY_REQUEST = 'CHANGE_SETTINGS_CATEGORY_AVAILABILITY_REQUEST';
export const CHANGE_SETTINGS_CATEGORY_AVAILABILITY_SUCCESS = 'CHANGE_SETTINGS_CATEGORY_AVAILABILITY_SUCCESS';
export const CHANGE_SETTINGS_CATEGORY_AVAILABILITY_FAILURE = 'CHANGE_SETTINGS_CATEGORY_AVAILABILITY_FAILURE';

export const CHANGE_SETTINGS_CATEGORY_DELETE_REQUEST = 'CHANGE_SETTINGS_CATEGORY_DELETE_REQUEST';
export const CHANGE_SETTINGS_CATEGORY_DELETE_SUCCESS = 'CHANGE_SETTINGS_CATEGORY_DELETE_SUCCESS';
export const CHANGE_SETTINGS_CATEGORY_DELETE_FAILURE = 'CHANGE_SETTINGS_CATEGORY_DELETE_FAILURE';

export const CHANGE_SETTINGS_CATEGORY_ADD_REQUEST = 'CHANGE_SETTINGS_CATEGORY_ADD_REQUEST';
export const CHANGE_SETTINGS_CATEGORY_ADD_SUCCESS = 'CHANGE_SETTINGS_CATEGORY_ADD_SUCCESS';
export const CHANGE_SETTINGS_CATEGORY_ADD_FAILURE = 'CHANGE_SETTINGS_CATEGORY_ADD_FAILURE';

export const CHANGE_SETTINGS_CARD_AVAILABILITY_REQUEST = 'CHANGE_SETTINGS_CARD_AVAILABILITY_REQUEST';
export const CHANGE_SETTINGS_CARD_AVAILABILITY_SUCCESS = 'CHANGE_SETTINGS_CARD_AVAILABILITY_SUCCESS';
export const CHANGE_SETTINGS_CARD_AVAILABILITY_FAILURE = 'CHANGE_SETTINGS_CARD_AVAILABILITY_FAILURE';

export const CHANGE_SETTINGS_CARD_DELETE_REQUEST = 'CHANGE_SETTINGS_CARD_DELETE_REQUEST';
export const CHANGE_SETTINGS_CARD_DELETE_SUCCESS = 'CHANGE_SETTINGS_CARD_DELETE_SUCCESS';
export const CHANGE_SETTINGS_CARD_DELETE_FAILURE = 'CHANGE_SETTINGS_CARD_DELETE_FAILURE';

export const CHANGE_SETTINGS_CARD_ADD_REQUEST = 'CHANGE_SETTINGS_CARD_ADD_REQUEST';
export const CHANGE_SETTINGS_CARD_ADD_SUCCESS = 'CHANGE_SETTINGS_CARD_ADD_SUCCESS';
export const CHANGE_SETTINGS_CARD_ADD_FAILURE = 'CHANGE_SETTINGS_CARD_ADD_FAILURE';

export const CHANGE_SESSION_CURRENT_INDEX = 'CHANGE_SESSION_CURRENT_INDEX';
export const CHANGE_SESSION_CARD_LEARNED_STATUS = 'CHANGE_SESSION_CARD_LEARNED_STATUS';
export const CHANGE_SESSION_SHOW_BOTH = 'CHANGE_SESSION_SHOW_BOTH';

export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';
export const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE';

const changeSettingsCategories = (categories: Array<BackendlessCategory>) => ({
    type: CHANGE_SETTINGS_CATEGORIES,
    payload: categories
});

const changeSettingsOrder = (order: string) => ({
    type: CHANGE_SETTINGS_ORDER,
    payload: order
});

const changeSettingsLanguage = (language: string) => ({
    type: CHANGE_SETTINGS_LANGUAGE,
    payload: language
});

const changeSettingsMode = (mode: string) => ({
    type: CHANGE_SETTINGS_MODE,
    payload: mode
});

const changeSettingsCategoryAvailabilityRequest = () => ({
    type: CHANGE_SETTINGS_CATEGORY_AVAILABILITY_REQUEST
});

const changeSettingsCategoryAvailabilitySuccess = (result) => ({
    type: CHANGE_SETTINGS_CATEGORY_AVAILABILITY_SUCCESS,
    payload: {
        lastTimestamp: new Date().getTime(),
        result: result
    }
});

const changeSettingsCategoryAvailabilityFailure = (error) => ({
    type: CHANGE_SETTINGS_CATEGORY_AVAILABILITY_FAILURE,
    payload: {
        lastTimestamp: new Date().getTime(),
        result: error
    }
});

const changeSettingsCategoryAvailability = (objectId: string, enabled: boolean) => (dispatch, getState) => {

    dispatch(changeSettingsCategoryAvailabilityRequest());

    const queryparams = {
        enabled
    }
    CategoriesService.updateCategory(objectId, queryparams)
        .end((error, response) => {
            if (error) {
                return dispatch(changeSettingsCategoryAvailabilityFailure(error));
            }
            else {
                return dispatch(changeSettingsCategoryAvailabilitySuccess(response));
            }
        });
};

const changeSettingsCategoryDeleteRequest = () => ({
    type: CHANGE_SETTINGS_CATEGORY_DELETE_REQUEST
});

const changeSettingsCategoryDeleteSuccess = (result, objectId) => ({
    type: CHANGE_SETTINGS_CATEGORY_DELETE_SUCCESS,
    payload: {
        lastTimestamp: new Date().getTime(),
        result: result,
        objectId: objectId
    }
});

const changeSettingsCategoryDeleteFailure = (error, objectId) => ({
    type: CHANGE_SETTINGS_CATEGORY_DELETE_FAILURE,
    payload: {
        lastTimestamp: new Date().getTime(),
        result: error,
        objectId: objectId
    }
});

const changeSettingsCategoryDelete = (objectId: string) => (dispatch, getState) => {

    dispatch(changeSettingsCategoryDeleteRequest());

    CategoriesService.deleteCategory(objectId)
        .end((error, response) => {
            if (error) {
                return dispatch(changeSettingsCategoryDeleteFailure(error, objectId));
            }
            else {
                return dispatch(changeSettingsCategoryDeleteSuccess(response, objectId));
            }
        });
};

const changeSettingsCategoryAddRequest = () => ({
    type: CHANGE_SETTINGS_CATEGORY_ADD_REQUEST
});

const changeSettingsCategoryAddSuccess = (result) => ({
    type: CHANGE_SETTINGS_CATEGORY_ADD_SUCCESS,
    payload: {
        lastTimestamp: new Date().getTime(),
        result: result
    }
});

const changeSettingsCategoryAddFailure = (error) => ({
    type: CHANGE_SETTINGS_CATEGORY_ADD_FAILURE,
    payload: {
        lastTimestamp: new Date().getTime(),
        result: error
    }
});

const changeSettingsCategoryAdd = (title: string) => (dispatch, getState) => {

    dispatch(changeSettingsCategoryAddRequest());

    const queryparams = {
        title,
        id: new Date().getTime().toString()
    }

    CategoriesService.addCategory(queryparams)
        .end((error, response) => {
            if (error) {
                return dispatch(changeSettingsCategoryAddFailure(error));
            }
            else {
                return dispatch(changeSettingsCategoryAddSuccess(response));
            }
        });
};

const changeSettingsCardAvailabilityRequest = () => ({
    type: CHANGE_SETTINGS_CARD_AVAILABILITY_REQUEST
});

const changeSettingsCardAvailabilitySuccess = (categoryObjectId, cardObjectId, result) => ({
    type: CHANGE_SETTINGS_CARD_AVAILABILITY_SUCCESS,
    payload: {
        categoryObjectId,
        cardObjectId,
        result
    }
});

const changeSettingsCardAvailabilityFailure = (error) => ({
    type: CHANGE_SETTINGS_CARD_AVAILABILITY_FAILURE,
    payload: {
        result: error
    }
});

const changeSettingsCardAvailability = (categoryObjectId: string, cardObjectId: string, enabled: boolean) => (dispatch, getState) => {

    dispatch(changeSettingsCardAvailabilityRequest());

    const queryparams = {
        enabled
    }

    CardsService.updateCard(cardObjectId, queryparams)
        .end((error, response) => {
            if (error) {
                return dispatch(changeSettingsCardAvailabilityFailure(error));
            }
            else {
                return dispatch(changeSettingsCardAvailabilitySuccess(categoryObjectId, cardObjectId, response));
            }
        });
};

const changeSettingsCardDeleteRequest = () => ({
    type: CHANGE_SETTINGS_CARD_DELETE_REQUEST
});

const changeSettingsCardDeleteSuccess = (categoryObjectId, cardObjectId, result) => ({
    type: CHANGE_SETTINGS_CARD_DELETE_SUCCESS,
    payload: {
        categoryObjectId,
        cardObjectId,
        result
    }
});

const changeSettingsCardDeleteFailure = (error) => ({
    type: CHANGE_SETTINGS_CARD_DELETE_FAILURE,
    payload: {
        result: error
    }
});

const changeSettingsCardDelete = (categoryObjectId: string, cardObjectId: string) => (dispatch, getState) => {

    dispatch(changeSettingsCardDeleteRequest());

    CardsService.deleteCard(cardObjectId)
        .end((error, response) => {
            if (error) {
                return dispatch(changeSettingsCardDeleteFailure(error));
            }
            else {
                return dispatch(changeSettingsCardDeleteSuccess(categoryObjectId, cardObjectId, response));
            }
        });
};

const changeSettingsCardAddRequest = () => ({
    type: CHANGE_SETTINGS_CARD_ADD_REQUEST
});

const changeSettingsCardAddSuccess = (result: Object) => ({
    type: CHANGE_SETTINGS_CARD_ADD_SUCCESS,
    payload: {
        lastTimestamp: new Date().getTime(),
        result
    }
});

const changeSettingsCardAddFailure = (error) => ({
    type: CHANGE_SETTINGS_CARD_ADD_FAILURE,
    payload: {
        lastTimestamp: new Date().getTime(),
        result: error
    }
});

const changeSettingsCardAdd = (category: BackendlessCategory, cardEnglish: string, cardTranslation: string) => (dispatch, getState) => {

    dispatch(changeSettingsCardAddRequest());

    const queryparams = {
        'cards': [
            {
                'english': cardEnglish,
                'translation': cardTranslation,
                '___class': 'cards'
            }
        ]
    }

    CardsService.addCard(category.objectId, queryparams)
        .end((error, response) => {
            if (error) {
                return dispatch(changeSettingsCardAddFailure(error));
            }
            else {
                return dispatch(changeSettingsCardAddSuccess(response));
            }
        });
};


const changeSessionCurrentIndex = (index: number) => ({
    type: CHANGE_SESSION_CURRENT_INDEX,
    payload: index
});

const changeSessionCardLearnedStatus = (learnedStatus: boolean) => ({
    type: CHANGE_SESSION_CARD_LEARNED_STATUS,
    payload: learnedStatus
});

const changeSessionShowBoth = () => ({
    type: CHANGE_SESSION_SHOW_BOTH,
});

const categoriesRequest = () => ({
    type: CATEGORIES_REQUEST
});

const categoriesSuccess = (result) => {
    return {
        type: CATEGORIES_SUCCESS,
        payload: {
            lastTimestamp: new Date().getTime(),
            result: result
        }
    }
};

const categoriesFailure = (error) => {
    return {
        type: CATEGORIES_FAILURE,
        payload: {
            lastTimestamp: new Date().getTime(),
            error: error
        }
    }
};

const getCategories = () => (dispatch, getState) => {

    dispatch(categoriesRequest());

    CategoriesService.getCategories()
        .end((error, response) => {
            if (error) {
                return dispatch(categoriesFailure(error));
            }
            else {
                return dispatch(categoriesSuccess(response));
            }
        });

};

export {
    changeSettingsCategories,
    changeSettingsOrder,
    changeSettingsLanguage,
    changeSettingsMode,
    changeSettingsCategoryAvailability,
    changeSettingsCategoryDelete,
    changeSettingsCategoryAdd,
    changeSettingsCardAvailability,
    changeSettingsCardDelete,
    changeSettingsCardAdd,
    changeSessionCurrentIndex,
    changeSessionCardLearnedStatus,
    changeSessionShowBoth,
    getCategories
}
