import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import { BackendlessCategory, BackendlessCard, Settings, Session, SessionCard } from '../model';

import {
    changeSettingsCategories,
    changeSettingsOrder,
    changeSettingsLanguage,
    changeSettingsMode,
    changeSessionCurrentIndex,
    changeSessionCardLearnedStatus,
    changeSessionShowBoth,

    getCategories
} from '../../cards';

import SettingsPanel from './SettingsPanel';
import NumbersPanel from './NumbersPanel';
import CardPanel from './CardPanel';
import ToolsPanel from './ToolsPanel';

interface MemorizeProps {
    settings: Settings,
    session: Session,
    changeSettingsCategories: (categories: BackendlessCategory[]) => void,
    changeSettingsOrder: (order: string) => void
    changeSettingsLanguage: (language: string) => void
    changeSettingsMode: (mode: string) => void,
    changeSessionCurrentIndex: (index: number) => void,
    changeSessionCardLearnedStatus: (learnedStatus: boolean) => void,
    changeSessionShowBoth: () => void
}

interface MemorizeState {

}

class Memorize extends React.Component<MemorizeProps, MemorizeState> {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <Grid>
                <Row className='edu-settings show-grid'>
                    <SettingsPanel
                        settings={this.props.settings}
                        changeSettingsCategories={this.props.changeSettingsCategories}
                        changeSettingsOrder={this.props.changeSettingsOrder}
                        changeSettingsLanguage={this.props.changeSettingsLanguage}
                        changeSettingsMode={this.props.changeSettingsMode}
                    />
                </Row>

                <Row className='edu-content show-grid'>
                    <CardPanel
                        settings={this.props.settings}
                        session={this.props.session}
                    />
                </Row>

                <Row className='edu-controls text-center show-grid'>
                    <ToolsPanel
                        session={this.props.session}
                        settings={this.props.settings}
                        changeSessionCurrentIndex={this.props.changeSessionCurrentIndex}
                        changeSessionCardLearnedStatus={this.props.changeSessionCardLearnedStatus}
                        changeSessionShowBoth={this.props.changeSessionShowBoth}
                    />
                </Row>

                <Row className='edu-numbers show-grid top-buffer'>
                    <NumbersPanel
                        session={this.props.session}
                        settings={this.props.settings}
                        changeSessionCurrentIndex={this.props.changeSessionCurrentIndex}
                    />
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.cards.settings,
    session: state.cards.session,
});

const mapDispathcToProps = dispatch => ({
    changeSettingsCategories: (categories: BackendlessCategory[]) => dispatch(changeSettingsCategories(categories)),
    changeSettingsOrder: (order) => dispatch(changeSettingsOrder(order)),
    changeSettingsLanguage: (language) => dispatch(changeSettingsLanguage(language)),
    changeSettingsMode: (mode) => dispatch(changeSettingsMode(mode)),
    changeSessionCurrentIndex: (index) => dispatch(changeSessionCurrentIndex(index)),
    changeSessionCardLearnedStatus: (learnedStatus) => dispatch(changeSessionCardLearnedStatus(learnedStatus)),
    changeSessionShowBoth: () => dispatch(changeSessionShowBoth())
});

export default connect(mapStateToProps, mapDispathcToProps)(Memorize);
