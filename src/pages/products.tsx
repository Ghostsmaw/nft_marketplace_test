import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";

import UsePagination from "../components/pageNumber";
import axios from "axios";
import { config } from "../components/include";
import Loader from "../components/loader";
import { Item, Collection } from "../components/interface";
import Template from "../components/Template";
import { Link } from "react-router-dom";
const Products = () => {
  const [filterContent, setFilterContent] = useState([] as any);
  const [productList, setProductList] = useState([] as any);

  //loading indicator controller
  const [loader, setLoader] = useState(false);

  //The first page upon loading
  let [page, setPage] = useState(1);

  //maximum item perpage
  const PER_PAGE = 5;

  //use custom pagination for the logic
  const dataList = UsePagination(filterContent, PER_PAGE);

  var pages = Array.from(Array(dataList.maxPage).keys()).map((i) => i + 1);

  const handleChange = (num: number) => {
    setPage(num);
    dataList.jump(num);
  };

  const [errors, setErrors] = useState({
    error_message: ""
  });
  const [search, setSearch] = useState({
    category: { title: "Mittaria Genesis", name: "mittaria-genesis" },
    filterText: "",
    rate2: "false",
    rate3: "false",
    rate4: "false",
    rate5: "false",
    min: 0,
    max: 1000
  });

  const [category, setCategory] = useState([
    { title: "Mittaria Genesis", name: "mittaria-genesis" },
    { title: "Cool Cats NFT", name: "cool-cats-nft" },
    { title: "Party Ape Billionaire", name: "billionaireclubnft" },
    { title: "Heaven Computer", name: "heavencomputer" },
    { title: "Elon", name: "elon-47" },
    { title: "Bored Mummy", name: "bored-mummy-waking-up" },
    { title: "President BNB", name: "president-bnb" },
    { title: "MidnightBreeze", name: "midnightbreeze" }
  ]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setSearch({ ...search, [name]: value });

    //filter product list base on name and store result on filter content
    if (value !== "") {
      const filteredItems = productList.filter((item: Item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );

      setFilterContent(filteredItems);
    } else {
      setFilterContent(productList);
    }
  };

  const handleFilter = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    //filter item here base on price
  };

  const handleRating = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;

    value = value === "false" ? "true" : "false";
    setSearch({ ...search, [name]: value });

    //Filter item here base on their rating
  };

  const handleAmount = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setSearch({ ...search, [name]: value });
  };

  const handleChangeCategory = (cat: Collection) => {
    setSearch({ ...search, category: cat });
    //fetch NFT base on collecton selected
    fetchProduct(cat.name);
  };

  const fetchCategory = async () => {
    //get list of collections from opensea
    let url = `https://api.opensea.io/v2/collection`;

    await axios
      .get(url, config)
      .then((result: any) => {
        if (Array.isArray(result.data.nfts) && result.data.nfts.length !== 0) {
          setCategory(result.data.nfts);
        }
      })
      .catch((error) => {
        setErrors({ ...errors, error_message: error.message });
      });
  };

  const fetchProduct = async (category: string) => {
    //get list 50 of nft under a particular collection
    setProductList([]);
    setFilterContent([]);
    setLoader(true);
    setErrors({ ...errors, error_message: "" });

    let url = `https://api.opensea.io/v2/collection/${category}/nfts?limit=50`;

    await axios
      .get(url, config)
      .then((result: any) => {
        if (Array.isArray(result.data.nfts) && result.data.nfts.length !== 0) {
          setProductList(result.data.nfts);
          setFilterContent(result.data.nfts);
        } else {
          setProductList([]);
          setFilterContent([]);
        }
      })
      .catch((error) => {
        setErrors({ ...errors, error_message: error.message });
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchProduct("mittaria-genesis");
  }, []);

  return (
    <Template name="">
      <section className="">
        <div className="container">
          <div className="row">
            {/* side bar start here  */}
            <div className="col-md-3">
              <button
                className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span>Show filter</span>
              </button>

              <div
                className="collapse card d-lg-block mb-5"
                id="navbarSupportedContent"
              >
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        Products Category
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          {category &&
                            category.map((item: Collection, id: number) => (
                              <li
                                onClick={() => handleChangeCategory(item)}
                                key={id}
                              >
                                <a
                                  href="#"
                                  className={
                                    search.category.name === item.name
                                      ? "text-dark"
                                      : ""
                                  }
                                >
                                  {item.title}{" "}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        Price
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseThree"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingThree"
                    >
                      <div className="accordion-body">
                        <div className="row mb-3">
                          <div className="col-6">
                            <p className="mb-0">Min Amount</p>
                            <div className="form-outline">
                              <input
                                type="number"
                                value={search.min}
                                onFocus={(e) => e.target.select()}
                                className="form-control"
                                name="min"
                                onChange={handleAmount}
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <p className="mb-0">Max Amount</p>
                            <div className="form-outline">
                              <input
                                type="number"
                                name="max"
                                value={search.max}
                                onFocus={(e) => e.target.select()}
                                onChange={handleAmount}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleFilter}
                          className="btn btn-white w-100 border border-secondary"
                        >
                          apply
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#panelsStayOpen-collapseFive"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFive"
                      >
                        Ratings
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseFive"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingThree"
                    >
                      <div className="accordion-body">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={handleRating}
                            value={search.rate5}
                            name="rate5"
                            checked={search.rate5 === "true" ? true : false}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-warning"></i>
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={handleRating}
                            value={search.rate4}
                            name="rate4"
                            checked={search.rate4 === "true" ? true : false}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-secondary"></i>
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={handleRating}
                            value={search.rate3}
                            name="rate3"
                            checked={search.rate3 === "true" ? true : false}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-secondary"></i>
                            <i className="fas fa-star text-secondary"></i>
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={handleRating}
                            value={search.rate2}
                            name="rate2"
                            checked={search.rate2 === "true" ? true : false}
                          />

                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-secondary"></i>
                            <i className="fas fa-star text-secondary"></i>
                            <i className="fas fa-star text-secondary"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content start here */}
            <div className="col-md-9">
              {errors.error_message ? (
                <div
                  className="alert alert-danger"
                  role="alert"
                  data-mdb-color="danger"
                >
                  <i
                    className="fas fa-times-circle me-3"
                    data-mdb-dismiss="alert"
                  ></i>
                  {errors.error_message}
                </div>
              ) : (
                ""
              )}

              <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                <strong className="d-block py-2">
                  {filterContent.length} Items found{" "}
                </strong>
                <div className="ms-auto">
                  <input
                    className="form-control form-control-lg"
                    onChange={handleSearch}
                    value={search.filterText}
                    name="filterText"
                    placeholder="Type to search..."
                  />
                </div>
              </header>

              <div className="row">
                {loader ? (
                  <Loader />
                ) : (
                  filterContent &&
                  dataList.currentData().map((item: Item, index: number) => (
                    <div
                      className="col-lg-4 col-md-6 col-sm-6 d-flex"
                      key={index}
                    >
                      <div className="card w-100 my-2 shadow-2-strong">
                        <img src={item.image_url} className="card-img-top" />
                        <div className="card-body d-flex flex-column">
                          <div className="d-flex flex-row">
                            <h5 className="mb-1 me-1 text-danger">
                              {"0.132 ETH"}
                            </h5>
                          </div>
                          <p className="card-text">{item.name}</p>
                          <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                            <Link
                              className="btn btn-primary shadow-0 me-1 btn-block "
                              to={`/assets/${item.contract}/${item.identifier}`}
                            >
                              <a>BUY NOW</a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Render pagination if there is item on the list */}
              {filterContent && filterContent.length !== 0 ? (
                <>
                  <hr />

                  <nav
                    aria-label="Page navigation example"
                    className="d-flex justify-content-center mt-3"
                  >
                    <ul className="pagination">
                      <li
                        className={
                          page === 1 ? " page-item disabled" : "page-item"
                        }
                      >
                        {" "}
                        <a
                          className="page-link"
                          href="#!"
                          onClick={(e) => handleChange(page - 1)}
                        >
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>

                      {pages.map((item: number, index: number) => (
                        <li
                          key={index}
                          className={
                            page === item ? " page-item  active" : "page-item "
                          }
                        >
                          <a
                            className="page-link"
                            href="#!"
                            onClick={(e) => handleChange(item)}
                          >
                            {item}
                          </a>
                        </li>
                      ))}

                      <li
                        className={
                          page === dataList.maxPage
                            ? " page-item disabled"
                            : "page-item"
                        }
                      >
                        <a
                          className="page-link"
                          href="#!"
                          onClick={(e) => handleChange(page + 1)}
                          aria-label="Next"
                        >
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </>
              ) : (
                []
              )}
            </div>
          </div>
        </div>
      </section>
    </Template>
  );
};

export default Products;
