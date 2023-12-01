/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavbar } from './Navbar.logic';
import { useMemo } from 'react';
import DropDown from '../DropDown/DropDown';

const Navbar = () => {
  const logic = useNavbar();

  const renderLogo = useMemo(
    () => (
      <Link to="/">
        <div className="nav-logo-container">
          <img src="icon.svg" alt="zkFlow" />
          <p>
            zk<strong>FLOW</strong>
          </p>
        </div>
      </Link>
    ),
    [],
  );

  const renderDropDown = useMemo(
    () => (
      <>
        <span>Current Blockchain</span>
        <DropDown onChange={logic.onDropDownChange} multiple={false} initialValues={[logic.currentBlockchain]} />
      </>
    ),
    [],
  );

  const renderMenu = useMemo(
    () => (
      <ul className="nav-ul">
        <li data-is-current-location={logic.isCurrentLocation('/')}>
          <Link to="/">Search</Link>
        </li>
        <li data-is-current-location={logic.isCurrentLocation('/overview')}>
          <Link to="/overview">Overview</Link>
        </li>
      </ul>
    ),
    [logic.currentRoute],
  );

  const renderMenuBtn = useMemo(
    () => (
      <div className="nav-menu-btn" onClick={logic.toggleMenu} data-is-open={logic.menuIsDisplay}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    ),
    [logic.menuIsDisplay],
  );

  return (
    <div className="nav-container">
      <div className="nav-content">
        <div className="nav-left">
          {renderLogo}
          {logic.menuIsDisplay && renderMenu}
        </div>
        {logic.menuIsDisplay && <div className="nav-right">{renderDropDown}</div>}
        {renderMenuBtn}
      </div>
    </div>
  );
};

export default Navbar;
