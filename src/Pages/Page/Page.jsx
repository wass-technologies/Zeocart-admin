import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Col, Card, Table } from 'reactstrap';
import { Edit } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getPage } from '../../store/pagesSlice';
import CustomizerContext from '../../_helper/Customizer';

const PageTable = () => {
  const storeVar = useSelector(state => state.page)
  const dispatch = useDispatch();
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    status: 'ACTIVE',
    pageId: null,
  });

  useEffect(() => {
    dispatch(getPage(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);

  const navigate = (id,title) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, pageId: id }))
    history(`${process.env.PUBLIC_URL}/edit-page/` + layoutURL + '?id=' + id+'&title='+title)
  }
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <div className='table-responsive'>
            <Table hover={true} className='table-border-horizontal table-light'>
              <thead>
                <tr>
                  <th scope='col'>Sl.No</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.pageData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.title}</td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-primary font-primary action-icon'>
                          <Edit onClick={(e) => navigate(item.id,item.title)} />
                          <div className="tooltipCustom">Edit</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Col>

    </Fragment>
  );
};

export default PageTable;
