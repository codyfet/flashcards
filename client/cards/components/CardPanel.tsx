import * as React from 'react';

import { Row, Col, Panel } from 'react-bootstrap';
import * as Select from 'react-select';

import { Settings, Session, SessionCard } from '../model';

interface CardPanelProps {
    session: Session,
    settings: Settings
}

interface CardPanelState {
    englishWord: string,
    translationWord: string
}

class CardPanel extends React.Component<CardPanelProps, CardPanelState> {
    constructor(props, context) {
        super(props, context);
    }
    /**
     * Метод возвращает текущую карточку.
     * Карточка представляет собой пару слов:
     * Английское слово / Русское слово.
     * Основная задача здесь определить какое слово из пары показывать, а вместо какого показывать "?" (режим обучения).
     */
    returnWordsPair = () => {
        let wordsPair = {
            english: "?",
            translation: "?"
        }

        // Если карточек еще нет (т.е. пользователь не выбрал ни одной категории).
        if (this.props.session.sessionCards.length === 0) {
            return wordsPair;
        }
        // Если выбран режим "Учить оба языка". Какое слово показывать определяется случайно.
        if (this.props.settings.selectedLanguage === "Учить оба языка") {
            const showEnglish = Math.floor(Math.random() * 2);
            wordsPair.english = showEnglish ? this.props.session.sessionCards[this.props.session.currentIndex].card.english : "?";
            wordsPair.translation = !showEnglish ? this.props.session.sessionCards[this.props.session.currentIndex].card.translation : "?";
        }
        // Если пользователь нажал кнопку "Показать оба варианта".
        if (this.props.session.showBoth) {
            wordsPair.english = this.props.session.sessionCards[this.props.session.currentIndex].card.english;
            wordsPair.translation = this.props.session.sessionCards[this.props.session.currentIndex].card.translation;
        }
        // Если выбран режим "Учить английский".
        else if (this.props.settings.selectedLanguage === 'Учить английский') {
            wordsPair.english = "?";
            wordsPair.translation = this.props.session.sessionCards[this.props.session.currentIndex].card.translation;
        }
        // Если выбран режим "Учить русский".
        else if (this.props.settings.selectedLanguage === 'Учить русский') {
            wordsPair.english = this.props.session.sessionCards[this.props.session.currentIndex].card.english;
            wordsPair.translation = "?";
        }
        return wordsPair;
    }

    isAllCardsLearned = () => {
        let result = true;
        this.props.session.sessionCards.some(sessionCard => {
            if (!sessionCard.learned) {
                result = false;
                return true;
            }
        });
        return result;
    }

    render() {

        let content = null;
        if(this.props.session.sessionCards.length === 0){
            content =
                <Col className="text-center" xs={12} md={8} mdOffset={2}>
                    <label>Добавьте категории</label>
                </Col>
        }
        else if(this.isAllCardsLearned()){
            content =
                <div className="congrats">Поздравляем! Все карточки выучены</div>
        }
        else if (this.props.session.sessionCards.length > 0) {
            const wordsPair = this.returnWordsPair();
            content =
                <Col xs={12} md={8} mdOffset={2}>
                    <Panel header={(this.props.session.currentIndex + 1).toString()} /*bsStyle="success" bsStyle="danger"*/>
                        <Row>
                            <Col md={12} className="text-center">
                                <span className='cardnote english'>{wordsPair.english}</span>
                            </Col>
                        </Row>
                        <hr className='line' />
                        <Row>
                            <Col md={12} className="text-center">
                                <span className='cardnote translation'>{wordsPair.translation}</span>
                            </Col>
                        </Row>
                    </Panel>
                </Col>
        }

        return (
            <Panel className='card-wrapper'>
                {content}
            </Panel>
        );
    }
}

export default CardPanel;
