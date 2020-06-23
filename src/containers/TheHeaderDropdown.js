import React, {useState} from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  Redirect
} from 'react-router-dom'

const TheHeaderDropdown = (user) => {

  const [logOut, setLogout] = useState(false);
    let loggedUser = user.user.userInfo;

    if (!loggedUser) {
        loggedUser = JSON.parse(localStorage.getItem('user'));
    }

    if (logOut) {
        console.log('Effettuo logout dallo header');

        localStorage.removeItem('sessionToken');
        user.user.setLogged(false);
        setLogout(false);

        return (
            <div>
                <Redirect to='/' />
            </div>
        )
    }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/100.png'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Impostazioni</strong>
        </CDropdownItem>
          <CDropdownItem>
            <CLink to='/userInfo'>
              <CIcon name="cil-user" className="mfe-2" /> {loggedUser.name} {loggedUser.surname}
            </CLink>
          </CDropdownItem>
        <CDropdownItem onClick={e => setLogout(true)}>
          <CIcon name="cil-lock-locked" className="mfe-2" /> 
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
