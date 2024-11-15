import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Context } from "../../context/Context";

const Dasboard = () => {
  const [auth] = useContext(Context);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0 mr-0">
          <Breadcrumb className="title-page" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Crops</Breadcrumb.Item>
            <Breadcrumb.Item active>Home</Breadcrumb.Item>
          </Breadcrumb>
          <h4 className="title-page">BIENVENIDO A CROPS! {auth.first_name} {auth.last_name}</h4>
        </div>
      </div>
    </>
  );
};

export default Dasboard;
