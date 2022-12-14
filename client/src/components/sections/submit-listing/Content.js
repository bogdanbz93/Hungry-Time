import React, { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { createRestaurant } from "../../../actions/restaurant";
import Notiflix from "notiflix-react";

const Content = () => {
  // Redux
  const { auth } = useSelector(state => ({ ...state }));
  const { token } = auth;

  // Values for adding restaurant
  const [values, setValues] = useState({
    title: "",
    content: "",
    category: "",
    location: "",
    placeId: "",
    city: "",
    phone: "",
    email: "",
    logo: "",
    image: "",
    price: "",
    lat: "",
    lng: "",
    tables: "",
    options: "",
    ytVideo: "",
    website: "",
    glovo: "",
    foodpanda: "",
    tazz: ""
  });

  // Google React Autocomplete

  const [adress, setAdress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: 44.439663,
    lng: 26.096306
  });

  const searchOptions = {
    componentRestrictions: { country: ["ro"] }
  };

  const handleSelect = async (value, placeId) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    setAdress(value);
    setValues({ ...values, location: value, lat: ll.lat, lng: ll.lng, placeId: placeId });
    setCoordinates(ll);
  };

  // Rest of the code
  const [preview, setPreview] = useState("https://via.placeholder.com/280x220.png?text=IMAGINE");
  const [previewLogo, setPreviewLogo] = useState("https://via.placeholder.com/100x100.png?text=LOGO");
  const { title, content, category, location, placeId, city, logo, image, price, phone, email, lat, lng, tables, ytVideo, website, glovo, foodpanda, tazz } = values;

  const handleSubmit = async e => {
    e.preventDefault();
    let restaurantData = new FormData();
    restaurantData.append("title", title);
    restaurantData.append("content", content);
    restaurantData.append("category", category);
    restaurantData.append("location", location);
    restaurantData.append("placeId", placeId);
    restaurantData.append("city", city);
    logo && restaurantData.append("logo", logo);
    image && restaurantData.append("image", image);
    restaurantData.append("price", price);
    restaurantData.append("phone", phone);
    restaurantData.append("email", email);
    restaurantData.append("lat", lat);
    restaurantData.append("lng", lng);
    restaurantData.append("tables", tables);
    restaurantData.append("ytVideo", ytVideo);
    restaurantData.append("website", website);
    restaurantData.append("drinksMenu", JSON.stringify(inputList));
    restaurantData.append("foodMenu", JSON.stringify(inputList2));
    restaurantData.append("glovo", glovo);
    restaurantData.append("foodpanda", foodpanda);
    restaurantData.append("tazz", tazz);

    try {
      let res = await createRestaurant(token, restaurantData);
      console.log("restaurant create response ==== > ", res);
      Notiflix.Notify.Success("Restaurantul a fost ad??ugat cu succes.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      Notiflix.Report.Failure("Din p??cate nu a func??ionat..", err.response.data, "??ncearc?? din nou");
    }
  };

  const handleImageChange = e => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleLogoChange = e => {
    setPreviewLogo(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, logo: e.target.files[0] });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //// Food Menu
  const [inputList, setinputList] = useState([{ drinkName: "", drinkPrice: "", drinkDetails: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    e.preventDefault();
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = e => {
    e.preventDefault();
    let counter = inputList.length;
    if (inputList[counter - 1].drinkName === "" || inputList[counter - 1].drinkPrice === "" || inputList[counter - 1].drinkDetails === "") Notiflix.Notify.Failure("Trebuie sa completezi spatiul anterior!");
    else setinputList([...inputList, { drinkName: "", drinkPrice: "", drinkDetails: "" }]);
  };

  //// Food Menu ////
  const [inputList2, setinputList2] = useState([{ foodName: "", foodPrice: "", foodDetails: "" }]);

  // handle input change
  const handleInputChange2 = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList2];
    list[index][name] = value;
    setinputList2(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick2 = (e, index) => {
    e.preventDefault();
    const list = [...inputList2];
    list.splice(index, 1);
    setinputList2(list);
  };

  // handle click event of the Add button
  const handleAddClick2 = e => {
    e.preventDefault();
    let counter = inputList2.length;
    if (inputList2[counter - 1].foodName === "" || inputList2[counter - 1].foodPrice === "" || inputList2[counter - 1].foodDetails === "") Notiflix.Notify.Failure("Trebuie sa completezi spatiul anterior!");
    else setinputList2([...inputList2, { foodName: "", foodPrice: "", foodDetails: "" }]);
  };

  const [tab2, setTab2] = useState(true);
  const [tab3, setTab3] = useState(true);
  const [tab4, setTab4] = useState(true);
  const [tab5, setTab5] = useState(true);
  useEffect(() => {
    if (title && category && content && location && city && tables && price && email && phone) setTab2(false);
    else setTab2(true);
    if (image && logo) setTab4(false);
    else setTab4(true);
    if (location) setTab3(false);
    else setTab3(true);
    if (title && category && content && location && tables && price && email && phone && image && logo && JSON.stringify(inputList) !== '[{"drinkName":"","drinkPrice":"","drinkDetails":""}]' && JSON.stringify(inputList2) !== '[{"foodName":"","foodPrice":"","foodDetails":""}]') setTab5(false);
    else setTab5(true);
  }, [title, category, content, logo, image, location, city, tables, price, email, phone, inputList, inputList2]);

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <Tab.Container defaultActiveKey="tab1">
            {/* Tabs Start */}
            <div className="col-md-4">
              <Nav variant="tabs" className="nav nav-tabs tab-cards">
                <Nav.Item>
                  <Nav.Link eventKey="tab1">
                    <span>
                      {title && category && content && location && tables && price && email && phone ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <div className="spinner-grow spinner-grow-sm text-danger" role="status">
                          <span className="sr-only"></span>
                        </div>
                      )}
                    </span>{" "}
                    Informa??ii generale
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link disabled={tab2} eventKey="tab2">
                    <span>
                      {image ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <div className="spinner-grow spinner-grow-sm text-danger" role="status">
                          <span className="sr-only"></span>
                        </div>
                      )}
                    </span>{" "}
                    Imagini
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link disabled={tab3} eventKey="tab3">
                    <span>
                      {location ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <div className="spinner-grow spinner-grow-sm text-danger" role="status">
                          <span className="sr-only"></span>
                        </div>
                      )}
                    </span>{" "}
                    Loca??ie
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link disabled={tab4} eventKey="tab4">
                    <span>
                      {JSON.stringify(inputList) !== '[{"drinkName":"","drinkPrice":"","drinkDetails":""}]' && JSON.stringify(inputList2) !== '[{"foodName":"","foodPrice":"","foodDetails":""}]' ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <div className="spinner-grow spinner-grow-sm text-danger" role="status">
                          <span className="sr-only"></span>
                        </div>
                      )}
                    </span>{" "}
                    Meniul restaurantului
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link disabled={tab5} eventKey="tab5">
                    <span>
                      <i className="far fa-paper-plane"></i>
                    </span>{" "}
                    Platforme curierat
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            {/* Tabs End */}
            {/* Tab Content Start */}
            <div className="col-md-8">
              <form onSubmit={handleSubmit}>
                <Tab.Content className="m-0">
                  <Tab.Pane eventKey="tab1">
                    <div className="row">
                      <div className="cta cta-1 w-100 rounded-lg mx-3 mb-4">
                        <div className="row">
                          <div className="col-8">
                            <h3 className="mx-auto">Informa??ii ????</h3>
                          </div>
                          <div className="col-4">
                            <img className="mx-auto d-block mt-3 mb-4 my-n5" style={{ maxWidth: "130px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/bowl.svg"} alt="bowl" />
                          </div>
                        </div>
                      </div>
                      <div className="alert border mx-3 w-100" role="alert">
                        <i className="far fa-star mr-2"></i>
                        Toate c??mpurile marcate cu semnul <span className="text-danger">(*)</span> sunt obligatorii!
                      </div>

                      <div className="col-md-6 form-group">
                        <label>
                          <i className="fas fa-signature mr-2 text-info"></i> Numele restaurantului <span className="text-danger">*</span>
                        </label>
                        <input required type="text" onChange={handleChange} className="form-control" placeholder="Numele restaurantului" name="title" value={title} />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>
                          <i className="fas fa-list mr-2 text-info"></i> Categorie restaurant <span className="text-danger">*</span>
                        </label>
                        <select required className="form-control" name="category" value={category} onChange={handleChange}>
                          <option value="" defaultValue disabled hidden>
                            Alege o categorie
                          </option>
                          <option value="fastfood">Fast Food</option>
                          <option value="chinezesc">Chinezesc</option>
                          <option value="italienesc">Italienesc</option>
                          <option value="turcesc">Turcesc</option>
                          <option value="romanesc">Rom??nesc</option>
                          <option value="diversificat">Diversificat</option>
                        </select>
                      </div>
                      <div className="col-md-12 form-group">
                        <label>
                          <i className="fas fa-pen mr-2 text-info"></i> Descrierea restaurantului <span className="text-danger">*</span>
                        </label>
                        <textarea required name="content" value={content} onChange={handleChange} rows={7} className="form-control" placeholder="Descrie restaurantul t??u.." />
                      </div>

                      <div className="col-md-6">
                        <label>
                          <i className="fas fa-map-marked-alt mr-2 text-info"></i> Ora?? <span className="text-danger">*</span>
                        </label>
                        <select required className="form-control" name="city" value={city} onChange={handleChange}>
                          <option value="" defaultValue disabled hidden>
                            Alege ora??ul
                          </option>
                          <option value="constanta">Constan??a</option>
                          <option value="bucuresti">Bucure??ti</option>
                          <option value="braila">Br??ila</option>
                          <option value="cluj">Cluj-Napoca</option>
                          <option value="timisoara">Timi??oara</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label>
                          <i className="fas fa-map-marker-alt mr-2 text-info"></i> Adres?? complet?? <span className="text-danger">*</span>
                        </label>

                        <PlacesAutocomplete value={adress} onChange={setAdress} onSelect={handleSelect} searchOptions={searchOptions}>
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className="form-group">
                              <input
                                required
                                {...getInputProps({
                                  placeholder: "Caut?? loca??ii folosind Google Places..",
                                  className: "location-search-input form-control w-100"
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>??nc??rc??m...</div>}
                                {suggestions.map(suggestion => {
                                  const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                                  // inline style for demonstration purpose
                                  const style = suggestion.active ? { backgroundColor: "#e8e8e8", padding: "15px", borderRadius: "5px", cursor: "pointer" } : { backgroundColor: "#ffffff", cursor: "pointer", padding: "15px" };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style
                                      })}
                                      key={suggestion.placeId}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className="alert alert-info mt-3" role="alert">
                          <i className="fas fa-info-circle mr-2 text-info"></i>
                          Loca??ia folose??te serviciul Google Places{" "}
                          <a className="text-dark" href="https://www.google.com/business/" target="_blank" rel="noreferrer">
                            <b>
                              <i className="far fa-question-circle"></i>
                            </b>
                          </a>{" "}
                          pentru a v?? reda c??ut??rile automate. Dac?? o loca??ie nu exist?? sau apar probleme cu acest c??mp, v?? rug??m s?? ne contacta??i.
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label>
                          <i className="fas fa-book mr-2 text-info"></i> Locuri disponibile <span className="text-danger">*</span>
                        </label>
                        <input required type="number" onChange={handleChange} className="form-control" name="tables" value={tables} placeholder="ex. 15" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>
                          <i className="fas fa-money-bill-wave-alt mr-2 text-info"></i> Pre??ul unei rezerv??ri <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">RON</span>
                          </div>
                          <input required type="number" onChange={handleChange} className="form-control" name="price" value={price} placeholder="ex. 5 RON / rezervare mas??" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label>
                          <i className="fas fa-phone mr-2 text-info"></i> Num??r de telefon <span className="text-danger">*</span>
                        </label>
                        <input required type="phone" onChange={handleChange} className="form-control" name="phone" value={phone} placeholder="Telefonul restaurantului" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>
                          <i className="fas fa-envelope mr-2 text-info"></i> Adres?? de email <span className="text-danger">*</span>
                        </label>
                        <input required type="email" onChange={handleChange} className="form-control" name="email" value={email} placeholder="ex. contact@bistro45.ro" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>
                          <i className="fas fa-external-link-square-alt mr-2 text-info"></i> Website
                        </label>
                        <input type="url" onChange={handleChange} className="form-control" name="website" value={website} placeholder="ex. www.univ-ovidius.ro" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>
                          <i className="fab fa-youtube mr-2 text-info"></i> Videoclip prezentare Youtube
                        </label>
                        <input type="url" onChange={handleChange} className="form-control" name="ytVideo" value={ytVideo} placeholder="ex. https://www.youtube.com/watch?v=KWVJTRWILjU" />
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab2">
                    <div className="row">
                      <div className="cta cta-1 w-100 rounded-lg mx-3 mb-4">
                        <div className="row">
                          <div className="col-8">
                            <h3 className="mx-auto">Imagine</h3>
                          </div>
                          <div className="col-4">
                            <img className="mx-auto d-block mt-3 mb-4 my-n5" style={{ maxWidth: "130px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/noodles.svg"} alt="noodles" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="alert border w-100" role="alert">
                      <i className="far fa-star mr-2"></i>
                      Toate c??mpurile marcate cu semnul <span className="text-danger">(*)</span> sunt obligatorii!
                    </div>
                    <div className="form-group">
                      <label className="mb-0">
                        <i className="fas fa-camera mr-2"></i> <b>Logo-ul restaurantului</b> <span className="text-danger">*</span>
                      </label>
                      <br />
                      <small>Ad??uga??i o imagine ??n format .jpg sau .png cu sigla restaurantului dumneavoastr??.</small>
                      <div className="custom-file mt-3">
                        <input type="file" name="logo" onChange={handleLogoChange} className="custom-file-input" id="propertyImage" acccept="image/*" />
                        <label className="custom-file-label" htmlFor="propertyImage">
                          Adaug?? un fi??ier
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="mb-0">
                        <i className="fas fa-image mr-2"></i> <b>Imagine restaurant</b> <span className="text-danger">*</span>
                      </label>
                      <br />
                      <small>Ad??uga??i o imagine ??n format .jpg sau .png cu o imagine a restaurantului dumneavoastr?? din exterior. A??adar, clientul poate g??si mult mai rapid loca??ia acestuia.</small>
                      <div className="custom-file mt-3">
                        <input type="file" name="image" onChange={handleImageChange} className="custom-file-input" id="propertyImage" acccept="image/*" />
                        <label className="custom-file-label" htmlFor="propertyImage">
                          Adaug?? un fi??ier
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="cta cta-1 w-100 rounded-lg mx-3 mb-4">
                        <div className="row">
                          <div className="col-8">
                            <h3 className="mx-auto">Previzualizare</h3>
                          </div>
                          <div className="col-4">
                            <img className="mx-auto d-block mt-3 mb-4 my-n5" style={{ maxWidth: "130px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/cake.svg"} alt="cake" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3 border mx-1 mb-5 px-4 py-5 rounded-lg">
                      <div className="col-xl-5" style={{ overflow: "hidden" }}>
                        <img src={preview} alt="previewImg" style={{ width: "380px", height: "220px" }} className="img img-fluid rounded-lg" />
                      </div>
                      <div className="col-12 col-xl-7">
                        <img src={previewLogo} alt="previewLogo" style={{ maxHeight: "50px" }} className="img img-fluid rounded-lg mt-3" />
                        <h5 className="post-title mt-4 mb-2"> Restaurantul t??u - previzualizare</h5>
                        <p className="post-text">??n st??nga acestui card este imaginea reprezentativ?? a restaurantului dumneavoastr??.</p>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab3">
                    <div className="row">
                      <div className="cta cta-1 w-100 rounded-lg mx-3 mb-4">
                        <div className="row">
                          <div className="col-8">
                            <img className="" style={{ maxWidth: "180px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/google_maps.svg"} alt="googlemaps" />
                          </div>
                          <div className="col-4">
                            <img className="mx-auto d-block mt-3 mb-4 my-n5" style={{ maxWidth: "130px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/gyoza.svg"} alt="gyoza" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-light rounded">
                      <iframe title="ytVideo" className="rounded" style={{ width: "100%" }} height={500} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src={`https://maps.google.com/maps?q=` + coordinates.lat + `,` + coordinates.lng + `&hl=ro&z=17&output=embed`}></iframe>
                      <span className="acr-form-notice">
                        Pentru a modifica loca??ia restaurantului reveni??i la <b>pasul anterior</b>. Loca??ia prestabilit?? ??n acest pas este ora??ul Bucure??ti.{" "}
                      </span>
                      <p className="bg-white p-3 mt-4 rounded-lg shadow">Aceasta este o previzualizare a loca??iei restaurantului dumneavoastr?? pe Google Maps. Dac?? aceasta nu corespunde cu loca??ia real??, v?? rug??m s?? reveni??i la pasul anterior ??i s?? modifica??i loca??ia. Aceste detalii sunt extrase din Google Places, a??adar, dac?? restaurantul nu exist?? pe Google Places, nici aici nu va fi afi??at??, ??ns?? pute??i l??sa doar adresa.</p>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab4">
                    <div className="row">
                      <div className="cta cta-1 w-100 rounded-lg mx-3 mb-4">
                        <div className="row">
                          <div className="col-8">
                            <h3 className="mx-auto">B??uturi</h3>
                          </div>
                          <div className="col-4">
                            <img className="mx-auto d-block mt-3 mb-4 my-n5" style={{ maxWidth: "130px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/frappe.svg"} alt="frappe" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="Drink">
                      {inputList.map((x, i) => {
                        return (
                          <div key={`d${i}`}>
                            <div key={i} className="form-inline mb-3">
                              <div className="row w-100 ml-1">
                                <div className="col-6">
                                  <input key={`d${i}`} className="form-control w-100" name="drinkName" placeholder="Numele produsului" value={x.drinkName} onChange={e => handleInputChange(e, i)} />
                                </div>
                                <div className="col-6">
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">RON</span>
                                    </div>
                                    <input type="number" key={`d${i}`} className="form-control" name="drinkPrice" placeholder="Pre??" value={x.drinkPrice} onChange={e => handleInputChange(e, i)} />
                                  </div>
                                </div>
                                <div className="col-12">
                                  <input key={`d${i}`} className="form-control w-100 my-3" name="drinkDetails" placeholder="Detaliile produsului" value={x.drinkDetails} onChange={e => handleInputChange(e, i)} />
                                </div>
                              </div>

                              <div key={`d${i}`} className="row w-100 ml-1">
                                <div className="col-12">
                                  {inputList.length !== 1 && (
                                    <button className="btn btn-custom danger mr-3" onClick={e => handleRemoveClick(e, i)}>
                                      ??terge din list??
                                    </button>
                                  )}
                                  {inputList.length - 1 === i && (
                                    <button className="btn btn-custom secondary" onClick={handleAddClick}>
                                      Adaug?? alt produs
                                    </button>
                                  )}
                                  <hr />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* M??ncare */}
                    <div className="row mt-3">
                      <div className="cta cta-1 w-100 rounded-lg mx-3 mb-4">
                        <div className="row">
                          <div className="col-8">
                            <h3 className="mx-auto">M??ncare</h3>
                          </div>
                          <div className="col-4">
                            <img className="mx-auto d-block mt-3 mb-4 my-n5" style={{ maxWidth: "130px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/pizza.svg"} alt="pizza" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Food">
                      {inputList2.map((x, i) => {
                        return (
                          <div key={`f${i}`}>
                            <div key={i} className="form-inline mb-3">
                              <div className="row w-100 ml-1">
                                <div className="col-6">
                                  <input key={`f${i}`} className="form-control w-100" name="foodName" placeholder="Numele produsului" value={x.foodName} onChange={e => handleInputChange2(e, i)} />
                                </div>
                                <div className="col-6">
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">RON</span>
                                    </div>
                                    <input type="number" key={`f${i}`} className="form-control" name="foodPrice" placeholder="Pre??" value={x.foodPrice} onChange={e => handleInputChange2(e, i)} />
                                  </div>
                                </div>
                                <div className="col-12">
                                  <input key={`f${i}`} className="form-control w-100 my-3" name="foodDetails" placeholder="Detaliile produsului" value={x.foodDetails} onChange={e => handleInputChange2(e, i)} />
                                </div>
                              </div>

                              <div key={`f${i}`} className="row w-100 ml-1">
                                <div className="col-12">
                                  {inputList2.length !== 1 && (
                                    <button className="btn btn-custom danger mr-3" onClick={e => handleRemoveClick2(e, i)}>
                                      ??terge din list??
                                    </button>
                                  )}
                                  {inputList2.length - 1 === i && (
                                    <button className="btn btn-custom secondary" onClick={handleAddClick2}>
                                      Adaug?? alt produs
                                    </button>
                                  )}
                                  <hr />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab5">
                    <div className="row">
                      <div className="cta cta-1 w-100 rounded-lg mx-3 mb-4">
                        <div className="row">
                          <div className="col-8">
                            <h3 className="mx-auto">Curierat</h3>
                          </div>
                          <div className="col-4">
                            <img className="mx-auto d-block mt-3 mb-4 my-n5" style={{ maxWidth: "130px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/teapot.svg"} alt="tea" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-6 form-group">
                        <img className="d-block mb-3" style={{ height: "40px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/glovo.svg"} alt="glovo" />
                        <input type="url" onChange={handleChange} className="form-control" placeholder="Adresa (link) al restaurantului" name="glovo" value={glovo} />
                      </div>
                      <div className="col-md-6 form-group">
                        <img className="d-block mb-3" style={{ height: "40px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/foodpanda.svg"} alt="foodpanda" />
                        <input type="url" onChange={handleChange} className="form-control" placeholder="Adresa (link) al restaurantului" name="foodpanda" value={foodpanda} />
                      </div>
                      <div className="col-md-12 form-group">
                        <img className="d-block my-3" style={{ width: "180px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/tazz.svg"} alt="tazz" />
                        <input type="url" onChange={handleChange} className="form-control" placeholder="Adresa (link) al restaurantului" name="tazz" value={tazz} />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input required type="checkbox" className="custom-control-input" id="termsAndConditions" />
                        <label className="custom-control-label" htmlFor="termsAndConditions">
                          Sunt de acord cu regulamentul aplica??iei. Toate datele introduse sunt reale ??i verificate.
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn-custom" name="submit">
                      Public?? restaurantul t??u
                    </button>
                  </Tab.Pane>
                </Tab.Content>
              </form>
            </div>
          </Tab.Container>
          {/* Tab Content End */}
        </div>
      </div>
    </div>
  );
};

export default Content;
