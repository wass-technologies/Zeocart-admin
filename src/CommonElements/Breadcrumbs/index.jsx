import React, { Fragment, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import H3 from '../Headings/H3Element';
import CustomizerContext from '../../_helper/Customizer';
import SvgIcon from '../../Components/Common/Component/SvgIcon';

const Breadcrumbs = (props) => {
  const { layoutURL } = useContext(CustomizerContext);
  return (
    <Fragment>
      <Container fluid={true}>
        <div className='page-title'>
          <Row>
            <Col xs='6'>
              <H3>{props.mainTitle}</H3>
            </Col>
            <Col xs='6'>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link to={`${process.env.PUBLIC_URL}/dashboard/social/${layoutURL}`}>
                    <SvgIcon iconId='stroke-home' />
                  </Link>
                </li>
                <li className={props.subParent?'breadcrumb-item':'breadcrumb-item active'}>{props.parent}</li>
                {props.subParent ? <li className={props.subParent2?'breadcrumb-item':'breadcrumb-item active'}>{props.subParent}</li> : ''}
                {props.subParent2 ? <li className='breadcrumb-item active'>{props.subParent2}</li> : ''}
                {props.title ? <li className='breadcrumb-item active'>{props.title}</li> : ''}
              </ol>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Breadcrumbs;
