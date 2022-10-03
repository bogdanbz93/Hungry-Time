import React, { Component, Fragment } from 'react';
import Bluecta from '../../layouts/Bluecta';
import Gallery from './Gallery';
import Info from './Info';
import Services from './Services';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Info/>
                <Services/>
                <Gallery/>
                <div className="section pt-0">
                    <Bluecta/>
                </div>
            </Fragment>
        );
    }
}

export default Content;