import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ProviderNavbar } from './ProviderNavbar';
import { 
  FaHome, 
  FaCalendarAlt, 
  FaUsers, 
  FaChartLine, 
  FaCog, 
  FaClipboardList, 
  FaPlus
} from "react-icons/fa";

export const ProviderSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };

  // Check if a route is active
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== "/provider" && location.pathname.startsWith(path));
  };

  return (
    <>
      <ProviderNavbar toggleSidebar={toggleSidebar} />
      <aside className={`app-sidebar bg-dark shadow ${
          isSidebarOpen ? "open" : "d-none"
        }`}
        data-bs-theme="dark">
        <div className="sidebar-brand">
          <Link to="/provider" className="brand-link d-flex align-items-center px-3 py-4">
            <img src="https://placehold.co/80x40?text=BookMySpot"
              alt="BookMySpot"
              className="brand-image opacity-75 me-3"
              style={{ maxHeight: '40px' }}
            />
            <span className="brand-text fw-light fs-4">BookMySpot</span>
          </Link>
        </div>

        <div className="mt-2 overflow-auto sidebar-content" style={{ height: 'calc(100vh - 70px)' }}>
          <nav className="mt-3">
            <ul
              className="nav sidebar-menu flex-column"
              role="menu"
            >
              <li className="nav-item mb-1">
                <Link to="/provider" className={`nav-link ${isActive("/provider") && !isActive("/provider/addevent") && !location.pathname.includes("events") && !location.pathname.includes("bookings") ? "active" : ""}`}>
                  <div className="d-flex align-items-center">
                    <FaHome className="nav-icon me-3" />
                    <p>Dashboard</p>
                  </div>
                </Link>
              </li>
              
              <li className="nav-header mt-3 mb-2 px-3 text-uppercase text-muted">
                <small>Event Management</small>
              </li>
              
              <li className="nav-item mb-1">
                <Link to="/provider/events" className={`nav-link ${isActive("/provider/events") ? "active" : ""}`}>
                  <div className="d-flex align-items-center">
                    <FaCalendarAlt className="nav-icon me-3" />
                    <p>All Events</p>
                  </div>
                </Link>
              </li>
              
              <li className="nav-item mb-1">
                <Link to="/provider/addevent" className={`nav-link ${isActive("/provider/addevent") ? "active" : ""}`}>
                  <div className="d-flex align-items-center">
                    <FaPlus className="nav-icon me-3" />
                    <p>Add New Event</p>
                  </div>
                </Link>
              </li>

              <li className="nav-header mt-3 mb-2 px-3 text-uppercase text-muted">
                <small>Bookings</small>
              </li>
              
              <li className="nav-item mb-1">
                <Link to="/provider/bookings" className={`nav-link ${isActive("/provider/bookings") ? "active" : ""}`}>
                  <div className="d-flex align-items-center">
                    <FaUsers className="nav-icon me-3" />
                    <p>Manage Bookings</p>
                  </div>
                </Link>
              </li>

              <li className="nav-header mt-3 mb-2 px-3 text-uppercase text-muted">
                <small>Reports & Settings</small>
              </li>
              
              <li className="nav-item mb-1">
                <Link to="/provider/reports" className={`nav-link ${isActive("/provider/reports") ? "active" : ""}`}>
                  <div className="d-flex align-items-center">
                    <FaChartLine className="nav-icon me-3" />
                    <p>Analytics & Reports</p>
                  </div>
                </Link>
              </li>
              
              <li className="nav-item mb-1">
                <Link to="/provider/settings" className={`nav-link ${isActive("/provider/settings") ? "active" : ""}`}>
                  <div className="d-flex align-items-center">
                    <FaCog className="nav-icon me-3" />
                    <p>Settings</p>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="sidebar-footer p-3 mt-5 border-top border-secondary">
            <div className="d-flex align-items-center">
              <div className="avatar rounded-circle bg-primary me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="text-white fw-bold">OP</span>
              </div>
              <div>
                <div className="fw-medium text-white">Organizer Profile</div>
                <small className="text-muted">Premium Plan</small>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="app-main">
        <div className="content-wrapper">
          <Outlet></Outlet>
        </div>
      </main>
    </>
  );
};