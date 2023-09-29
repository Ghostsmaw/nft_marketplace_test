import React from "react";
import Header from "./header";
import Footer from "./footer";

const Template = (props: { children?: React.ReactNode; name?: string }) => {
  return (
    <>
      <Header name={props.name} />

      {props.children}

      <Footer />
    </>
  );
};

export default Template;
