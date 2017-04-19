import { assign, includes, cloneDeep } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { BackendlessCard, BackendlessCategory, IState } from './model';
import {
    CHANGE_SETTINGS_CATEGORIES,
    CHANGE_SETTINGS_ORDER,
    CHANGE_SETTINGS_LANGUAGE,
    CHANGE_SETTINGS_MODE,

    CHANGE_SETTINGS_CATEGORY_AVAILABILITY_REQUEST,
    CHANGE_SETTINGS_CATEGORY_AVAILABILITY_SUCCESS,
    CHANGE_SETTINGS_CATEGORY_AVAILABILITY_FAILURE,

    CHANGE_SETTINGS_CATEGORY_DELETE_REQUEST,
    CHANGE_SETTINGS_CATEGORY_DELETE_SUCCESS,
    CHANGE_SETTINGS_CATEGORY_DELETE_FAILURE,

    CHANGE_SETTINGS_CATEGORY_ADD_REQUEST,
    CHANGE_SETTINGS_CATEGORY_ADD_SUCCESS,
    CHANGE_SETTINGS_CATEGORY_ADD_FAILURE,

    CHANGE_SETTINGS_CARD_AVAILABILITY_REQUEST,
    CHANGE_SETTINGS_CARD_AVAILABILITY_SUCCESS,
    CHANGE_SETTINGS_CARD_AVAILABILITY_FAILURE,

    CHANGE_SETTINGS_CARD_DELETE_REQUEST,
    CHANGE_SETTINGS_CARD_DELETE_SUCCESS,
    CHANGE_SETTINGS_CARD_DELETE_FAILURE,

    CHANGE_SETTINGS_CARD_ADD_REQUEST,
    CHANGE_SETTINGS_CARD_ADD_SUCCESS,
    CHANGE_SETTINGS_CARD_ADD_FAILURE,

    CHANGE_SESSION_CURRENT_INDEX,
    CHANGE_SESSION_CARD_LEARNED_STATUS,
    CHANGE_SESSION_SHOW_BOTH,

    CATEGORIES_REQUEST,
    CATEGORIES_SUCCESS,
    CATEGORIES_FAILURE

} from './actions';

const initialState: IState = {

    settings: {
        allCategories: [],
        selectedCategories: [],
        allOrder: ["Последовательно", "Случайно"],
        selectedOrder: "Последовательно", // для пустого значения используется null
        allLanguage: ['Учить русский', 'Учить английский', 'Учить оба языка'],
        selectedLanguage: 'Учить английский', // для пустого значения используется null
        allMode: ['Бесконечно', 'Пока не выучу'],
        selectedMode: 'Пока не выучу' // для пустого значения используется null
    },

    session: {
        sessionCards: [],
        currentIndex: 0,
        showBoth: false,
        isCategoriesLoading: false,
        isCategoryAvailabilityChanging: false,
        isCategoryDeleting: false,
        isCategoryAdding: false,
        isCardAdding: false,
        isCardDeleting: false,
        isCardAvailabilityChanging: false
    }
};

