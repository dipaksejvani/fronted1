import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddEvent = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Configure axios to use the backend URL
    const API_BASE_URL = "http://localhost:3200";
    axios.defaults.baseURL = API_BASE_URL;

    useEffect(() => {
        getAllStates();
    }, []);

    const getAllStates = async () => {
        try {
            const res = await axios.get("/state/getallstates");
            setStates(res.data.data || []);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };
    
    const getCityByStateId = async (id) => {
        try {
            const res = await axios.get("/city/getcitybystate/" + id);
            setCities(res.data.data || []);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    
    const getAreaByCityId = async (id) => {
        try {
            const res = await axios.get("/area/getareabycity/" + id);
            setAreas(res.data.data || []);
        } catch (error) {
            console.error("Error fetching areas:", error);
        }
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitHandler = async (data) => {
        try {
            setIsLoading(true);
            // Get the user ID from localStorage
            data.userId = localStorage.getItem("id");
            
            // Create form data for file upload if needed
            const formData = new FormData();
            
            // Append all form fields to formData
            Object.keys(data).forEach(key => {
                if (key === 'image' && data[key][0]) {
                    formData.append(key, data[key][0]);
                } else {
                    formData.append(key, data[key]);
                }
            });
            
            // Send the data to the backend
            const res = await axios.post("/event/addevent", data);
            
            if (res.data.status) {
                navigate("/provider/events");
            } else {
                console.error("Error adding event:", res.data.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">Add New Event</h1>
            </div>
            
            <div className="row">
                <div className="col-md-8">
                    <div className="mb-4">
                        <h5 className="mb-3">Event Details</h5>
                        
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="mb-3">
                                <label className="form-label">Event Name</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Enter event name" 
                                    {...register("name", { required: "Event name is required" })} 
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Event Type</label>
                                <select className={`form-select ${errors.eventType ? 'is-invalid' : ''}`} {...register("eventType", { required: "Event type is required" })}>
                                    <option value="">Select Event Type</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Birthday">Birthday</option>
                                    <option value="Conference">Conference</option>
                                    <option value="Party">Party</option>
                                    <option value="Reception">Reception</option>
                                    <option value="Engagement">Engagement</option>
                                </select>
                                {errors.eventType && <div className="invalid-feedback">{errors.eventType.message}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Date</label>
                                <input 
                                    type="date" 
                                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                    {...register("date", { required: "Date is required" })} 
                                />
                                {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                            </div>
                        
                            <div className="mb-3">
                                <label className="form-label">Select State</label>
                                <select
                                    className={`form-select ${errors.stateId ? 'is-invalid' : ''}`}
                                    {...register("stateId", { required: "State is required" })}
                                    onChange={(event) => getCityByStateId(event.target.value)}
                                >
                                    <option value="">SELECT STATE</option>
                                    {states?.map((state) => (
                                        <option key={state._id} value={state._id}>{state.name}</option>
                                    ))}
                                </select>
                                {errors.stateId && <div className="invalid-feedback">{errors.stateId.message}</div>}
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Select City</label>
                                <select
                                    className={`form-select ${errors.cityId ? 'is-invalid' : ''}`}
                                    {...register("cityId", { required: "City is required" })}
                                    onChange={(event) => getAreaByCityId(event.target.value)}
                                >
                                    <option value="">SELECT CITY</option>
                                    {cities?.map((city) => (
                                        <option key={city._id} value={city._id}>{city.name}</option>
                                    ))}
                                </select>
                                {errors.cityId && <div className="invalid-feedback">{errors.cityId.message}</div>}
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Select Area</label>
                                <select 
                                    className={`form-select ${errors.areaId ? 'is-invalid' : ''}`}
                                    {...register("areaId", { required: "Area is required" })}
                                >
                                    <option value="">SELECT AREA</option>
                                    {areas?.map((area) => (
                                        <option key={area._id} value={area._id}>{area.name}</option>
                                    ))}
                                </select>
                                {errors.areaId && <div className="invalid-feedback">{errors.areaId.message}</div>}
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Venue Capacity</label>
                                <input 
                                    type="number" 
                                    className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
                                    placeholder="Number of guests" 
                                    {...register("capacity", { 
                                        required: "Capacity is required",
                                        min: { value: 1, message: "Capacity must be at least 1" }
                                    })} 
                                />
                                {errors.capacity && <div className="invalid-feedback">{errors.capacity.message}</div>}
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea 
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    rows="3" 
                                    placeholder="Enter event description" 
                                    {...register("description", { required: "Description is required" })}
                                ></textarea>
                                {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Event Image</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    {...register("image")} 
                                />
                            </div>
                            
                            <div className="mt-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary px-5"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating...' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="bg-light p-4 rounded">
                        <h5 className="mb-3">Tips for Creating Events</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">✓ Choose a clear, descriptive name</li>
                            <li className="mb-2">✓ Select the correct event type</li>
                            <li className="mb-2">✓ Provide accurate location details</li>
                            <li className="mb-2">✓ Set a realistic venue capacity</li>
                            <li className="mb-2">✓ Add a detailed description</li>
                            <li className="mb-2">✓ Upload a high-quality image</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};