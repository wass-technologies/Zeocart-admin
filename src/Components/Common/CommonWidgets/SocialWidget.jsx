import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { H5 } from '../../../AbstractElements';
import RadialChart from './RadialChart';
import { dispatched, twitter, returnbox, product, neworder, category } from '../../../Data/svgIcons';

const SocialWidget = (props) => {
  const num=props.increment?props.increment:0
  // const num=props.increment?props.increment:0

  const chart = {
    color: ["#FFA941"], 
    series: [num]
  };

  return (
    <Card className='social-widget widget-hover'>
      <CardBody>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center gap-2'>
            {/* <div className='social-icons'>
              {props.title === 'Total Category' && (<>{category}</>)}
              {props.title === 'Orders Delivered' && (<>{returnbox}</>)}
              {props.title === 'Orders Dispatched' && (<>{dispatched}</>)}
              {props.title === 'Orders Returned' && (<>{returnbox}</>)}
              {props.title === 'Total Product' && (<>{product}</>)}
              {props.title === 'Total Orders' && (<>{neworder}</>)}
            </div> */}
            <span>{props.title}</span>
          </div>
          {/* <span className='font-success f-12 d-xxl-block d-xl-none'>+{props.data}%</span> */}
        </div>
        <div className='social-content'>
          <div>
            <H5 attrH5={{ className: 'mb-1' }}>{props?.data}</H5>
            <p></p>
            {/* <span className='f-light'>{props.title}</span> */}
          </div>
          <div className='social-chart'>
            {/* <H5 attrH5={{ className: 'mb-1' }}>{props.data}</H5> */}

            {/* <RadialChart chartData={chart} /> */}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SocialWidget;
