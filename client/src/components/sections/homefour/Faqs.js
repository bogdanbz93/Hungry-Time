import React, { Component } from 'react';
import { Accordion, Card, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import contactinfo from '../../../data/contactinfo.json';

class Faqs extends Component {
    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="section-title-wrap section-header">
                        <h5 className="custom-primary">FAQ</h5>
                        <h2 className="title">FAQ Pricing</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 mb-lg-30">
                            <Accordion defaultActiveKey="0" className="with-gap">
                                <Card>
                                    <Accordion.Collapse eventKey="0" className="collapseparent">
                                        <Card.Body>
                                            <p> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                                            tempor,
                                            sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                            </p>
                                            <p> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                            </p>
                                            <ul className="acr-list mb-0">
                                                <li> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                                <li> Many desktop publishing packages and web page editors now use Lorem Ipsum </li>
                                                <li> There are many variations of passages of Lorem Ipsum </li>
                                                <li> Internet tend to repeat predefined chunks as necessary </li>
                                            </ul>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    <Card.Header>
                                        <Accordion.Toggle as={NavLink} variant="link" eventKey="0">
                                            How can I start with buying a home?
                                            </Accordion.Toggle>
                                    </Card.Header>
                                </Card>
                                <Card>
                                    <Accordion.Collapse eventKey="1" className="collapseparent">
                                        <Card.Body>
                                            <p> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                                            tempor,
                                            sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                            </p>
                                            <p> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                            </p>
                                            <ul className="acr-list mb-0">
                                                <li> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                                <li> Many desktop publishing packages and web page editors now use Lorem Ipsum </li>
                                                <li> There are many variations of passages of Lorem Ipsum </li>
                                                <li> Internet tend to repeat predefined chunks as necessary </li>
                                            </ul>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    <Card.Header>
                                        <Accordion.Toggle as={NavLink} variant="link" eventKey="1">
                                            Is the service free?
                                            </Accordion.Toggle>
                                    </Card.Header>
                                </Card>
                                <Card>
                                    <Accordion.Collapse eventKey="2" className="collapseparent">
                                        <Card.Body>
                                            <p> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                                            tempor,
                                            sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                            </p>
                                            <p> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                            </p>
                                            <ul className="acr-list mb-0">
                                                <li> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                                <li> Many desktop publishing packages and web page editors now use Lorem Ipsum </li>
                                                <li> There are many variations of passages of Lorem Ipsum </li>
                                                <li> Internet tend to repeat predefined chunks as necessary </li>
                                            </ul>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    <Card.Header>
                                        <Accordion.Toggle as={NavLink} variant="link" eventKey="2">
                                            How many agents can I have at once?
                                            </Accordion.Toggle>
                                    </Card.Header>
                                </Card>
                            </Accordion>
                        </div>
                        <div className="col-lg-4 infographics-5">
                            {contactinfo.slice(0, 2).map((item, i) => (
                                <div key={i} className="acr-infographic-item">
                                    <i className={"flaticon-" + item.icon + ""} />
                                    <div className="acr-infographic-item-body">
                                        <h5>{item.title}</h5>
                                        <p>{item.text}</p>
                                        <Link to={item.btnurl} className="btn-custom secondary btn-sm">{item.btntext}</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Faqs;