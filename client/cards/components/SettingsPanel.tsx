import * as React from 'react';

import { Col, Panel } from 'react-bootstrap';
import * as Select from 'react-select';

import { BackendlessCategory, Settings, Session } from '../model';

import {
    changeSettingsCategories,
    changeSettingsOrder,
    changeSettingsLanguage,
    changeSettingsMode
} from '../../cards';

interface Option {
    value: string,
    label: string
}

interface SettingsPanelProps {
    settings: Settings,
    changeSettingsCategories: (categories: BackendlessCategory[]) => void,
    changeSettingsOrder: (order: string) => void
    changeSettingsLanguage: (language: string) => void
    changeSettingsMode: (mode: string) => void
}

interface SettingsPanelState {

}

class SettingsPanel extends React.Component<SettingsPanelProps, SettingsPanelState> {
    constructor(props, context) {
        super(props, context);
    }

    /**
     * Возвращает массив объектов (options) для селектов вида:
     * {
            value: "value",
            label: "orderItem"
     * }
     * Такие объекты поступают на вход в react select компонент (props options).
     * Используется для селектов: Language, Order, Mode.
     */
    buildOptions = (selectType: string, isCatalog: boolean = true) => {
        let options : Option[] = [];
        let allItems;

        switch (selectType) {
            case "order":
                allItems = this.props.settings.allOrder;
                break;
            case "language":
                allItems = this.props.settings.allLanguage;
                break;
            case "mode":
                allItems = this.props.settings.allMode;
                break;
        }
        allItems.forEach(orderItem => {
            options.push({
                value: orderItem,
                label: orderItem
            });
        });
        return options;
    }
    /**
     * Используется для Категорий. Отдельный метод, так как это multi select.
     * Возвращает массив объектов (options) для селектов вида:
     * {
            value: "value",
            label: "orderItem"
     * }
     * Строит массив значения для multi select Categories.
     */
    buildCategoriesValues = () => {
        let values = [];
        if (this.props.settings.selectedCategories) {
            this.props.settings.selectedCategories.forEach(category => {
                values.push({
                    value: category.title,
                    label: category.title
                });
            });
        }
        return values;
    }
    /**
     * Используется для Категорий. Отдельный метод, так как это multi select.
     * Возвращает массив объектов для селектов вида:
     * {
            value: "value",
            label: "orderItem"
     * }
     * Строит массив опций для multi select Categories.
     */
    buildCategoriesOptions = () => {
        let options = [];
        if (this.props.settings.allCategories) {
            this.props.settings.allCategories.forEach(category => {
                if (category.enabled) {
                    options.push({
                        value: category.title,
                        label: category.title
                    });
                }
            });
        }
        return options;
    }

    /**
     * Обработчик выбора Категории.
     */
    handleSelectCategoryChange = (options) => {
        let addedCategories: BackendlessCategory[] = [];
        const allCategories = this.props.settings.allCategories;
        options.forEach(option => {
            const foundCategory = allCategories.filter(category => {
                return category.title === option.label;
            });
            addedCategories.push(foundCategory[0]);
        });
        this.props.changeSettingsCategories(addedCategories);
    }

    /**
     * Обработчик выбора Порядка.
     */
    handleSelectOrderChange = (value) => {
        this.props.changeSettingsOrder(value ? value.label : null);
    }

    /**
     * Обработчик выбора Языка.
     */
    handleSelectLanguageChange = (value) => {
        this.props.changeSettingsLanguage(value ? value.label : null);
    }

    /**
     * Обработчик выбора Режима Сессии.
     */
    handleSelectModeChange = (value) => {
        this.props.changeSettingsMode(value ? value.label : null);
    }

    render() {
        return (
            <Panel>
                <Col md={3}>
                    <label>Категория</label>
                    <Select
                        multi
                        className={'selectCategory'}
                        value={this.buildCategoriesValues()}
                        placeholder="Выберите категорию"
                        options={this.buildCategoriesOptions()}
                        onChange={this.handleSelectCategoryChange.bind(this)}
                    />
                </Col>
                <Col md={3}>
                    <label>Порядок</label>
                    <Select
                        className={'selectOrder'}
                        value={this.props.settings.selectedOrder}
                        placeholder="Установите порядок"
                        options={this.buildOptions("order")}
                        onChange={this.handleSelectOrderChange}
                    />
                </Col>
                <Col md={3}>
                    <label>Язык</label>
                    <Select
                        className={'selectLanguageMode'}
                        value={this.props.settings.selectedLanguage}
                        placeholder="Выберите режим"
                        options={this.buildOptions("language")}
                        onChange={this.handleSelectLanguageChange}
                    />
                </Col>
                <Col md={3}>
                    <label>Сессия</label>
                    <Select
                        className={'selectSessionMode'}
                        value={this.props.settings.selectedMode}
                        placeholder="Выберите режим"
                        options={this.buildOptions("mode")}
                        onChange={this.handleSelectModeChange}
                    />
                </Col>
            </Panel>
        );
    }
}

export default SettingsPanel;
