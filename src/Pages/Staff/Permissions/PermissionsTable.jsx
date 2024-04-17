import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment'
import { useLocation } from "react-router-dom";
import { getStaffById, updateStaffPermission } from '../../../store/staffSlice';
import PermissionsCheckboxList from '../../../Components/UserPermission/UserPermission';

const PermissionsTable = () => {
  const storeVar = useSelector(state => state.staff)
  const dispatch = useDispatch();
  const location = useLocation();
  // const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    staffId:null,
    dtat: [],
  });

  useEffect(() => {
    const staffId = new URLSearchParams(location.search).get('id');
    if (staffId) {
      setFormVar((prevFormVar) => ({ ...prevFormVar, staffId: staffId }))
      dispatch(getStaffById(staffId))
    }
  }, []);
  const updatePermissionStatus = (permissionId, menuId) => {

  };
  const update = (data) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, data: data }))
  }

  const submitPermission = () => {
    dispatch(updateStaffPermission({id:formVar.staffId,menu:formVar.data?.length>0?formVar.data:storeVar.permissionData}))

  }

  //   let curr = new Date();
  //   curr.setDate(curr.getDate());
  //   let date = curr.toISOString().substring(0, 10);
  // console.log({date,moment:moment().format("YYYY-MM-DD")});
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <div className='table-responsive'>
            {
              storeVar.permissionData?.length > 0 && (
                <PermissionsCheckboxList perms={storeVar.permissionData} updatePermissionStatus={updatePermissionStatus} update={update} />
              )
            }
            <div className='d-flex justify-content-center p-4'>
              <Btn attrBtn={{ color: 'primary', onClick: submitPermission }}>Save Changes</Btn>
            </div>
          </div>
        </Card>

      </Col>
    </Fragment>
  );
};

export default PermissionsTable;