export default handleActions<IState>({

    [CHANGE_SETTINGS_CATEGORIES]: (state: IState, action: Action<Array<BackendlessCategory>>): IState => {
        let newState = cloneDeep(state);
        const selectedCategories = action.payload;
        newState.settings.selectedCategories = selectedCategories;
        let sessionCards = [];
        selectedCategories.forEach(category => {
            const cards = category.cards;
            cards.forEach(card => {
                if (card.enabled) {
                    sessionCards.push({
                        card: card,
                        learned: null
                    });
                }
            })
        });
        newState.session.sessionCards = sessionCards;
        return newState;
    },
    [CHANGE_SETTINGS_ORDER]: (state: IState, action: Action<string>): IState => {
        let newState = cloneDeep(state);
        newState.settings.selectedOrder = action.payload;
        return newState;
    },
    [CHANGE_SETTINGS_LANGUAGE]: (state: IState, action: Action<string>): IState => {
        let newState = cloneDeep(state);
        newState.settings.selectedLanguage = action.payload;
        return newState;
    },
    [CHANGE_SETTINGS_MODE]: (state: IState, action: Action<string>): IState => {
        let newState = cloneDeep(state);
        newState.settings.selectedMode = action.payload;
        return newState;
    },

    [CHANGE_SETTINGS_CATEGORY_AVAILABILITY_REQUEST]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCategoryAvailabilityChanging = true;
        return newState;
    },
    [CHANGE_SETTINGS_CATEGORY_AVAILABILITY_SUCCESS]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        let categoryForUpdate: BackendlessCategory;
        newState.settings.allCategories.some(category => {
            if (category.objectId === action.payload.result.body.objectId) {
                categoryForUpdate = category;
                return true;
            }
        });
        categoryForUpdate.enabled = action.payload.result.body.enabled;
        newState.session.isCategoryAvailabilityChanging = false;
        return newState;
    },
    [CHANGE_SETTINGS_CATEGORY_AVAILABILITY_FAILURE]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCategoryAvailabilityChanging = false;

        console.log(JSON.stringify(action.payload.error));
        console.log("Сервис update categories вернул ошибку.");

        return newState;
    },

    [CHANGE_SETTINGS_CATEGORY_DELETE_REQUEST]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCategoryDeleting = true;
        return newState;
    },
    [CHANGE_SETTINGS_CATEGORY_DELETE_SUCCESS]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.settings.allCategories = newState.settings.allCategories.filter(category => {
            return category.objectId != action.payload.objectId
        });
        newState.session.isCategoryAvailabilityChanging = false;
        return newState;
    },
    [CHANGE_SETTINGS_CATEGORY_DELETE_FAILURE]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCategoryDeleting = false;

        console.log(JSON.stringify(action.payload.error));
        console.log("Сервис delete category вернул ошибку.");

        return newState;
    },

    [CHANGE_SETTINGS_CATEGORY_ADD_REQUEST]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCategoryAdding = true;
        return newState;
    },
    [CHANGE_SETTINGS_CATEGORY_ADD_SUCCESS]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.settings.allCategories.push(action.payload.result.body);
        newState.session.isCategoryAdding = false;
        return newState;
    },
    [CHANGE_SETTINGS_CATEGORY_ADD_FAILURE]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCategoryAdding = false;

        console.log(JSON.stringify(action.payload.error));
        console.log("Сервис add category вернул ошибку.");

        return newState;
    },

    [CHANGE_SETTINGS_CARD_AVAILABILITY_REQUEST]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCardAvailabilityChanging = true;
        return newState;
    },
    [CHANGE_SETTINGS_CARD_AVAILABILITY_SUCCESS]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        let categoryForUpdate: BackendlessCategory;
        newState.settings.allCategories.some(category => {
            if (category.objectId === action.payload.categoryObjectId) {
                categoryForUpdate = category;
                return true;
            }
        });
        categoryForUpdate.cards.some(card => {
            if (card.objectId === action.payload.cardObjectId) {
                card.enabled = action.payload.result.body.enabled;
                return true;
            }
        });
        newState.session.isCardAvailabilityChanging = false;
        return newState;
    },
    [CHANGE_SETTINGS_CARD_AVAILABILITY_FAILURE]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCardAvailabilityChanging = false;

        console.log(JSON.stringify(action.payload.error));
        console.log("Сервис update card вернул ошибку.");
        console.log(action.payload.error);

        return newState;
    },

    [CHANGE_SETTINGS_CARD_DELETE_REQUEST]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCardDeleting = true;
        return newState;
    },
    [CHANGE_SETTINGS_CARD_DELETE_SUCCESS]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        let categoryForUpdate: BackendlessCategory;
        newState.settings.allCategories.some(category => {
            if (category.objectId === action.payload.categoryObjectId) {
                categoryForUpdate = category;
                return true;
            }
        });
        categoryForUpdate.cards = categoryForUpdate.cards.filter(card => {
            return card.objectId != action.payload.cardObjectId
        });
        newState.session.isCardDeleting = false;
        return newState;
    },
    [CHANGE_SETTINGS_CARD_DELETE_FAILURE]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCardDeleting = false;

        console.log(JSON.stringify(action.payload.error));
        console.log("Сервис delete card вернул ошибку.");
        console.log(action.payload.error);

        return newState;
    },


    [CHANGE_SETTINGS_CARD_ADD_REQUEST]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCardAdding = true;
        return newState;
    },
    [CHANGE_SETTINGS_CARD_ADD_SUCCESS]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        let categoryForUpdate: BackendlessCategory;
        newState.settings.allCategories.some(category => {
            if (category.objectId === action.payload.result.body.objectId) {
                categoryForUpdate = category;
                return true;
            }
        });
        action.payload.result.body.cards.forEach(card=>{
            categoryForUpdate.cards.push(card);
        });
        newState.session.isCardAdding = false;
        return newState;
    },
    [CHANGE_SETTINGS_CARD_ADD_FAILURE]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCardAdding = false;

        console.log(JSON.stringify(action.payload.error));
        console.log("Сервис add card вернул ошибку.");
        console.log(action.payload.error);

        return newState;
    },

    [CHANGE_SESSION_CURRENT_INDEX]: (state: IState, action: Action<number>): IState => {
        let newState = cloneDeep(state);
        newState.session.currentIndex = action.payload;
        // Всегда устанавливаем значение showBoth в false при выборе новой карточки
        // (нужно, чтобы сбросить состояние, если пользователь смотрел ответ).
        newState.session.showBoth = false;
        return newState;
    },
    [CHANGE_SESSION_CARD_LEARNED_STATUS]: (state: IState, action: Action<boolean>): IState => {
        let newState = cloneDeep(state);
        const currentIndex = newState.session.currentIndex;
        let currentSessionCard = newState.session.sessionCards[currentIndex];
        currentSessionCard.learned = action.payload;
        // Показать ответ при нажатии кнопки "Знаю".
        newState.session.showBoth = true;
        return newState;
    },
    [CHANGE_SESSION_SHOW_BOTH]: (state: IState, action: Action<boolean>): IState => {
        let newState = cloneDeep(state);
        newState.session.showBoth = !newState.session.showBoth;
        return newState;
    },

    [CATEGORIES_REQUEST]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCategoriesLoading = true;
        return newState;
    },
    [CATEGORIES_SUCCESS]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        const responseCategories: BackendlessCategory[] = action.payload.result.body.data;

        console.log("responseCategories");
        console.log(responseCategories);

        newState.settings.allCategories = responseCategories;
        newState.session.isCategoriesLoading = false;
        return newState;
    },
    [CATEGORIES_FAILURE]: (state: IState, action: Action<(any)>): IState => {
        let newState = cloneDeep(state);
        newState.session.isCategoriesLoading = false;

        console.log(JSON.stringify(action.payload.error));
        console.log("Сервис categories вернул ошибку.");

        return newState;
    }

}, initialState);
