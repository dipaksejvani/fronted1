import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaEye, FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaExclamationTriangle } from "react-icons/fa";
import axios from "axios";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState("bookingDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    // Simulate fetching bookings data
    const fetchBookings = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await axios.get("/provider/bookings");
        
        // For demo purposes, using mock data
        setTimeout(() => {
          const mockBookings = [
            {
              id: 1,
              customer: {
                name: "Rajesh Sharma",
                email: "rajesh.sharma@example.com",
                phone: "+91 98765 43210"
              },
              event: {
                name: "Corporate Conference",
                date: "2024-10-12",
                location: "Royal Grand Palace, Ahmedabad"
              },
              bookingDate: "2024-07-25",
              guests: 120,
              amount: 35000,
              status: "confirmed",
              paymentStatus: "paid",
              specialRequests: "Need projector and sound system setup."
            },
            {
              id: 2,
              customer: {
                name: "Priya Patel",
                email: "priya.patel@example.com",
                phone: "+91 87654 32109"
              },
              event: {
                name: "Wedding Reception",
                date: "2024-09-25",
                location: "Riverside Retreat, Mumbai"
              },
              bookingDate: "2024-07-28",
              guests: 250,
              amount: 75000,
              status: "pending",
              paymentStatus: "partial",
              specialRequests: "Need vegetarian catering and flower decorations."
            },
            {
              id: 3,
              customer: {
                name: "Amit Singh",
                email: "amit.singh@example.com",
                phone: "+91 76543 21098"
              },
              event: {
                name: "Birthday Party",
                date: "2024-08-30",
                location: "Golden Hotel, Ahmedabad"
              },
              bookingDate: "2024-07-15",
              guests: 45,
              amount: 15000,
              status: "confirmed",
              paymentStatus: "paid",
              specialRequests: "Birthday cake and balloon decorations."
            },
            {
              id: 4,
              customer: {
                name: "Neha Desai",
                email: "neha.desai@example.com",
                phone: "+91 65432 10987"
              },
              event: {
                name: "Product Launch",
                date: "2024-10-05",
                location: "Tech Center, Mumbai"
              },
              bookingDate: "2024-07-30",
              guests: 95,
              amount: 48000,
              status: "pending",
              paymentStatus: "unpaid",
              specialRequests: "Need high-speed internet and media setup."
            },
            {
              id: 5,
              customer: {
                name: "Sanjay Mehta",
                email: "sanjay.mehta@example.com",
                phone: "+91 54321 09876"
              },
              event: {
                name: "Anniversary Celebration",
                date: "2024-09-18",
                location: "Silver Palace, Ahmedabad"
              },
              bookingDate: "2024-07-10",
              guests: 60,
              amount: 22000,
              status: "confirmed",
              paymentStatus: "paid",
              specialRequests: "Champagne and romantic decorations."
            },
            {
              id: 6,
              customer: {
                name: "Rahul Joshi",
                email: "rahul.joshi@example.com",
                phone: "+91 43210 98765"
              },
              event: {
                name: "Corporate Training",
                date: "2024-08-15",
                location: "Business Hub, Ahmedabad"
              },
              bookingDate: "2024-06-28",
              guests: 25,
              amount: 12000,
              status: "cancelled",
              paymentStatus: "refunded",
              specialRequests: "Whiteboard and training equipment needed."
            },
            {
              id: 7,
              customer: {
                name: "Meera Shah",
                email: "meera.shah@example.com",
                phone: "+91 32109 87654"
              },
              event: {
                name: "Fashion Show",
                date: "2024-09-30",
                location: "Modern Gallery, Mumbai"
              },
              bookingDate: "2024-07-20",
              guests: 110,
              amount: 55000,
              status: "confirmed",
              paymentStatus: "partial",
              specialRequests: "Runway setup and backstage area needed."
            },
            {
              id: 8,
              customer: {
                name: "Vikram Patel",
                email: "vikram.patel@example.com",
                phone: "+91 21098 76543"
              },
              event: {
                name: "Engagement Ceremony",
                date: "2024-11-05",
                location: "Garden Resort, Ahmedabad"
              },
              bookingDate: "2024-08-01",
              guests: 80,
              amount: 30000,
              status: "pending",
              paymentStatus: "unpaid",
              specialRequests: "Traditional decorations and catering."
            },
            {
              id: 9,
              customer: {
                name: "Ananya Sharma",
                email: "ananya.sharma@example.com",
                phone: "+91 10987 65432"
              },
              event: {
                name: "Charity Gala",
                date: "2024-10-22",
                location: "Community Center, Mumbai"
              },
              bookingDate: "2024-07-14",
              guests: 150,
              amount: 65000,
              status: "confirmed",
              paymentStatus: "paid",
              specialRequests: "Stage setup for auction and speeches."
            },
            {
              id: 10,
              customer: {
                name: "Deepak Verma",
                email: "deepak.verma@example.com",
                phone: "+91 09876 54321"
              },
              event: {
                name: "Music Festival",
                date: "2024-08-25",
                location: "Beach Arena, Mumbai"
              },
              bookingDate: "2024-06-15",
              guests: 300,
              amount: 150000,
              status: "pending",
              paymentStatus: "partial",
              specialRequests: "Sound system and stage setup for bands."
            },
          ];
          
          setBookings(mockBookings);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle approve booking
  const handleApproveBooking = (id) => {
    // In a real app, this would be an API call
    // await axios.put(`/provider/bookings/${id}/approve`);
    
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: "confirmed" } : booking
    ));
  };

  // Handle reject booking
  const handleRejectBooking = (id) => {
    if (window.confirm("Are you sure you want to reject this booking?")) {
      // In a real app, this would be an API call
      // await axios.put(`/provider/bookings/${id}/reject`);
      
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status: "cancelled" } : booking
      ));
    }
  };

  // Handle viewing booking details
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
  };

  // Close booking details modal
  const closeBookingDetails = () => {
    setSelectedBooking(null);
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sort direction if same field is clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to descending for dates, ascending for others
      setSortField(field);
      setSortDirection(field === "bookingDate" || field === "event.date" ? "desc" : "asc");
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

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(booking => 
      (filterStatus === "all" || booking.status === filterStatus) &&
      (booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       booking.event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       booking.customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      // Handle different types of sorting
      if (sortField === "customer.name" || sortField === "event.name") {
        const fieldA = sortField === "customer.name" ? a.customer.name : a.event.name;
        const fieldB = sortField === "customer.name" ? b.customer.name : b.event.name;
        return sortDirection === "asc" 
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      } else if (sortField === "bookingDate" || sortField === "event.date") {
        const fieldA = sortField === "bookingDate" ? a.bookingDate : a.event.date;
        const fieldB = sortField === "bookingDate" ? b.bookingDate : b.event.date;
        return sortDirection === "asc"
          ? new Date(fieldA) - new Date(fieldB)
          : new Date(fieldB) - new Date(fieldA);
      } else {
        const fieldA = sortField === "amount" ? a.amount : a.guests;
        const fieldB = sortField === "amount" ? b.amount : b.guests;
        return sortDirection === "asc"
          ? fieldA - fieldB
          : fieldB - fieldA;
      }
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

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
        <h1 className="h3">Booking Management</h1>
        <button className="btn btn-primary">
          Export Bookings
        </button>
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
                  placeholder="Search by customer name, email or event..."
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
                  <option value="all">All Bookings</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
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
                  <option value="bookingDate">Sort by Booking Date</option>
                  <option value="event.date">Sort by Event Date</option>
                  <option value="customer.name">Sort by Customer Name</option>
                  <option value="guests">Sort by Guest Count</option>
                  <option value="amount">Sort by Amount</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <FaCheck className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Confirmed</h6>
                  <h3 className="mb-0">{bookings.filter(b => b.status === "confirmed").length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-warning bg-opacity-10 p-3 rounded">
                    <FaExclamationTriangle className="text-warning" size={24} />
                  </div>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Pending</h6>
                  <h3 className="mb-0">{bookings.filter(b => b.status === "pending").length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-danger bg-opacity-10 p-3 rounded">
                    <FaTimes className="text-danger" size={24} />
                  </div>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Cancelled</h6>
                  <h3 className="mb-0">{bookings.filter(b => b.status === "cancelled").length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <FaCheck className="text-success" size={24} />
                  </div>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Revenue</h6>
                  <h3 className="mb-0">
                    {formatCurrency(bookings
                      .filter(b => b.status === "confirmed" || b.status === "pending")
                      .reduce((sum, b) => sum + b.amount, 0))}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th onClick={() => handleSort("customer.name")} style={{ cursor: "pointer" }}>
                    Customer
                    {sortField === "customer.name" && (
                      <span className="ms-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort("event.name")} style={{ cursor: "pointer" }}>
                    Event
                    {sortField === "event.name" && (
                      <span className="ms-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort("event.date")} style={{ cursor: "pointer" }}>
                    Event Date
                    {sortField === "event.date" && (
                      <span className="ms-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort("bookingDate")} style={{ cursor: "pointer" }}>
                    Booking Date
                    {sortField === "bookingDate" && (
                      <span className="ms-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort("guests")} style={{ cursor: "pointer" }}>
                    Guests
                    {sortField === "guests" && (
                      <span className="ms-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort("amount")} style={{ cursor: "pointer" }}>
                    Amount
                    {sortField === "amount" && (
                      <span className="ms-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <div className="avatar avatar-sm bg-light rounded-circle text-center" style={{width: '36px', height: '36px', lineHeight: '36px'}}>
                              <span className="fw-bold">{booking.customer.name.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-medium d-block">{booking.customer.name}</span>
                            <small className="text-muted">{booking.customer.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fw-medium">{booking.event.name}</span>
                      </td>
                      <td>{formatDate(booking.event.date)}</td>
                      <td>{formatDate(booking.bookingDate)}</td>
                      <td>{booking.guests}</td>
                      <td>{formatCurrency(booking.amount)}</td>
                      <td>
                        <span className={`badge rounded-pill ${
                          booking.status === "confirmed" ? "bg-success" : 
                          booking.status === "pending" ? "bg-warning" : "bg-danger"
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge rounded-pill ${
                          booking.paymentStatus === "paid" ? "bg-success" : 
                          booking.paymentStatus === "partial" ? "bg-warning" : 
                          booking.paymentStatus === "refunded" ? "bg-info" : "bg-danger"
                        }`}>
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleViewBooking(booking)}
                          >
                            <FaEye />
                          </button>
                          {booking.status === "pending" && (
                            <>
                              <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => handleApproveBooking(booking.id)}
                              >
                                <FaCheck />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleRejectBooking(booking.id)}
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No bookings found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {filteredBookings.length > itemsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                  Previous
                </button>
              </li>

              {[...Array(Math.ceil(filteredBookings.length / itemsPerPage))].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === Math.ceil(filteredBookings.length / itemsPerPage) ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booking Details</h5>
                <button type="button" className="btn-close" onClick={closeBookingDetails}></button>
              </div>
              <div className="modal-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="card-title mb-3">Customer Information</h6>
                        <p className="mb-1">
                          <strong>Name:</strong> {selectedBooking.customer.name}
                        </p>
                        <p className="mb-1">
                          <strong>Email:</strong> {selectedBooking.customer.email}
                        </p>
                        <p className="mb-1">
                          <strong>Phone:</strong> {selectedBooking.customer.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="card-title mb-3">Booking Information</h6>
                        <p className="mb-1">
                          <strong>Booking Date:</strong> {formatDate(selectedBooking.bookingDate)}
                        </p>
                        <p className="mb-1">
                          <strong>Status:</strong>{" "}
                          <span className={`badge rounded-pill ${
                            selectedBooking.status === "confirmed" ? "bg-success" : 
                            selectedBooking.status === "pending" ? "bg-warning" : "bg-danger"
                          }`}>
                            {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                          </span>
                        </p>
                        <p className="mb-1">
                          <strong>Payment Status:</strong>{" "}
                          <span className={`badge rounded-pill ${
                            selectedBooking.paymentStatus === "paid" ? "bg-success" : 
                            selectedBooking.paymentStatus === "partial" ? "bg-warning" : 
                            selectedBooking.paymentStatus === "refunded" ? "bg-info" : "bg-danger"
                          }`}>
                            {selectedBooking.paymentStatus.charAt(0).toUpperCase() + selectedBooking.paymentStatus.slice(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 bg-light mt-4">
                  <div className="card-body">
                    <h6 className="card-title mb-3">Event Details</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mb-1">
                          <strong>Event Name:</strong> {selectedBooking.event.name}
                        </p>
                        <p className="mb-1">
                          <strong>Event Date:</strong> {formatDate(selectedBooking.event.date)}
                        </p>
                        <p className="mb-1">
                          <strong>Location:</strong> {selectedBooking.event.location}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1">
                          <strong>Guest Count:</strong> {selectedBooking.guests}
                        </p>
                        <p className="mb-1">
                          <strong>Amount:</strong> {formatCurrency(selectedBooking.amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedBooking.specialRequests && (
                  <div className="card border-0 bg-light mt-4">
                    <div className="card-body">
                      <h6 className="card-title mb-3">Special Requests</h6>
                      <p className="mb-0">{selectedBooking.specialRequests}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                {selectedBooking.status === "pending" && (
                  <>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        handleApproveBooking(selectedBooking.id);
                        closeBookingDetails();
                      }}
                    >
                      Approve Booking
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        handleRejectBooking(selectedBooking.id);
                        closeBookingDetails();
                      }}
                    >
                      Reject Booking
                    </button>
                  </>
                )}
                <button type="button" className="btn btn-secondary" onClick={closeBookingDetails}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedBooking && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default BookingManagement; 