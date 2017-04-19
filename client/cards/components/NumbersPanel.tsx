import * as React from 'react';

import { Col, ButtonToolbar, ButtonGroup, Button, ProgressBar } from 'react-bootstrap';
import * as Select from 'react-select';

import { Settings, Session, SessionCard } from '../model';

interface NumbersPanelProps {
    session: Session,
    settings: Settings,
    changeSessionCurrentIndex: (index: number) => void
}

interface NumbersPanelState {

}

class NumbersPanel extends React.Component<NumbersPanelProps, NumbersPanelState> {
    constructor(props, context) {
        super(props, context);
    }

    /**
     * Определяет статус кнопку (цвет) на основании параметра, определяющего выучена ли карточка.
     * Возвращает string
     *  default (без цвета) - если карточка не показывалась
     *  success (зеленый) - если карточка плказывалась и выучена
     *  danger (красный) - если карточка показывалась и не выучена
     *
     * @memberOf Memorize
     */
    getButtonStatus = (element: SessionCard) => {
        let status: string;
        switch (element.learned) {
            case null: status = "default"; break;
            case true: status = "success"; break;
            case false: status = "danger"; break;
        }
        return status;
    }

    /**
     * Метод возвращает количество карточек в данной сессии (т.е. все карточки из выбранных категорий).
     */
    calculateSessionCardsCount = () => {
        return this.props.session.sessionCards.length;
    }
    /**
     * Метод возвращает количество выученных карточек в данной сессии.
     */
    calculateLearnedSessionCardsCount = () => {
        let counter = 0;
        this.props.session.sessionCards.forEach(sessionCard => {
            if (sessionCard.learned) {
                counter++;
            }
        });
        return counter;
    }

    /**
     * Обработчик нажатия на кнопку с цифрой.
     */
    handleNumberClick = (element) => {
        // Установить в глобал стейт в session.currentIndex индекс карточки, которую выбрал пользователь.
        this.props.changeSessionCurrentIndex(parseInt(element.target.innerHTML) - 1);
    }

    calculateProgress = () => {
        const result = 100 / this.calculateSessionCardsCount() * this.calculateLearnedSessionCardsCount();
        return result;
    }

    render() {
        return (
            <Col md={12}>
                { this.props.settings.selectedMode === "Пока не выучу" ?
                    <ButtonToolbar className='text-center'>
                        <ButtonGroup>
                            {
                                this.props.session.sessionCards.map((element, index) => {
                                    // Устанавливаем маркер на текущую карточку (добавляется обводка).
                                    const className = this.props.session.currentIndex === index ? "currentNumber" : "";
                                    return <Button
                                        className={className}
                                        bsStyle={this.getButtonStatus(element)}
                                        key={index}
                                        onClick={this.handleNumberClick}
                                    >{index + 1}</Button>
                                })
                            }
                        </ButtonGroup>
                    </ButtonToolbar>
                : null }
                <label>Выучено {this.calculateLearnedSessionCardsCount()}/{this.calculateSessionCardsCount()}</label>
                <ProgressBar bsStyle="success" now={this.calculateProgress()} />
            </Col>
        );
    }
}

export default NumbersPanel;
