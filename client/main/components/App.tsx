import * as React from 'react';
import { Link } from 'react-router';

import Content from '../../cards/components/Content';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

interface AppProps { }
interface AppState { }

class App extends React.Component<AppProps, AppState> {

    render() {

        // TODO: переписать с использованием react router
        let selecteItem;
        if (location.href.indexOf("customization") > -1) {
            selecteItem = "customization";
        }
        else {
            selecteItem = "memorize";
        }

        return (
            <div>

                {/*<nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">FLASHCARDS</Link>
                        </div>
                        <ul className="nav navbar-nav pull-right">
                            <li className={selecteItem === "memorize" ? "active" : ""}><Link to="/memorize">режим обучения</Link></li>
                            <li className={selecteItem === "customization" ? "active" : ""}><Link to="/customization">карточки</Link></li>
                        </ul>
                    </div>
                </nav>*/}

                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link className="navbar-brand" to="/">FLASHCARDS</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to="/memorize">
                                <NavItem eventKey={1} className={selecteItem === "memorize" ? "active" : ""}>режим обучения</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/customization">
                                <NavItem eventKey={2} className={selecteItem === "customization" ? "active" : ""}>карточки</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Content children={this.props.children} />

                <nav className="footer navbar navbar-inverse navbar-fixed-bottom">
                    <div className="container-fluid">
                        {/*<div className="navbar-header">
                            <a className="navbar-brand" href="#">WebSiteName</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Home</a></li>
                            <li><a href="#">Page 1</a></li>
                            <li><a href="#">Page 2</a></li>
                            <li><a href="#">Page 3</a></li>
                        </ul>*/}
                    </div>
                </nav>

            </div>
        );
    }
}

export default App;
