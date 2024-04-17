import React, { useContext } from 'react';
import { Grid } from 'react-feather';
import { Link } from 'react-router-dom';
import { Image } from '../../AbstractElements';
import CubaIcon from '../../assets/images/logo/zeocart_bl.png';
import logoblogo from '../../assets/images/logo/zeocart_white.png';
import CustomizerContext from '../../_helper/Customizer';

const SidebarLogo = () => {
  const { mixLayout, toggleSidebar, toggleIcon, layout, layoutURL } = useContext(CustomizerContext);

  const openCloseSidebar = () => {
    toggleSidebar(!toggleIcon);
  };

  const layout1 = localStorage.getItem("sidebar_layout") || layout;

  return (
    <div className='logo-wrapper'>
      {layout1 !== 'compact-wrapper dark-sidebar' && layout1 !== 'compact-wrapper color-sidebar' && mixLayout ? (
        <Link to={`${process.env.PUBLIC_URL}/dashboard/social/${layoutURL}`}>
          <Image attrImage={{ className: 'img-fluid d-inline', src: `${CubaIcon}`, alt: '' }} />
        </Link>
      ) : (
        <Link to={`${process.env.PUBLIC_URL}/dashboard/social/${layoutURL}`}>
          <Image attrImage={{ className: 'img-fluid d-inline', src: `${CubaIcon}`, alt: '' }} />
          {/* <Image attrImage={{ className: 'img-fluid d-inline', src: `${require('../../assets/images/logo/zeocart_white.png')}`, alt: '' }} /> */}
        </Link>
      )}
      <div className='back-btn' onClick={() => openCloseSidebar()}>
        <i className='fa fa-angle-left'></i>
      </div>
      <div className='toggle-sidebar' onClick={openCloseSidebar}>
        <Grid className='status_toggle middle sidebar-toggle' />
      </div>
    </div>
  );
};

export default SidebarLogo;
