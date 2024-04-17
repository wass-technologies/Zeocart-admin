import React, { Fragment, useState, useContext } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P } from "../AbstractElements";
import { LoginId, Password, RememberPassword, SignIn } from "../Constant";

import { useNavigate } from "react-router-dom";

import CustomizerContext from "../_helper/Customizer";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";

const Signin = ({ selected }) => {
  const dispatch = useDispatch();
  const [loginId, setloginId] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);


  const loginAuth = async (e) => {
    e.preventDefault();
    if (loginidValid() || passwordValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(loginUser({ loginId: loginId, password: password, history, layoutURL }));
  };
  const loginidValid = () => {
    if (!loginId) {
      return "loginId is required";
    }
  }
  const passwordValid = () => {
    if (!password) {
      return "password is required";
    } else if (password.length < 8) {
      return "password must be longer than or equal to 8 characters";
    }
  }
  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Form className="theme-form">
                  <div className="sign-header">
                  <H4>{selected === "simpleLogin" ? "" : "Sign In With Admin Login"}</H4>
                  <P>{"Enter your loginId & password to login"}</P>
                  </div>
                  <FormGroup>
                    <Label className="col-form-label">{LoginId}</Label>
                    <Input className="form-control" type="text" placeholder="Enter login id" onChange={(e) => setloginId(e.target.value)} value={loginId} />
                    {submit && loginidValid() ? <span className='d-block font-danger'>{loginidValid()}</span> : ""}
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="position-relative">
                      <Input className="form-control" type={togglePassword ? "text" : "password"} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                    {submit && passwordValid() ? <span className='d-block font-danger'>{passwordValid()}</span> : ""}
                  </FormGroup>
                  <div className="position-relative form-group mb-0">
                    <Label className="d-flex justify-content-start align-items-center cursor-pointer w-11-r" >
                      <div className="m-r-10 cursor-pointer">
                        <input id="inline-form-1" className='cursor-pointer' type="checkbox" />
                      </div>
                      {RememberPassword}
                    </Label>
                  {/* <a className="link" href="#javascript">
                      {ForgotPassword}
                    </a> */}
                  <div className="d-flex justify-content-center align-items-center">
                    <Btn attrBtn={{ className: "d-flex justify-content-center align-items-center w-100 mt-2 log-butt", onClick: (e) => loginAuth(e) }}>{SignIn}</Btn>
                  </div>
              </div>
              {/* <OtherWay /> */}
            </Form>
          </div>
        </div>
      </Col>
    </Row>
      </Container >
  <ToastContainer />
    </Fragment >
  );
};

export default Signin;
