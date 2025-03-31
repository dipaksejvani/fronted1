import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaCheckCircle, 
  FaClock,
  FaPlus,
  FaEye,
  FaEdit,
  FaInbox,
  FaUserPlus,
  FaPercent
} from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement,
  Title
);

const ProviderDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalBookings: 0,
    revenue: 0,
    newUsers: 0,
    occupancyRate: 0
  });
  
  const [recentBookings, setRecentBookings] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from API
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real app, these would be proper API calls
        // For example: const response = await axios.get("http://localhost:3200/provider/stats");
        
        setTimeout(() => {
          setStats({
            totalEvents: 24,
            upcomingEvents: 8,
            totalBookings: 156,
            revenue: 258500,
            newUsers: 42,
            occupancyRate: 78
          });
          
          setRecentBookings([
            { id: 1, customerName: "Rajesh Sharma", eventName: "Corporate Conference", date: "2024-10-12", amount: 35000, status: "Confirmed", avatar: "RS" },
            { id: 2, customerName: "Priya Patel", eventName: "Wedding Reception", date: "2024-09-25", amount: 75000, status: "Pending", avatar: "PP" },
            { id: 3, customerName: "Amit Singh", eventName: "Birthday Party", date: "2024-08-30", amount: 15000, status: "Confirmed", avatar: "AS" },
            { id: 4, customerName: "Neha Desai", eventName: "Product Launch", date: "2024-10-05", amount: 48000, status: "Pending", avatar: "ND" },
            { id: 5, customerName: "Sanjay Mehta", eventName: "Anniversary Celebration", date: "2024-09-18", amount: 22000, status: "Confirmed", avatar: "SM" }
          ]);
          
          setUpcomingEvents([
            { id: 1, name: "Corporate Conference", date: "2024-10-12", location: "Royal Grand Palace, Ahmedabad", bookings: 120, capacity: 150 },
            { id: 2, name: "Wedding Reception", date: "2024-09-25", location: "Riverside Retreat, Mumbai", bookings: 250, capacity: 300 },
            { id: 3, name: "Birthday Party", date: "2024-08-30", location: "Golden Hotel, Ahmedabad", bookings: 45, capacity: 50 },
            { id: 4, name: "Product Launch", date: "2024-10-05", location: "Tech Center, Mumbai", bookings: 95, capacity: 120 }
          ]);
          
          setNotifications([
            { id: 1, type: "booking", message: "New booking for Corporate Conference", time: "2 hours ago" },
            { id: 2, type: "payment", message: "Payment received for Wedding Reception", time: "5 hours ago" },
            { id: 3, type: "system", message: "System maintenance scheduled for tonight", time: "1 day ago" }
          ]);
          
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [20000, 35000, 25000, 45000, 30000, 55000, 40000, 60000, 50000],
        borderColor: '#4361ee',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        tension: 0.4,
        fill: true
      },
    ],
  };

  const bookingsData = {
    labels: ['Weddings', 'Corporate', 'Birthday', 'Social', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#4361ee',
          '#3a0ca3',
          '#7209b7',
          '#f72585',
          '#4cc9f0',
        ],
        borderWidth: 0,
      },
    ],
  };
  
  const monthlyBookingsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Number of Bookings',
        data: [12, 19, 15, 22, 18, 28, 20, 32, 25],
        backgroundColor: '#4cc9f0',
      },
    ],
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Welcome Banner */}
      <div className="card bg-primary text-white mb-4 border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="mb-1">Welcome back, Organizer</h2>
              <p className="mb-0 opacity-75">Here's what's happening with your events today.</p>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <Link to="/provider/addevent" className="btn btn-light me-2">
                <FaPlus className="me-2" />
                Add New Event
              </Link>
              <Link to="/provider/bookings" className="btn btn-outline-light">
                <FaUsers className="me-2" />
                Manage Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <FaCalendarAlt className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Events</h6>
                  <h3 className="mb-0">{stats.totalEvents}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <FaClock className="text-success" size={24} />
                  </div>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Upcoming Events</h6>
                  <h3 className="mb-0">{stats.upcomingEvents}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-info bg-opacity-10 p-3 rounded">
                    <FaUsers className="text-info" size={24} />
                  </div>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Bookings</h6>
                  <h3 className="mb-0">{stats.totalBookings}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-warning bg-opacity-10 p-3 rounded">
                    <FaMoneyBillWave className="text-warning" size={24} />
                  </div>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Revenue</h6>
                  <h3 className="mb-0">{formatCurrency(stats.revenue)}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Stats */}
      <div className="row g-4 mb-4">
        <div className="col-xl-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="card-title mb-0">New Users</h5>
                <FaUserPlus className="text-primary" />
              </div>
              <h2 className="mb-0">{stats.newUsers}</h2>
              <div className="text-success mt-2">
                <FaChartLine className="me-1" />
                <span>+12% from last month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="card-title mb-0">Occupancy Rate</h5>
                <FaPercent className="text-warning" />
              </div>
              <div className="progress mb-3" style={{ height: "10px" }}>
                <div 
                  className="progress-bar bg-warning" 
                  role="progressbar" 
                  style={{ width: `${stats.occupancyRate}%` }}
                  aria-valuenow={stats.occupancyRate} 
                  aria-valuemin="0" 
                  aria-valuemax="100">
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <span>{stats.occupancyRate}% Occupancy</span>
                <span className="text-muted">Target: 80%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="card-title mb-0">Recent Notifications</h5>
                <FaInbox className="text-info" />
              </div>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div key={notification.id} className="notification-item d-flex align-items-start mb-2 pb-2 border-bottom">
                    <div className="flex-shrink-0 me-3">
                      <div className={`bg-${notification.type === 'booking' ? 'success' : notification.type === 'payment' ? 'warning' : 'info'} bg-opacity-10 p-2 rounded-circle`}>
                        {notification.type === 'booking' ? <FaUsers className="text-success" /> :
                         notification.type === 'payment' ? <FaMoneyBillWave className="text-warning" /> :
                         <FaCheckCircle className="text-info" />}
                      </div>
                    </div>
                    <div>
                      <p className="mb-0">{notification.message}</p>
                      <small className="text-muted">{notification.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Revenue Overview</h5>
              <div className="btn-group" role="group">
                <button className="btn btn-sm btn-outline-secondary active">Monthly</button>
                <button className="btn btn-sm btn-outline-secondary">Quarterly</button>
                <button className="btn btn-sm btn-outline-secondary">Yearly</button>
              </div>
            </div>
            <div className="card-body">
              <Line 
                data={revenueData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return formatCurrency(context.raw);
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return '₹' + value.toLocaleString();
                        }
                      }
                    }
                  }
                }}
                style={{ height: '300px' }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-0">
              <h5 className="mb-0">Booking Distribution</h5>
            </div>
            <div className="card-body d-flex flex-column align-items-center">
              <div style={{ height: '250px', width: '250px' }}>
                <Doughnut 
                  data={bookingsData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-3 text-center">
                <span className="badge bg-primary me-2">156 Total Bookings</span>
                <span className="badge bg-success">8 Events</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Monthly Bookings Chart */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h5 className="mb-0">Monthly Bookings</h5>
            </div>
            <div className="card-body">
              <Bar 
                data={monthlyBookingsData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return context.raw + ' Bookings';
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        precision: 0
                      }
                    }
                  }
                }}
                style={{ height: '250px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events and Recent Bookings */}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Upcoming Events</h5>
              <Link to="/provider/events" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Event</th>
                      <th>Date</th>
                      <th>Bookings</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingEvents.map(event => (
                      <tr key={event.id}>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="fw-medium">{event.name}</span>
                            <small className="text-muted">{event.location}</small>
                          </div>
                        </td>
                        <td>{formatDate(event.date)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 me-2">
                              <div className="progress" style={{height: '6px'}}>
                                <div 
                                  className="progress-bar" 
                                  role="progressbar" 
                                  style={{width: `${(event.bookings / event.capacity) * 100}%`}}
                                  aria-valuenow={(event.bookings / event.capacity) * 100}
                                  aria-valuemin="0" 
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                            <span className="small">{event.bookings}/{event.capacity}</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary">
                              <FaEye />
                            </button>
                            <button className="btn btn-sm btn-outline-secondary">
                              <FaEdit />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Bookings</h5>
              <Link to="/provider/bookings" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Customer</th>
                      <th>Event</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 me-2">
                              <div className="avatar avatar-sm bg-primary rounded-circle text-center" style={{width: '36px', height: '36px', lineHeight: '36px'}}>
                                <span className="text-white fw-bold">{booking.avatar}</span>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <span className="fw-medium">{booking.customerName}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span>{booking.eventName}</span>
                            <small className="text-muted">{formatDate(booking.date)}</small>
                          </div>
                        </td>
                        <td>
                          <span className="fw-medium">{formatCurrency(booking.amount)}</span>
                        </td>
                        <td>
                          <span className={`badge ${booking.status === 'Confirmed' ? 'bg-success' : 'bg-warning'} rounded-pill`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-4 mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-md-3 col-sm-6">
                  <Link to="/provider/addevent" className="card border-0 bg-light h-100 text-decoration-none text-center p-4 hover-shadow">
                    <div className="card-body">
                      <div className="mb-3">
                        <FaCalendarAlt size={36} className="text-primary" />
                      </div>
                      <h6 className="mb-2">Create Event</h6>
                      <p className="text-muted mb-0 small">Add a new event to your listings</p>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3 col-sm-6">
                  <Link to="/provider/bookings" className="card border-0 bg-light h-100 text-decoration-none text-center p-4 hover-shadow">
                    <div className="card-body">
                      <div className="mb-3">
                        <FaUsers size={36} className="text-success" />
                      </div>
                      <h6 className="mb-2">Manage Bookings</h6>
                      <p className="text-muted mb-0 small">Review and manage your bookings</p>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3 col-sm-6">
                  <Link to="/provider/reports" className="card border-0 bg-light h-100 text-decoration-none text-center p-4 hover-shadow">
                    <div className="card-body">
                      <div className="mb-3">
                        <FaChartLine size={36} className="text-info" />
                      </div>
                      <h6 className="mb-2">View Reports</h6>
                      <p className="text-muted mb-0 small">Analyze your business performance</p>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3 col-sm-6">
                  <Link to="/provider/settings" className="card border-0 bg-light h-100 text-decoration-none text-center p-4 hover-shadow">
                    <div className="card-body">
                      <div className="mb-3">
                        <FaMoneyBillWave size={36} className="text-warning" />
                      </div>
                      <h6 className="mb-2">Manage Payments</h6>
                      <p className="text-muted mb-0 small">Track and manage your payments</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard; 