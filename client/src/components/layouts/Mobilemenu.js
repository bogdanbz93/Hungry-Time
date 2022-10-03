import React, { Component } from "react";
import { Link } from "react-router-dom";
import navigation from "../../data/navigation.json";

class Mobilemenu extends Component {
  getNextSibling = function (elem, selector) {
    // Get the next sibling element
    var sibling = elem.nextElementSibling;
    // If there's no selector, return the first sibling
    if (!selector) return sibling;
    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
      if (sibling.matches(selector)) return sibling;
      sibling = sibling.nextElementSibling;
    }
  };
  triggerChild = e => {
    let subMenu = "";
    subMenu = this.getNextSibling(e.target, ".submenu") !== undefined ? this.getNextSibling(e.target, ".submenu") : null;
    if (subMenu !== null && subMenu !== undefined && subMenu !== "") {
      subMenu.classList = subMenu.classList.contains("d-block") ? "submenu" : "submenu d-block";
    }
  };
  render() {
    return (
      <div className="aside-scroll">
        <ul>
          {/* Pages Start */}
          <li className="menu-section-title">Pagini</li>
          {navigation.length > 0
            ? navigation.map((item, i) => (
                <li key={i} className={`menu-item ${item.child ? "menu-item-has-children" : ""} `} onClick={this.triggerChild}>
                  {item.child ? (
                    <Link onClick={e => e.preventDefault()} to="/">
                      {" "}
                      <i className={"flaticon-" + item.icon + ""} /> {item.linkText}{" "}
                    </Link>
                  ) : (
                    <Link to={item.link}>
                      {" "}
                      <i className={"flaticon-" + item.icon + ""} /> {item.linkText}{" "}
                    </Link>
                  )}
                  {item.child ? (
                    <ul className="submenu" role="menu">
                      {item.submenu.map((sub_item, i) => (
                        <li key={i} className={`menu-item ${sub_item.child ? "menu-item-has-children" : ""} `}>
                          {sub_item.child ? (
                            <Link onClick={e => e.preventDefault()} to="/">
                              {" "}
                              {sub_item.linkText}{" "}
                            </Link>
                          ) : (
                            <Link to={sub_item.link}> {sub_item.linkText} </Link>
                          )}
                          {sub_item.submenu ? (
                            <ul className="submenu">
                              {sub_item.submenu.map((third_item, i) => (
                                <li className="menu-item" key={i}>
                                  <Link to={third_item.link}>{third_item.linkText}</Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))
            : null}
          {/* Pages End */}
          {/* Social Media Start */}
          <li className="menu-section-title">Rețele sociale</li>
          <li className="menu-item">
            {" "}
            <Link to="#">
              {" "}
              <i className="flaticon-facebook" />
              Facebook
            </Link>{" "}
          </li>
          <li className="menu-item">
            {" "}
            <Link to="#">
              {" "}
              <i className="flaticon-instagram" /> Instagram{" "}
            </Link>{" "}
          </li>
          {/* Social Media End */}
        </ul>
      </div>
    );
  }
}

export default Mobilemenu;
