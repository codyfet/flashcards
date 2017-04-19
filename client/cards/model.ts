/**
 * Модель данных для записи из таблице cards.
 * Пример данных:
 *
 * {
 *  "created": 1492087869000,
 *  "english": "train",
 *  "translation": "поезд",
 *  "___class": "cards",
 *  "ownerId": null,
 *  "updated": null,
 *  "enabled": true,
 *  "objectId": "8B02FB7C-7625-81F8-FF35-80D0DF585200",
 *  "__meta": "{\"relationRemovalIds\":{},\"selectedProperties\":[\"created\",\"idCard\",\"english\",\"translation\",\"ownerId\",\"updated\",\"enabled\",\"objectId\",\"idCategory\"],\"relatedObjects\":{}}"
 * }
 *
 * @prop {Date} created Дата и время создания записи в БД. Системное поле.
 * @prop {string} english Слово на английском.
 * @prop {string} translation Перевод.
 * @prop {string} ___class Имя таблицы в БД. Системное поле.
 * @prop {string} ownerId ID создателя (владельца) записи. ID хранятся в таблице Users. Системное поле.
 * @prop {boolean} updated Признак обновления поля. Системное поле.
 * @prop {boolean} enabled Признак активности карточки.
 * @prop {string} objectId Уникальный идентификатор записи. Генерируется автоматически. Системное поле.
 * @prop {string} __meta Метаинформация. Системное поле.
 *
 * Системные поля заполняеются автоматически.
 */
export type BackendlessCard = {
    "created": Date,
    "english": string,
    "translation": string,
    "___class": string,
    "ownerId": string,
    "updated": boolean,
    "enabled": boolean,
    "objectId": string,
    "__meta": string
};

/**
 * Модель данных для записи из таблице categories.
 * Таблица categories связана с таблицей cards отношением 1..n.
 * Пример данных:
 *
 * {
 *  "cards": [],
 * "created": 1492087617000,
 * "___class": "categories",
 * "ownerId": null,
 * "title": "Цвета",
 * "updated": null,
 * "objectId": "2493900F-C65E-6A9C-FFC2-0F75D34C8300",
 * "enabled": true,
 * "__meta": "{\"relationRemovalIds\":{},\"selectedProperties\":[\"cards\",\"created\",\"___class\",\"ownerId\",\"title\",\"updated\",\"idCategory\",\"objectId\",\"enabled\"],\"relatedObjects\":{}}"
 * }
 *
 * @prop {Cards[]} cards Карточки, привязанный к данной категории.
 * @prop {Date} created Дата и время создания записи в БД. Системное поле.
 * @prop {string} ___class Имя таблицы в БД. Системное поле.
 * @prop {string} ownerId ID создателя (владельца) записи. ID хранятся в таблице Users. Системное поле.
 * @prop {string} title Название категории.
 * @prop {boolean} updated Признак обновления поля. Системное поле.
 * @prop {boolean} enabled Признак активности карточки.
 * @prop {string} objectId Уникальный идентификатор записи. Генерируется автоматически. Системное поле.
 * @prop {string} __meta Метаинформация. Системное поле.
 *
 * Системные поля заполняеются автоматически.
 */
export type BackendlessCategory = {
    "cards": BackendlessCard[],
    "created": Date,
    "___class": string,
    "ownerId": string,
    "title": string,
    "updated": boolean,
    "objectId": string,
    "enabled": boolean,
    "__meta": string
}

/**
 * TODO
 */
export type Settings = {
    allCategories: Array<BackendlessCategory>,
    selectedCategories: Array<BackendlessCategory>,
    allOrder: Array<string>,
    selectedOrder: string,
    allLanguage: Array<string>,
    selectedLanguage: string,
    allMode: Array<string>,
    selectedMode: string,
};

/**
 * TODO
 */
export type SessionCard = {
    card: BackendlessCard,
    learned: boolean
}

/**
 * TODO
 */
export type Session = {
    sessionCards: Array<SessionCard>,
    currentIndex: number,
    showBoth: boolean,
    isCategoriesLoading: boolean,
    isCategoryAvailabilityChanging: boolean,
    isCategoryDeleting: boolean,
    isCategoryAdding: boolean,
    isCardAdding: boolean,
    isCardDeleting: boolean,
    isCardAvailabilityChanging: boolean
};

/**
 * TODO
 */
export type IState = {
    settings: Settings,
    session: Session
}
