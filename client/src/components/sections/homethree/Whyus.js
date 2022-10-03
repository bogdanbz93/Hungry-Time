import React, { Component } from 'react';

const whyusblock = [
    {
        id: 1,
        icon: "star",
        title: "We Are Featured",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id: 2,
        icon: "apartment",
        title: "Unlimited Listings",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id: 3,
        icon: "sales-agent",
        title: "Great Support",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }
]

class Whyus extends Component {
    render() {
        return (
            <div className="section section-padding infographics-3">
                <div className="container">
                    <div className="section-title-wrap section-header">
                        <h5 className="custom-primary">Our Moto</h5>
                        <h2 className="title">Why Choose Us</h2>
                    </div>
                    <div className="row">
                        {whyusblock.map((item, i) => (
                            <div key={i} className="col-lg-4">
                                <div className="acr-infographic-item">
                                    <i className={"flaticon-" + item.icon + ""} />
                                    <div className="acr-infographic-item-body">
                                        <h5>{item.title}</h5>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Whyus;