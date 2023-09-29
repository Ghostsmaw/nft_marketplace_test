import React from "react";
import { Link } from "react-router-dom";

const Header = (props: { name?: string }) => {
  return (
    <header>
      <div className="p-3 text-center bg-white border-bottom">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-2 col-sm-4 col-4">
              <a href="/" className="float-start bold text-dark f-16">
                <img
                  src="https://opensea.io/static/images/logos/opensea-logo.svg"
                  height="35"
                />{" "}
                CloseSea
              </a>
            </div>

            <div className="col-lg-10 col-lg-5 col-sm-8 col-8">
              <div className="d-flex float-end">
                <a
                  href="#!"
                  className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                >
                  <i className="fas fa-user-alt m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">Sign in with Google</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary mb-4">
        <div className="container py-4">
          <h3 className="text-white mt-2">CloseSea NFT's</h3>

          <nav className="d-flex mb-2">
            <h6 className="mb-0">
              <Link to="/" className="text-white-50">
                <a>Home</a>
              </Link>
              <span className="text-white-50 mx-2"> {">"}</span>
              <a href="#!" className="text-white">
                <u>{props.name}</u>
              </a>
            </h6>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
