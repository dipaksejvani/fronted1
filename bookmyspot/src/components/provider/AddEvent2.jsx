import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddEvent2 = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getcitybystate/" + id);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycity/" + id);
    setAreas(res.data.data);
  };

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    console.log(data);
    console.log(data.image[0]) //array -->0th index access..

    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("stateId",data.stateId);
    formData.append("cityId",data.cityId);
    formData.append("areaId",data.areaId);
    formData.append("image",data.image[0]);
    formData.append("userId",data.userId);



    //const res = await axios.post("/event/add", data);
    const res = await axios.post("/event/addEventWithFile", formData);
    console.log(res); //axios
    console.log(res.data); //api response
    //if else...
     navigate("/provider/myevents")
  };

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card p-4 shadow">
                    <h2 className="text-center mb-4">Add Event</h2>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="mb-3">
                            <label className="form-label">Event Name</label>
                            <input type="text" className="form-control" {...register("name")} />
                        </div>
                        {/* <div className="mb-3">
                            <label className="form-label">Event Type</label>
                            <select className="form-select" {...register("eventType")}>
                            <option value="Marriage">Marriage</option>
                            <option value="Party">Party</option>
                            <option value="Reception">Reception</option>
                            <option value="Engangement">Engangement</option>
                            </select>
                        </div> */}
                        <div className="mb-3">
                            <label className="form-label">Date</label>
                            <input type="date" className="form-control" {...register("date")} />
                        </div>
                    
                        <div className="mb-3">
                            <label className="form-label">Select State</label>
                            <select
                            className="form-select"
                            {...register("stateId")}
                            onChange={(event) => getCityByStateId(event.target.value)}
                            >
                            <option>SELECT STATE</option>
                            {states?.map((state) => (
                                <option key={state._id} value={state._id}>{state.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select City</label>
                            <select
                            className="form-select"
                            {...register("cityId")}
                            onChange={(event) => getAreaByCityId(event.target.value)}
                            >
                            <option>SELECT CITY</option>
                            {cities?.map((city) => (
                                <option key={city._id} value={city._id}>{city.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select Area</label>
                            <select className="form-select" {...register("areaId")}>
                            <option>SELECT AREA</option>
                            {areas?.map((area) => (
                                <option key={area._id} value={area._id}>{area.name}</option>
                            ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
                );
                };