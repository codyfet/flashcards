import * as React from 'react';
import { connect } from 'react-redux';
import { forEach, each, includes } from 'lodash';

import { BackendlessCategory, Settings, Session, SessionCard } from '../model';

import { Row, Col, Grid, Button, FormGroup, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import {
    changeSettingsCategoryAvailability,
    changeSettingsCategoryDelete,
    changeSettingsCategoryAdd,
    changeSettingsCardAvailability,
    changeSettingsCardDelete,
    changeSettingsCardAdd
} from '../../cards';

interface CategoryTableData {
    number: number,
    idCategory: string,
    category: string,
    cardsCount: number,
    enabled: boolean,
    remove: string
}

interface CardTableData {
    number: number,
    english: string,
    translation: string,
    cardId: string,
    idCategory: string,
    enabled: boolean,
    remove: string
}

interface CustomizationProps {
    settings: Settings,
    session: Session,
    changeSettingsCategoryAvailability: (objectId: string, enabled: boolean) => void,
    changeSettingsCategoryDelete: (objectId: string) => void,
    changeSettingsCategoryAdd: (categoryTitle: string) => void,
    changeSettingsCardAvailability: (categoryObjectId: string, cardObjectId: string, enabled: boolean) => void
    changeSettingsCardDelete: (categoryObjectId: string, cardObjectId: string) => void,
    changeSettingsCardAdd: (category: BackendlessCategory, cardEnglish: string, cardTranslation: string) => void
}

interface CustomizationState {
    newCategoryTitleInput: string,
    newCardEnglishInput: string,
    newCardTranslationInput: string,
    selectedIdCategory: string
}

class Customization extends React.Component<CustomizationProps, CustomizationState> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            newCategoryTitleInput: "",
            newCardEnglishInput: "",
            newCardTranslationInput: "",
            selectedIdCategory: null
        }
    }

    /**
     * Метод рисует кнопку "Звездочка" (сделать категорию активной).
     */
    renderIncludeCategoryButton = (cell, row) => {
        const iconClass = row.enabled ? 'glyphicon-star' : 'glyphicon-star-empty';
        const idCategoryClass = 'idCategory_' + row.idCategory;
        const className = "glyphicon " + iconClass + " " + idCategoryClass;
        return <Button bsSize='xsmall' className={className} title='сделать неактивной' onClick={this.handleIncludeCategoryButtonClick}></Button>;
    }

    /**
     * Обработчик нажатия на кнопку "Звездочка" (категория).
     */
    handleIncludeCategoryButtonClick = (event) => {
        // TODO: id -> objectId
        event.stopPropagation();
        const classes = event.target.className.split(" ");
        const idCategory = classes[2];
        const icon = classes[1];
        const enabled = icon === 'glyphicon-star' ? false : true;
        const id = idCategory.substr(idCategory.indexOf("_") + 1, idCategory.length - 1);
        this.props.changeSettingsCategoryAvailability(id, enabled);
    }

    /**
     * Метод рисует кнопку "Крестик" (удалить категорию).
     */
    renderRemoveCategoryButton = (cell, row) => {
        const idCategoryClass = 'idCategory_' + row.idCategory;
        const className = "glyphicon glyphicon-remove " + idCategoryClass;
        return <Button bsSize='xsmall' className={className} title='удалить категорию' onClick={this.handleRemoveCategoryButtonClick}></Button>;
    }

    /**
     * Обработчик нажатия на кнопку "Крестик" (категория).
     */
    handleRemoveCategoryButtonClick = (event) => {
        event.stopPropagation();
        const classes = event.target.className.split(" ");
        const idCategory = classes[2];
        const id = idCategory.substr(idCategory.indexOf("_") + 1, idCategory.length - 1);
        this.props.changeSettingsCategoryDelete(id);
    }

    /**
     * Обработчик нажатия на кнопку "Добавить категорию".
     */
    handleAddCategoryButtonClick = (event) => {
        if (this.state.newCategoryTitleInput != "") {
            this.props.changeSettingsCategoryAdd(this.state.newCategoryTitleInput);
            this.setState({
                newCategoryTitleInput: ""
            });
        };
    }

    /**
     * Изменяет состояние инпута с названием новой категории.
     */
    handleNewCategoryInputChange = (event) => {
        this.setState({ newCategoryTitleInput: event.target.value });
    }

    /**
     * Метода рисует кнопку "Звездочка" (сделать карточку активной).
     */
    renderIncludeCardButton = (cell, row) => {
        const iconClass = row.enabled ? 'glyphicon-star' : 'glyphicon-star-empty';
        const idCategoryClass = 'idCategory_' + row.idCategory;
        const cardId = 'cardId_' + row.cardId;
        const className = "glyphicon " + iconClass + " " + idCategoryClass + " " + cardId;
        return <Button bsSize='xsmall' className={className} title='сделать неактивной' onClick={this.handleIncludeCardButtonClick}></Button>;
    }

    /**
     * Обработчик нажатия на кнопку "Звездочка" (карточка).
     */
    handleIncludeCardButtonClick = (event) => {
        event.stopPropagation();
        const classes = event.target.className.split(" ");
        const idCategory = classes[2];
        const cardId = classes[3];
        const icon = classes[1];
        const enabled = icon === 'glyphicon-star' ? false : true;
        const idCategoryNumber = idCategory.substr(idCategory.indexOf("_") + 1, idCategory.length - 1);
        const cardIdNumber = cardId.substr(cardId.indexOf("_") + 1, cardId.length - 1);
        this.props.changeSettingsCardAvailability(idCategoryNumber, cardIdNumber, enabled);
    }

    /**
     * Метод рисует кнопку "Крестик" (удалить карточку).
     */
    renderRemoveCardButton = (cell, row) => {
        const idCategoryClass = 'idCategory_' + row.idCategory;
        const cardIdClass = 'cardId_' + row.cardId;
        const className = "glyphicon glyphicon-remove " + idCategoryClass + " " + cardIdClass;
        return <Button bsSize='xsmall' className={className} title='удалить категорию' onClick={this.handleRemoveCardButtonClick}></Button>;
    }

    /**
     * Обработчик нажатия на кнопку "Крестик" (карточка).
     */
    handleRemoveCardButtonClick = (event) => {
        event.stopPropagation();
        const classes = event.target.className.split(" ");
        const idCategory = classes[2];
        const cardId = classes[3];
        const idCategoryNumber = idCategory.substr(idCategory.indexOf("_") + 1, idCategory.length - 1);
        const cardIdNumber = cardId.substr(cardId.indexOf("_") + 1, cardId.length - 1);
        this.props.changeSettingsCardDelete(idCategoryNumber, cardIdNumber);
    }

    /**
     * Изменяет состояния инпута с english частью новой карточки.
     */
    handleNewCardEnglishInputChange = (event) => {
        this.setState({ newCardEnglishInput: event.target.value });
    }

    /**
     * Изменяет состояния инпута с translation частью новой карточки.
     */
    handleNewCardTranslationInputChange = (event) => {
        this.setState({ newCardTranslationInput: event.target.value });
    }

    /**
     * ОБработчки нажатия на кнопку "Добавить карточку".
     *
     */
    handleAddCardButtonClick = () => {
        if (this.state.newCardEnglishInput != "" && this.state.newCardTranslationInput != "") {
            const categoryToUpdate = this.props.settings.allCategories.filter(category=>{
                return category.objectId === this.state.selectedIdCategory
            })[0];
            this.props.changeSettingsCardAdd(
                categoryToUpdate,
                this.state.newCardEnglishInput,
                this.state.newCardTranslationInput
            );
            this.setState({
                newCardEnglishInput: "",
                newCardTranslationInput: ""
            });
        }
    }

    /**
     * Конструирует данные для таблицы (Категории).
     */
    mapCategoryStateToTableData = () => {
        let tableData: CategoryTableData[] = [];
        this.props.settings.allCategories.forEach((category, index) => {
            tableData.push({
                number: index + 1,
                idCategory: category.objectId,
                category: category.title,
                cardsCount: category.cards ? category.cards.length : 0,
                enabled: category.enabled,
                remove: ""
            })
        });
        return tableData;
    }

    /**
     * Конструирует данные для таблицы (Карточки).
     */
    mapCardsStateToTableData = () => {
        let tableData: CardTableData[] = [];

        const category = this.props.settings.allCategories.filter(category => {
            return category.objectId === this.state.selectedIdCategory;
        });

        if (category.length > 0) {
            let index = 0;
            category[0].cards &&
            category[0].cards.forEach(card => {

                tableData.push({
                    number: index++,
                    english: card.english,
                    translation: card.translation,
                    cardId: card.objectId,
                    idCategory: category[0].objectId,
                    enabled: card.enabled,
                    remove: ""
                })

            });
        }

        return tableData;
    }
    /**
     * Добавляет цветной фон строке, если пользователь выделил ее (актуально для таблицы Категории).
     */
    trClassFormat = (row, rowIndex) => {
        let result = "";
        if (row.idCategory === this.state.selectedIdCategory) {
            result = "pink-background";
        }
        return result;
    }

    renderHideOthersButton = () => {
        console.log("renderHideOthersButton");
        return (
            this.state.selectedIdCategory != null &&
            <a
                className="hide-others visible-xs"
                onClick={this.handleHideOtherClick}>
                    скрыть остальные
            </a>
        );
    }

    handleHideOtherClick = () => {
        console.log("handleHideOtherClick")
    }

    renderCategoryTable = () => {
        const categoriesData = this.mapCategoryStateToTableData();

        const component = this;
        const options = {
            onRowClick: function (row, cell) {
                component.setState({
                    selectedIdCategory: row.idCategory
                });
            },
            onRowDoubleClick: function (row) {
                // TODO: на двойной щелчок можно добавить возможность редактирования карточек.
            }
        };

        return (
            <Col md={6}>
                <div className="categories-label text-center">Категории</div>
                <BootstrapTable
                    data={categoriesData}

                    hover
                    headerContainerClass='displayNone'
                    maxHeight='500px'
                    options={options}
                    trClassName={this.trClassFormat}
                >
                    <TableHeaderColumn dataField='number' width='30px'></TableHeaderColumn>
                    <TableHeaderColumn isKey dataField='category'></TableHeaderColumn>
                    <TableHeaderColumn dataField='cardsCount' width='35px'></TableHeaderColumn>
                    <TableHeaderColumn dataField='status' width='40px' dataFormat={this.renderIncludeCategoryButton}></TableHeaderColumn>
                    <TableHeaderColumn dataField='remove' width='40px' dataFormat={this.renderRemoveCategoryButton}></TableHeaderColumn>
                </BootstrapTable>

                <div className="add-category-wrapper">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Имя новой категории"
                            value={this.state.newCategoryTitleInput}
                            onChange={this.handleNewCategoryInputChange}
                        />
                        <span className="input-group-btn">
                            <Button
                                className="btn btn-secondary glyphicon glyphicon-plus add-category-button"
                                onClick={this.handleAddCategoryButtonClick}
                            ></Button>
                        </span>
                    </div>
                </div>
            </Col>
        );
    }

    rednerCardTable = () => {
        const cardsData = this.mapCardsStateToTableData();

        return (
            <Col md={6}>
                <div className="text-center">Карточки</div>
                <BootstrapTable
                    data={cardsData}
                    striped
                    hover
                    headerContainerClass='displayNone'
                    maxHeight='500px'
                >
                    <TableHeaderColumn isKey dataField='english'></TableHeaderColumn>
                    <TableHeaderColumn dataField='translation'></TableHeaderColumn>
                    <TableHeaderColumn dataField='status' width='40px' dataFormat={this.renderIncludeCardButton}></TableHeaderColumn>
                    <TableHeaderColumn className="glyphicon glyphicon-remove" dataField='remove' width='40px' dataFormat={this.renderRemoveCardButton}></TableHeaderColumn>
                </BootstrapTable>

                {this.state.selectedIdCategory != null ?
                    <div className="add-card-wrapper">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control english-input"
                                placeholder="Английской слово"
                                value={this.state.newCardEnglishInput}
                                onChange={this.handleNewCardEnglishInputChange}
                            />
                            <input
                                type="text"
                                className="form-control translation-input"
                                placeholder="Перевод"
                                value={this.state.newCardTranslationInput}
                                onChange={this.handleNewCardTranslationInputChange}
                            />
                            <span className="input-group-btn">
                                <Button
                                    className="btn btn-secondary glyphicon glyphicon-plus add-card-button"
                                    onClick={this.handleAddCardButtonClick}
                                ></Button>
                            </span>
                        </div>
                    </div>
                    : null}
            </Col>
        );
    }

    render() {
        return (
            <div className="todoapp">
                <Grid>
                    <Row className='show-grid'>
                        {/* Col md={6}*/}
                        {this.renderCategoryTable()}
                        {/* Col md={6}*/}
                        {this.rednerCardTable()}
                    </Row>
                </Grid>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    settings: state.cards.settings,
    session: state.cards.session
});

const mapDispathcToProps = dispatch => ({
    changeSettingsCategoryAvailability: (objectId, enabled) => dispatch(changeSettingsCategoryAvailability(objectId, enabled)),
    changeSettingsCategoryDelete: (objectId: string) => dispatch(changeSettingsCategoryDelete(objectId)),
    changeSettingsCategoryAdd: (categoryTitle: string) => dispatch(changeSettingsCategoryAdd(categoryTitle)),
    changeSettingsCardAvailability: (categoryObjectId: string, cardObjectId: string, enabled: boolean) => dispatch(changeSettingsCardAvailability(categoryObjectId, cardObjectId, enabled)),
    changeSettingsCardDelete: (categoryObjectId: string, cardObjectId: string) => dispatch(changeSettingsCardDelete(categoryObjectId, cardObjectId)),
    changeSettingsCardAdd: (category: BackendlessCategory, cardEnglish: string, cardTranslation: string) => dispatch(changeSettingsCardAdd(category, cardEnglish, cardTranslation))
});

export default connect(mapStateToProps, mapDispathcToProps)(Customization);
