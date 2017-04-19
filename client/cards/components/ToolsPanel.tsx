import * as React from 'react';

import { Col, Panel, ButtonToolbar, ButtonGroup, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import * as Select from 'react-select';

import { Settings, Session } from '../model';

interface ToolsPanelProps {
    session: Session,
    settings: Settings,
    changeSessionCurrentIndex: (index: number) => void,
    changeSessionCardLearnedStatus: (learnedStatus: boolean) => void,
    changeSessionShowBoth: () => void
}

interface ToolsPanelState {

}

class ToolsPanel extends React.Component<ToolsPanelProps, ToolsPanelState> {
    constructor(props, context) {
        super(props, context);
    }

    /**
     * Обработчик нажатия на кнопку "Предыдущая" (стрелка влево).
     */
    handleLeftButtonClick = () => {
        let currentIndex = this.props.session.currentIndex;
        this.props.changeSessionCurrentIndex(this.getPreviousIndex(currentIndex));
    }

    /**
     * Обработчик нажатия на кнопку "Не знаю ответ" (крестик).
     */
    handleRemoveButtonClick = () => {
        this.props.changeSessionCardLearnedStatus(false);
    }

    /**
     * Обработчик нажатия на кнопку "Показать оба слова" (вопросительный знак).
     */
    handleShowBothButtonClick = () => {
        this.props.changeSessionShowBoth();
    }

    /**
     * Обработчик нажатия на кнопку "Знаю" (галочка).
     */
    handleOkButtonClick = () => {
        this.props.changeSessionCardLearnedStatus(true);
    }

    /**
     * Обработчик нажатия на кнопку "следующая" (стрелка вправо).
     */
    handleRightButtonClick = () => {
        let currentIndex = this.props.session.currentIndex;
        // Если выбран порядок "Последовательно".
        if (this.props.settings.selectedOrder === "Последовательно") {
            this.props.changeSessionCurrentIndex(this.getNextIndex(currentIndex));
        }
        // Если выбран порядок "Случайно".
        else if (this.props.settings.selectedOrder === "Случайно") {
            let randomIndex = this.getRandomInt(0, this.props.session.sessionCards.length - 1);
            this.props.changeSessionCurrentIndex(randomIndex);
        }
    }

    /**
     * Возвращает индекс следующей невыученной карточки.
     */
    getNextIndex = (currentIndex) => {
        const nextIndex = ++currentIndex;
        let result = null;
        let nextSessionCard = null;
        const rightPart = this.props.session.sessionCards.slice(nextIndex);
        const leftPart = this.props.session.sessionCards.slice(0, nextIndex);
        // Сначала анализируем правую часть массива.
        rightPart.some((sessionCard, index) => {
            if (!sessionCard.learned) {
                nextSessionCard = sessionCard;
                return true;
            }
        });
        // Если в правой части все карточки уже выучены, анализируем левую часть массива.
        if (nextSessionCard === null) {
            leftPart.some((sessionCard, index) => {
                if (!sessionCard.learned) {
                    nextSessionCard = sessionCard;
                    return true;
                }
            });
        }
        // Если найдена невыученная карточка, ищем ее в изначальном наборе (чтобы определить ее индекс).
        if (nextSessionCard) {
            this.props.session.sessionCards.some((sessionCard, index) => {
                if (sessionCard.card.objectId === nextSessionCard.card.objectId) {
                    result = index;
                    return true;
                }
            });
        }
        return result;
    }

    /**
     * Возвращает индекс предыдущей невыученной карточки.
     */
    getPreviousIndex = (currentIndex) => {
        //const nextIndex = --currentIndex;
        let result = null;
        let previousSessionCard = null;
        const leftPart = this.props.session.sessionCards.slice(0, currentIndex);
        const rightPart = this.props.session.sessionCards.slice(currentIndex);

        const reversedLeftPart = leftPart.reverse();
        const reversedRightPart = rightPart.reverse();

        // Сначала анализируем левую часть массива.
        reversedLeftPart.some((sessionCard, index) => {
            if (!sessionCard.learned) {
                previousSessionCard = sessionCard;
                return true;
            }
        });
        // Если в левой части все карточки уже выучены, анализируем правую часть массива.
        if (previousSessionCard === null) {
            reversedRightPart.some((sessionCard, index) => {
                if (!sessionCard.learned) {
                    previousSessionCard = sessionCard;
                    return true;
                }
            });
        }
        // Если найдена невыученная карточка, ищем ее в изначальном наборе (чтобы определить ее индекс).
        if (previousSessionCard) {
            this.props.session.sessionCards.some((sessionCard, index) => {
                if (sessionCard.card.objectId === previousSessionCard.card.objectId) {
                    result = index;
                    return true;
                }
            });
        }
        return result;
    }

    /**
     * Метод возвращает случайное значение между входными параметрами min и max.
     */
    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getTooltip = (text) => {
        const tooltip = (
            <Tooltip id="tooltip">{text}</Tooltip>
        );
        return tooltip;
    }

    render() {

        const tooltip = (
            <Tooltip id="tooltip"><strong>Holy guacamole!</strong> Check this info.</Tooltip>
        );
        return (
            <div>
                <OverlayTrigger placement="bottom" overlay={this.getTooltip("предыдущая")}>
                    <Button
                        bsSize="large"
                        className='glyphicon glyphicon-circle-arrow-left'
                        onClick={this.handleLeftButtonClick}
                    ></Button>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={this.getTooltip("не знаю ответ")}>
                    <Button
                        bsSize="large"
                        className='glyphicon glyphicon-remove-sign'
                        onClick={this.handleRemoveButtonClick}
                    ></Button>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={this.getTooltip("показать оба слова")}>
                    <Button
                        bsSize="large"
                        className='glyphicon glyphicon-question-sign'
                        onClick={this.handleShowBothButtonClick}
                    ></Button>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={this.getTooltip("знаю")}>
                    <Button
                        bsSize="large"
                        className='glyphicon glyphicon-ok-sign'
                        onClick={this.handleOkButtonClick}
                    ></Button>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={this.getTooltip("следующая")}>
                    <Button
                        bsSize="large"
                        className='glyphicon glyphicon-circle-arrow-right'
                        onClick={this.handleRightButtonClick}
                    ></Button>
                </OverlayTrigger>
            </div>
        );
    }
}

export default ToolsPanel;
