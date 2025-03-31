import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/common/LandingPage';
import Login from './components/common/Login';
import Signup from './components/common/Signup';
import { UserSidebar } from "./components/layouts/UserSidebar";
import { UserProfile } from "./components/user/UserProfile";
import { ProviderSidebar } from "./components/layouts/ProviderSidebar";
import axios from "axios";
import PrivateRoutes from "./hooks/PrivateRoutes";
import { AddEvent } from "./components/provider/AddEvent";
import ProviderDashboard from "./components/provider/ProviderDashboard";
import EventsTable from "./components/provider/EventsTable";
import BookingManagement from "./components/provider/BookingManagement";
import { ResetPassword } from "./components/common/ResetPassword";

// Import CSS in the correct order - bootstrap first, then AdminLTE, then custom styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/adminlte.min.css";
import "./App.css";

function App() {
  axios.defaults.baseURL = "http://localhost:3200"

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/resetpassword/:token" element={<ResetPassword />} />

      <Route path="" element={<PrivateRoutes />}>
        {/* User Routes */}
        <Route path="/user" element={<UserSidebar />}>
          <Route path="profile" element={<UserProfile />} />
        </Route>
        
        {/* Provider Routes */}
        <Route path="/provider" element={<ProviderSidebar />}>
          <Route index element={<ProviderDashboard />} />
          <Route path="dashboard" element={<ProviderDashboard />} />
          <Route path="addevent" element={<AddEvent />} />
          <Route path="events" element={<EventsTable />} />
          <Route path="bookings" element={<BookingManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;