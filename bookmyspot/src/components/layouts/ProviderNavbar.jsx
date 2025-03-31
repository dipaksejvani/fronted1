import React from "react";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import { Link } from "react-router-dom";
import { 
  FaBell, 
  FaEnvelope, 
  FaSearch, 
  FaSignOutAlt, 
  FaUser, 
  FaCog
} from "react-icons/fa";

export const ProviderNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="app-header navbar navbar-expand bg-white shadow-sm">
      <div className="container-fluid">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="nav-link btn btn-light"
              role="button"
              style={{
                color: "black",
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={toggleSidebar}
            >
              <img src={hamburgermenu} alt="Menu" style={{height:"25px",width:"25px"}}/>
            </button>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link to="/provider/events" className="nav-link">
              Events
            </Link>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link to="/provider/bookings" className="nav-link">
              Bookings
            </Link>
          </li>
        </ul>

        {/* Search form */}
        <form className="d-flex d-none d-md-flex mx-auto" style={{maxWidth: "400px"}}>
          <div className="input-group">
            <input 
              className="form-control border-end-0" 
              type="search" 
              placeholder="Search events, bookings..." 
              aria-label="Search" 
            />
            <button className="btn btn-outline-secondary border-start-0" type="submit">
              <FaSearch />
            </button>
          </div>
        </form>

        {/* Right navbar links */}
        <ul className="navbar-nav ms-auto">
          {/* Messages Dropdown Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-bs-toggle="dropdown" href="#">
              <FaEnvelope className="text-muted" />
              <span className="position-absolute top-5 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: "0.5rem", marginTop: "-5px", marginLeft: "-10px"}}>
                3
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <a href="#" className="dropdown-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar avatar-sm bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: "40px", height: "40px"}}>
                      <span className="text-white fw-bold">RS</span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="dropdown-item-title mb-0">
                      Rajesh Sharma
                      <span className="float-end text-sm text-danger"><i className="fas fa-star"></i></span>
                    </h6>
                    <p className="text-sm text-muted mb-0">About Corporate Conference...</p>
                    <p className="text-sm text-muted mb-0"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar avatar-sm bg-success rounded-circle d-flex align-items-center justify-content-center" style={{width: "40px", height: "40px"}}>
                      <span className="text-white fw-bold">PP</span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="dropdown-item-title mb-0">
                      Priya Patel
                      <span className="float-end text-sm text-muted"><i className="fas fa-star"></i></span>
                    </h6>
                    <p className="text-sm text-muted mb-0">Regarding Wedding Reception booking...</p>
                    <p className="text-sm text-muted mb-0"><i className="far fa-clock mr-1"></i> 2 Hours Ago</p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar avatar-sm bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: "40px", height: "40px"}}>
                      <span className="text-white fw-bold">AS</span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="dropdown-item-title mb-0">
                      Amit Singh
                      <span className="float-end text-sm text-warning"><i className="fas fa-star"></i></span>
                    </h6>
                    <p className="text-sm text-muted mb-0">Special request for the party...</p>
                    <p className="text-sm text-muted mb-0"><i className="far fa-clock mr-1"></i> 1 Day Ago</p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
            </div>
          </li>

          {/* Notifications Dropdown Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-bs-toggle="dropdown" href="#">
              <FaBell className="text-muted" />
              <span className="position-absolute top-5 start-100 translate-middle badge rounded-pill bg-warning" style={{fontSize: "0.5rem", marginTop: "-5px", marginLeft: "-10px"}}>
                5
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <span className="dropdown-item dropdown-header">5 Notifications</span>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <div className="d-flex align-items-center">
                  <div className="me-2 text-success">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div>
                    <p className="mb-0">New booking confirmed</p>
                    <p className="text-muted mb-0" style={{fontSize: "0.8rem"}}>2 hours ago</p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <div className="d-flex align-items-center">
                  <div className="me-2 text-warning">
                    <i className="fas fa-exclamation-circle"></i>
                  </div>
                  <div>
                    <p className="mb-0">Pending approval required</p>
                    <p className="text-muted mb-0" style={{fontSize: "0.8rem"}}>5 hours ago</p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <div className="d-flex align-items-center">
                  <div className="me-2 text-info">
                    <i className="fas fa-info-circle"></i>
                  </div>
                  <div>
                    <p className="mb-0">Payment received</p>
                    <p className="text-muted mb-0" style={{fontSize: "0.8rem"}}>1 day ago</p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
          </li>

          {/* User Profile Dropdown */}
          <li className="nav-item dropdown user-menu">
            <a 
              href="#" 
              className="nav-link dropdown-toggle d-flex align-items-center" 
              data-bs-toggle="dropdown"
            >
              <div className="avatar avatar-sm bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: "32px", height: "32px"}}>
                <span className="text-white fw-bold">OP</span>
              </div>
              <span className="d-none d-md-inline">Organizer</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li className="user-header p-3 bg-primary text-white text-center">
                <div className="avatar avatar-md bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2" style={{width: "60px", height: "60px"}}>
                  <span className="text-white fw-bold fs-4">OP</span>
                </div>
                <p className="mb-0">
                  Organizer Profile
                  <small>Member since Jan. 2023</small>
                </p>
              </li>
              <li className="user-body p-2">
                <div className="row text-center">
                  <div className="col-4">
                    <a href="#" className="text-decoration-none">Events</a>
                  </div>
                  <div className="col-4">
                    <a href="#" className="text-decoration-none">Bookings</a>
                  </div>
                  <div className="col-4">
                    <a href="#" className="text-decoration-none">Revenue</a>
                  </div>
                </div>
              </li>
              <li className="user-footer p-2 d-flex justify-content-between">
                <Link to="/provider/profile" className="btn btn-outline-primary btn-sm">
                  <FaUser className="me-1" /> Profile
                </Link>
                <Link to="/provider/settings" className="btn btn-outline-secondary btn-sm">
                  <FaCog className="me-1" /> Settings
                </Link>
                <button className="btn btn-danger btn-sm">
                  <FaSignOutAlt className="me-1" /> Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};