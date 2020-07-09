import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cifAU } from '@coreui/icons';
import fullLogo from '../assets/logo/imole-logo.png'
import miniLogo from '../assets/logo/apple-touch-icon.png'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <div className="nav-logo">
        <CSidebarBrand className="d-md-down-none bg-white" to="/">
          
            <CImg className="c-sidebar-brand-full" src={fullLogo} width="200px" height="80px" />

            <CImg className="c-sidebar-brand-minimized" src={miniLogo} width="40px" height="40px" />

            {/* <CIcon
              className="c-sidebar-brand-minimized"
              name="sygnet"
              height={35}
            /> */}
        </CSidebarBrand>
      </div>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
