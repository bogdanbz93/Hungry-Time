import React, { Fragment } from 'react';
import Menu from '../layouts/Menu';
import Mobilemenu from '../layouts/Mobilemenu';
import HeaderComponent from '../../helper/Navigationhelper';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

class Headerfour extends HeaderComponent {
    render() {
        return (
            <Fragment>
                {/* Aside (Mobile Navigation) */}
                <aside className={classNames("main-aside", { "open": this.state.navtoggle })}>
                    <div className="aside-title">
                        <div className="aside-controls aside-trigger">
                            <h4>Menu</h4>
                            <div className="close-btn close-dark" onClick={this.navtoggleClass} >
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                    <Mobilemenu />
                </aside>
                <div className="aside-overlay aside-trigger" onClick={this.navtoggleClass} />
                {/* Header Start */}
                <header className="main-header">
                    {/* Top Header Start */}
                    <div className="top-header">
                        <div className="container">
                            <div className="top-header-inner">
                                <ul className="social-media">
                                    <li> <Link to="#"> <i className="fab fa-facebook-f" /> </Link> </li>
                                    <li> <Link to="#"> <i className="fab fa-pinterest-p" /> </Link> </li>
                                    <li> <Link to="#"> <i className="fab fa-linkedin-in" /> </Link> </li>
                                    <li> <Link to="#"> <i className="fab fa-twitter" /> </Link> </li>
                                </ul>
                                <ul className="top-header-nav">
                                    <li> <Link to="/login"> Login</Link> </li>
                                    <li>or</li>
                                    <li> <Link to="/register"> Signup</Link> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Top Header End */}
                    <nav className="navbar">
                        <div className="container">
                            {/* Menu */}
                            <Menu />
                            <div className="header-controls">
                                <ul className="header-controls-inner d-none d-lg-flex">
                                    <li>
                                        <Link to="/submit-listing" className="btn-custom primary">Submit Listing <i className="fas fa-plus" /> </Link>
                                    </li>
                                </ul>
                                {/* Toggler */}
                                <div className="aside-toggler aside-trigger" onClick={this.navtoggleClass}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                {/* Header End */}
            </Fragment>
        );
    }
}

export default Headerfour;