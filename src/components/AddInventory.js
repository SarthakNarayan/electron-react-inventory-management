import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const db = window.require("electron").remote.getGlobal("database");

const initialInput = {
  sapno: "",
  description: "",
  location: "",
  received: 0,
  withdrawn: 0,
};

const AddInventory = () => {
  const [input, setInput] = useState(initialInput);
  const [date, setDate] = useState(new Date());

  const submitHandler = (e) => {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    const dateSimple = `${year}-${month}-${day}`;

    e.preventDefault();
    db.insert({
      sapno: input.sapno,
      description: input.description,
      location: input.location,
      received: input.received,
      withdrawn: input.withdrawn,
      date: dateSimple,
    });
    setInput(initialInput);
  };

  const inputCapture = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div>
      <h1>Add to Inventory</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group">
          <label htmlFor="sapno">SAP Number</label>
          <input
            type="text"
            className="form-control"
            id="sapno"
            aria-describedby="sapno"
            required
            name="sapno"
            onChange={(e) => inputCapture(e)}
            value={input.sapno}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            aria-describedby="description"
            required
            name="description"
            onChange={(e) => inputCapture(e)}
            value={input.description}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            aria-describedby="location"
            name="location"
            onChange={(e) => inputCapture(e)}
            value={input.location}
          />
        </div>

        <div className="form-group">
          <label htmlFor="received">Received</label>
          <input
            type="number"
            className="form-control"
            id="received"
            aria-describedby="received"
            required
            name="received"
            onChange={(e) => inputCapture(e)}
            value={input.received}
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="received">Withdrawn</label>
          <input
            type="number"
            className="form-control"
            id="withdrawn"
            aria-describedby="withdrawn"
            required
            name="withdrawn"
            onChange={(e) => inputCapture(e)}
            value={input.withdrawn}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <br />
          <DatePicker
            onChange={(date) => setDate(date)}
            selected={date}
            className="form-control"
          />
        </div>

        <center>
          <button type="submit" className="btn btn-primary">
            Add Item
          </button>
        </center>
      </form>
    </div>
  );
};

export default AddInventory;
