import React, { Fragment, useEffect, useState } from "react";
import { Btn, H4 } from "../../../AbstractElements";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Row, Col, CardHeader, CardBody, CardFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { EditProfile, UpdateProfile, Address, EmailAddress } from '../../../Constant';
import { getUserById } from "../../../store/userSlice";
import moment from "moment";

const EditMyProfile = () => {
    const storeVar = useSelector(state => state.users)
    const dispatch = useDispatch();
    const location = useLocation();
    const [formVar, setFormVar] = useState({
        submit: false,
        name: storeVar.name,
        email: storeVar.email,
        phoneNumber: storeVar.phoneNumber,
        address: '',
        age: '',
        dob: '',
        gender: '',
        pincode: '',
        doctorDetailId: '',

    });

    useEffect(() => {
        const userId = new URLSearchParams(location.search).get('id');
        if (userId) {
            dispatch(getUserById(userId))
        }
    }, [])
    const handleChangeDob = (e) => {
        setFormVar((prevFormVar) => ({ ...prevFormVar, dob: e.target.value }))
        calculate_age(e.target.value)
    }
    const handleSubmit = () => {
        console.log(formVar);
        console.log(storeVar);
    }
    const calculate_age = (dob) => {
        const birthDate = new Date(dob);
        const difference = Date.now() - birthDate.getTime();
        const age = new Date(difference);
        const y = Math.abs(age.getUTCFullYear() - 1970);
        const m = age.getUTCMonth()+ ' M'
        console.log({ y, m });
        const currentAge= y===0?m:y + ' Y' 
        setFormVar((prevFormVar) => ({ ...prevFormVar, age:currentAge }))
    }
    const nameValid = () => {

    }
    const emailValid = () => {

    }
    const phoneValid = () => {

    }
    const dobValid = () => {
        if (!formVar.dob) {
            return 'Please enter dob'
        }
    }
    const addressValid = () => {

    }
    return (
        <Fragment>
            <Form className="card">
                <CardHeader>
                    <H4 attrH4={{ className: "card-title mb-0" }}>{EditProfile}</H4>
                    <div className="card-options">
                        <a className="card-options-collapse" href="#javascript">
                            <i className="fe fe-chevron-up"></i>
                        </a>
                        <a className="card-options-remove" href="#javascript">
                            <i className="fe fe-x"></i>
                        </a>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col sm="6" md="6">
                            <FormGroup className="mb-3"> <Label className="form-label">Name</Label>
                                <Input className="form-control" type="text" placeholder="Name" value={storeVar.name}
                                    onChange={(e) => ({ ...storeVar, name: e.target.value })} />
                                {/* onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, name: e.target.value }))} /> */}
                                {formVar.submit && nameValid() ? <span className='d-block font-danger'>{nameValid()}</span> : ""}
                            </FormGroup>
                        </Col>

                        <Col sm="6" md="6">
                            <FormGroup> <Label className="form-label">{EmailAddress}</Label>
                                <Input className="form-control" type="email" placeholder="Email" value={storeVar.email}
                                    onChange={(e) => [{ ...storeVar, email: e.target.value }]} />
                                {/* onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, email: e.target.value }))} /> */}
                                {formVar.submit && emailValid() ? <span className='d-block font-danger'>{emailValid()}</span> : ""}
                            </FormGroup>
                        </Col>
                        <Col sm="6" md="6">
                            <FormGroup><Label className="form-label">Phone Number</Label>
                                <Input className="form-control" type="text" placeholder="Phone Number" defaultValue={storeVar.phoneNumber}
                                    onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, phoneNumber: e.target.value }))} />
                                {formVar.submit && phoneValid() ? <span className='d-block font-danger'>{phoneValid()}</span> : ""}
                            </FormGroup>
                        </Col>
                        <Col sm="6" md="4">
                            <FormGroup><Label className="form-label">Dob</Label>
                                <Input className="form-control" type="date" placeholder="Dob" defaultValue={storeVar.dob}
                                    onChange={(e) => handleChangeDob(e)} max={moment().format("DD-MM-YYYY")} />
                                {formVar.submit && dobValid() ? <span className='d-block font-danger'>{dobValid()}</span> : ""}
                            </FormGroup>
                        </Col>
                        <Col sm="6" md="2">
                            <FormGroup><Label className="form-label">Age</Label>
                                <Input className="form-control" type="text" placeholder="Age" disabled
                                    value={formVar.age ? formVar.age : storeVar.age} onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, age: e.target.value }))} />
                                {formVar.submit && dobValid() ? <span className='d-block font-danger'>{dobValid()}</span> : ""}
                            </FormGroup>
                        </Col>
                        <Col sm="6" md="6">
                            <FormGroup><Label className="form-label">{Address}</Label>
                                <Input className="form-control" type="text" placeholder="Home Address"
                                    value={storeVar.address} onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, address: e.target.value }))} />
                                {formVar.submit && addressValid() ? <span className='d-block font-danger'>{addressValid()}</span> : ""}
                            </FormGroup>
                        </Col>
                        <Col sm="6" md="6">
                            <FormGroup><Label className="form-label">Gender</Label>
                                <Input className="form-control " name="select" type="select"
                                    value={formVar.gender} onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, gender: e.target.value }))}>
                                    <option value='MALE'>MALE</option>
                                    <option value='FEMALE'>FEMALE</option>
                                    <option value='OTHER'>OTHER</option>
                                    <option value='ALL'>ALL</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        {/* <Col md="5">
                            <FormGroup><Label className="form-label">State</Label>
                                <Input type="select" name="select" className="form-control btn-square">
                                    {UsersCountryMenu.map((items, i) =>
                                        <option key={i}>{items}</option>
                                    )}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col sm="6" md="4">
                            <FormGroup> <Label className="form-label">{City}</Label>
                                <Input className="form-control" type="text" placeholder="City" {...register("City", { required: true })} />
                                <span style={{ color: "red" }}>{errors.City && 'City is required'} </span>
                            </FormGroup>
                        </Col>
                        <Col sm="6" md="3">
                            <FormGroup><Label className="form-label">{PostalCode}</Label>
                                <Input className="form-control" type="number" placeholder="ZIP Code" />
                            </FormGroup>
                        </Col>

                        <Col md="12">
                            <div> <Label className="form-label">{AboutMe}</Label>
                                <Input type="textarea" className="form-control" rows="5" placeholder="Enter About your description" />
                            </div>
                        </Col> */}
                    </Row>
                </CardBody>
                <CardFooter className="text-end">
                    <Btn attrBtn={{ color: "primary", onClick: handleSubmit }} >{UpdateProfile}</Btn>
                </CardFooter>
            </Form>
        </Fragment>
    )
}
export default EditMyProfile