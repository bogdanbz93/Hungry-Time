import React, { useState } from "react";
import { Link } from "react-router-dom";
import { type } from "../../../data/category.json";

const Categories = () => {
  const [count, setCount] = useState(3);
  const handleShowMore = () => {
    if (count > 3) {
      setCount(3);
    } else {
      setCount(count + 3);
    }
  };

  return (
    <div id="categories" className="section section-padding bg-norepeat bg-bottom light-bg mt-5" style={{ backgroundImage: 'url("assets/img/misc/bldg.png")' }}>
      <div className="container">
        <div className="section-title-wrap section-header">
          <h5 className="custom-primary">Tipuri de restaurante</h5>
          <h1 className="title">Caută după o categorie</h1>
        </div>
        <div className="row">
          {type.slice(0, count).map((item, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div className="acr-category">
                <div className="acr-category-thumb">
                  <img className="icon-category" src={process.env.PUBLIC_URL + "/" + item.icon} alt="category" />
                  <Link to="#">
                    <img src={process.env.PUBLIC_URL + "/" + item.img} alt="category" />
                  </Link>
                  <div className="acr-category-body">
                    <h5>
                      {" "}
                      <Link to="#">{item.title}</Link>{" "}
                    </h5>
                    <p className="mb-0">{item.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-primary" onClick={handleShowMore}>
          Primary
        </button>
      </div>
    </div>
  );
};

export default Categories;
