import React, { useEffect, useState } from "react";
import Template from "../components/Template";
import { useParams } from "react-router";
import axios from "axios";
import { config } from "../components/include";
import Loader from "../components/loader";
import { Item } from "../components/interface";
const Details = () => {
  let params = useParams();
  const [errors, setErrors] = useState({
    error_message: ""
  });

  const [productList, setProductList] = useState({} as Item);
  const [loader, setLoader] = useState(false);

  const fetchProduct = async () => {
    setProductList({} as Item);
    setLoader(true);
    setErrors({ ...errors, error_message: "" });

    let url = `https://api.opensea.io/api/v1/asset/${params.contract}/${params.token_id}/`;

    await axios
      .get(url, config)
      .then((result: any) => {
        if (result.data.length !== 0) {
          setProductList(result.data);
        } else {
          setProductList({} as Item);
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
    fetchProduct();
  }, []);

  return (
    <Template name={productList.name}>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
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

          {loader ? <Loader /> : []}
          {productList ? (
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6">
                <img
                  className="card-img-top mb-5 mb-md-0"
                  src={productList.image_url}
                />
              </div>
              <div className="col-md-6">
                <div className="small mb-1"> {productList.token_id}</div>
                <h1 className="display-5 fw-bolder">{productList.name}</h1>
                <div className="fs-5 mb-5">
                  {productList.asset_contract?.seller_fee_basis_points ? (
                    <span className="text-danger">
                      {Number(
                        productList.asset_contract?.seller_fee_basis_points
                      ).toFixed(2)}{" "}
                      USD{" "}
                    </span>
                  ) : (
                    []
                  )}
                </div>
                <p className="lead">{productList.description}</p>
              </div>
            </div>
          ) : (
            []
          )}
        </div>
      </section>
    </Template>
  );
};

export default Details;
