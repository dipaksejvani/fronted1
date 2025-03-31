import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserSidebar } from "./components/layouts/UserSidebar";
import { ProviderSidebar } from "./components/layouts/ProviderSidebar";
import { AddEvent } from "./components/provider/AddEvent";
import ProviderDashboard from "./components/provider/ProviderDashboard";
import EventsTable from "./components/provider/EventsTable";
import BookingManagement from "./components/provider/BookingManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Provider Routes */}
        <Route path="/provider" element={<ProviderSidebar />}>
          <Route index element={<ProviderDashboard />} />
          <Route path="dashboard" element={<ProviderDashboard />} />
          <Route path="addevent" element={<AddEvent />} />
          <Route path="events" element={<EventsTable />} />
          <Route path="bookings" element={<BookingManagement />} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<UserSidebar />}>
          <Route index element={<h1>Default User Page</h1>} />
          <Route path="dashboard" element={<h1>User Dashboard</h1>} />
        </Route>

        {/* Default Route */}
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 