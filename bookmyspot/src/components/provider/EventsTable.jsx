import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Simulate fetching events data
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await axios.get("/provider/events");
        
        // For demo purposes, using mock data
        setTimeout(() => {
          const mockEvents = [
            {
              id: 1,
              name: "Corporate Conference",
              date: "2024-10-12",
              location: "Royal Grand Palace, Ahmedabad",
              capacity: 150,
              bookings: 120,
              status: "upcoming",
              revenue: 175000
            },
            {
              id: 2,
              name: "Wedding Reception",
              date: "2024-09-25",
              location: "Riverside Retreat, Mumbai",
              capacity: 300,
              bookings: 250,
              status: "upcoming",
              revenue: 350000
            },
            {
              id: 3,
              name: "Birthday Party",
              date: "2024-08-30",
              location: "Golden Hotel, Ahmedabad",
              capacity: 50,
              bookings: 45,
              status: "upcoming",
              revenue: 65000
            },
            {
              id: 4,
              name: "Product Launch",
              date: "2024-10-05",
              location: "Tech Center, Mumbai",
              capacity: 120,
              bookings: 95,
              status: "upcoming",
              revenue: 125000
            },
            {
              id: 5,
              name: "Anniversary Celebration",
              date: "2024-07-15",
              location: "Silver Palace, Ahmedabad",
              capacity: 80,
              bookings: 78,
              status: "completed",
              revenue: 85000
            },
            {
              id: 6,
              name: "Charity Gala",
              date: "2024-06-22",
              location: "Community Center, Mumbai",
              capacity: 200,
              bookings: 180,
              status: "completed",
              revenue: 225000
            },
            {
              id: 7,
              name: "Corporate Training",
              date: "2024-11-10",
              location: "Business Hub, Ahmedabad",
              capacity: 40,
              bookings: 15,
              status: "upcoming",
              revenue: 40000
            },
            {
              id: 8,
              name: "Fashion Show",
              date: "2024-09-30",
              location: "Modern Gallery, Mumbai",
              capacity: 150,
              bookings: 110,
              status: "upcoming",
              revenue: 165000
            },
            {
              id: 9,
              name: "Team Building Workshop",
              date: "2024-05-18",
              location: "Green Retreat, Ahmedabad",
              capacity: 30,
              bookings: 28,
              status: "completed",
              revenue: 45000
            },
            {
              id: 10,
              name: "Tech Conference",
              date: "2024-04-25",
              location: "Innovation Center, Mumbai",
              capacity: 250,
              bookings: 230,
              status: "completed",
              revenue: 300000
            },
            {
              id: 11,
              name: "Music Festival",
              date: "2024-08-15",
              location: "Beach Arena, Mumbai",
              capacity: 500,
              bookings: 320,
              status: "upcoming",
              revenue: 450000
            },
            {
              id: 12,
              name: "Food Exhibition",
              date: "2024-07-08",
              location: "Convention Center, Ahmedabad",
              capacity: 180,
              bookings: 175,
              status: "completed",
              revenue: 210000
            }
          ];
          
          setEvents(mockEvents);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle delete event (mock implementation)
  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      // In a real app, this would be an API call
      // await axios.delete(`/provider/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    }
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sort direction if same field is clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Filter and sort events
  const filteredEvents = events
    .filter(event => 
      (filterStatus === "all" || event.status === filterStatus) &&
      (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       event.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      // Handle different types of sorting
      if (sortField === "name" || sortField === "location") {
        return sortDirection === "asc" 
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      } else if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else {
        return sortDirection === "asc"
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      }
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Event Management</h1>
        <Link to="/provider/addevent" className="btn btn-primary">
          Add New Event
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search events by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0">
                  <FaFilter className="text-muted" />
                </span>
                <select
                  className="form-select border-start-0"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Events</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0">
                  {sortDirection === "asc" ? (
                    <FaSortAmountUp className="text-muted" />
                  ) : (
                    <FaSortAmountDown className="text-muted" />
                  )}
                </span>
                <select
                  className="form-select border-start-0"
                  value={sortField}
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="bookings">Sort by Bookings</option>
                  <option value="revenue">Sort by Revenue</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                    Event Name
                    {sortField === "name" && (
                      <span className="ms-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                    Date
                    {sortField === "date" && (
                      <span className="ms-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th>Location</th>
                  <th onClick={() => handleSort("bookings")} style={{ cursor: "pointer" }}>
                    Bookings
                    {sortField === "bookings" && (
                      <span className="ms-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort("revenue")} style={{ cursor: "pointer" }}>
                    Revenue
                    {sortField === "revenue" && (
                      <span className="ms-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((event) => (
                    <tr key={event.id}>
                      <td>{event.name}</td>
                      <td>{formatDate(event.date)}</td>
                      <td>{event.location}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 me-2">
                            <div className="progress" style={{ height: "6px" }}>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${(event.bookings / event.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="small">
                            {event.bookings}/{event.capacity}
                          </span>
                        </div>
                      </td>
                      <td>{formatCurrency(event.revenue)}</td>
                      <td>
                        <span className={`badge rounded-pill ${event.status === "upcoming" ? "bg-info" : "bg-success"}`}>
                          {event.status === "upcoming" ? "Upcoming" : "Completed"}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link to={`/provider/events/${event.id}`} className="btn btn-sm btn-outline-primary">
                            <FaEye />
                          </Link>
                          <Link to={`/provider/events/${event.id}/edit`} className="btn btn-sm btn-outline-secondary">
                            <FaEdit />
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No events found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {filteredEvents.length > itemsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                  Previous
                </button>
              </li>

              {[...Array(Math.ceil(filteredEvents.length / itemsPerPage))].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === Math.ceil(filteredEvents.length / itemsPerPage) ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Summary Card */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3 col-sm-6">
              <div className="p-3 border rounded bg-light text-center">
                <h3 className="mb-1">{events.length}</h3>
                <p className="mb-0 text-muted">Total Events</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="p-3 border rounded bg-light text-center">
                <h3 className="mb-1">{events.filter(e => e.status === "upcoming").length}</h3>
                <p className="mb-0 text-muted">Upcoming Events</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="p-3 border rounded bg-light text-center">
                <h3 className="mb-1">{events.reduce((sum, event) => sum + event.bookings, 0)}</h3>
                <p className="mb-0 text-muted">Total Bookings</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="p-3 border rounded bg-light text-center">
                <h3 className="mb-1">{formatCurrency(events.reduce((sum, event) => sum + event.revenue, 0))}</h3>
                <p className="mb-0 text-muted">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsTable; 