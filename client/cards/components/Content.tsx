import * as React from 'react';
import { connect } from 'react-redux';

import { Session } from '../model';

import { getCategories } from '../../cards';

interface ContentProps {
    session: Session,
    getCategories: () => void
}

interface ContentState {

}
/**
 * Класс обретка для всего контента приложения.
 * Используется для загрузки данных, которые необходимо получить при старте приложения.
 *
 * @export
 * @class Content
 * @extends {React.Component<ContentProps, ContentState>}
 */
export class Content extends React.Component<ContentProps, ContentState> {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.getCategories();
    }

    render() {

        return (
            <div className="content">
                {
                    this.props.session.isCategoriesLoading ?
                    <div className="spinner"></div> :
                    this.props.children
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    session: state.cards.session
});

const mapDispathcToProps = dispatch => ({
    getCategories: () => dispatch(getCategories())
});

export default connect(mapStateToProps, mapDispathcToProps)(Content);
