import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "react-feather";

import { LI, UL, P } from "../../../AbstractElements";
// import CustomizerContext from "../../../_helper/Customizer";
import { LogOut } from "../../../Constant";
import { profileAvtar } from "../../../Data/svgIcons";

const UserHeader = () => {
  const history = useNavigate();
  const [name, setName] = useState("Admin");
  const [roles, setRoles] = useState("ADMIN");
  // const { layoutURL } = useContext(CustomizerContext);
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));

  useEffect(() => {
    setName(localStorage.getItem("Name") ? localStorage.getItem("Name") : name);
    setRoles(localStorage.getItem("roles") ? localStorage.getItem("roles") : roles);
  }, []);

  const Logout = () => {
    localStorage.removeItem("profileURL");
    localStorage.removeItem("token");
    localStorage.removeItem("auth0_profile");
    localStorage.removeItem("Name");
    localStorage.removeItem("accessToken");
    localStorage.setItem("authenticated", false);
    localStorage.setItem("login", false);
    history(`${process.env.PUBLIC_URL}/login`);
  };

  return (
    <li className="profile-nav onhover-dropdown pe-0 py-0">
      <div className="media profile-media d-flex align-center">
        {/* <Image
          attrImage={{
            className: "b-r-10 m-0",
            // src: `${authenticated ? auth0_profile.picture : profile}`,
            src: `${authenticated ? man : man}`,
            alt: "",
          }}
          /> */}
          {profileAvtar}
        <div className="media-body">
          {/* <span>{authenticated ? auth0_profile.name : name}</span> */}
          <span>{authenticated ? name : name}</span>
          <P attrPara={{ className: "mb-0 font-roboto" }}>
            {roles} <i className="middle fa fa-angle-down"></i>
          </P>
        </div>
      </div>
      <UL attrUL={{ className: "simple-list profile-dropdown onhover-show-div" }}>
        {/* <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/users/profile/${layoutURL}`),
          }}>
          <User />
          <span>{Account} </span>
        </LI> */}
        
        <LI attrLI={{ onClick: Logout }}>
          <LogIn />
          <span>{LogOut}</span>
        </LI>
      </UL>
    </li>
  );
};

export default UserHeader;
