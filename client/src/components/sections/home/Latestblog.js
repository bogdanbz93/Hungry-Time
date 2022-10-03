import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Latestblog extends Component {
    render() {
        return (
            <div className="section section-padding light-bg">
                <div className="container">
                    <div className="section-title-wrap section-header">
                        <h5 className="custom-primary">Latest News</h5>
                        <h2 className="title">From Our Blog</h2>
                    </div>
                    <div className="row"> 
                        <div className="col-lg-6">
                            <article className="post">
                                <div className="post-thumbnail">
                                    <Link to="/blog-single"><img src={process.env.PUBLIC_URL + "/assets/img/blog/1.jpg"} alt="blog post" /></Link>
                                </div>
                                <div className="post-body">
                                    <h5 className="post-title"> <Link to="/blog-single">What agencies are looking for in an agent</Link> </h5>
                                    <p className="post-text">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                    </p>
                                    <div className="post-controls">
                                        <Link to="#" className="btn-custom secondary btn-sm">Read More</Link>
                                        <div className="post-comment-authors">
                                            <span>Comments by: </span>
                                            <div className="post-comment-authors-img">
                                                <Link to="#"> <img src={process.env.PUBLIC_URL + "/assets/img/people/3.jpg"} alt="comment author" /> </Link>
                                                <Link to="#"> <img src={process.env.PUBLIC_URL + "/assets/img/people/4.jpg"} alt="comment author" /> </Link>
                                                <Link to="#"> +3 </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="col-lg-6">
                            <article className="post post-list">
                                <div className="post-thumbnail">
                                    <Link to="/blog-single"><img src={process.env.PUBLIC_URL + "/assets/img/blog/2.jpg"} alt="blog post" /></Link>
                                </div>
                                <div className="post-body">
                                    <h5 className="post-title"> <Link to="/blog-single">Changing the way we sell and buy real estate</Link> </h5>
                                    <p className="post-text">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                    </p>
                                </div>
                            </article>
                            <article className="post post-list">
                                <div className="post-thumbnail">
                                    <Link to="/blog-single"><img src={process.env.PUBLIC_URL + "/assets/img/blog/3.jpg"} alt="blog post" /></Link>
                                </div>
                                <div className="post-body">
                                    <h5 className="post-title"> <Link to="/blog-single">Families, its the best time to start buying</Link> </h5>
                                    <p className="post-text">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Latestblog;