import React, { useState } from "react";
import Select from "react-select";
import SingleData from "./SingleData";
import GenerateReport from "./GenerateReport";

const db = window.require("electron").remote.getGlobal("database");

const InventoryList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [inInventory, setInInventory] = useState(null);
  const [searchSuccess, setSearchSuccess] = useState(null);
  const [order, setOrder] = useState({ value: 1, label: "Ascending" });

  const finder = (sortby = 1) => {
    db.find({ sapno: search })
      .sort({ date: sortby })
      .exec((err, doc) => {
        const mappedData = doc.map(
          ({
            _id,
            sapno,
            description,
            location,
            received,
            withdrawn,
            date,
          }) => {
            return {
              _id,
              sapno,
              description,
              location,
              received,
              withdrawn,
              date,
            };
          }
        );
        setData([...mappedData]);

        if (doc.length !== 0) {
          const received = doc.map((item) => parseInt(item.received));
          const withdrawn = doc.map((item) => parseInt(item.withdrawn));
          const receivedSum = received.reduce((a, b) => a + b, 0);
          const withdrawnSum = withdrawn.reduce((a, b) => a + b, 0);
          const difference = receivedSum - withdrawnSum;
          setInInventory(difference);
          setSearchSuccess(null);
        } else {
          setSearchSuccess("No data present");
          setInInventory(null);
        }
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    finder();
  };

  const deleteHandler = (id) => {
    db.remove({ _id: id }, {}, function (err, numRemoved) {
      finder();
    });
  };

  const options = [
    { value: 1, label: "Ascending" },
    { value: -1, label: "Descending" },
  ];

  return (
    <div>
      <h1>Mechanical Shop</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="search"
            aria-describedby="search"
            required
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <small id="search" class="form-text text-muted">
            Enter SAP No
          </small>
        </div>
        <center>
          <button type="submit" className="btn btn-primary search-button">
            Search
          </button>
        </center>
      </form>

      {data.length !== 0 && (
        <Select
          options={options}
          className="mt-4"
          value={order}
          onChange={(props) => {
            setOrder(props);
            finder(props.value);
          }}
        />
      )}

      <table className="table table-striped table-dark mt-4" id="unique">
        <thead>
          <tr className="d-flex">
            <th scope="col" className="col-2">
              SAP No
            </th>
            <th scope="col" className="col-4">
              Description
            </th>
            <th scope="col" className="col-1">
              Location
            </th>
            <th scope="col" className="col-1">
              Received
            </th>
            <th scope="col" className="col-1">
              Withdrawn
            </th>
            <th scope="col" className="col-2">
              Date
            </th>
            <th scope="col" className="col-1">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((items) => (
            <SingleData
              key={items._id}
              {...items}
              deleteHandler={deleteHandler}
            />
          ))}
        </tbody>
      </table>

      <center>
        {inInventory === null ? null : inInventory > 0 ? (
          <h4 style={{ color: "green" }}>In Inventory : {inInventory}</h4>
        ) : (
          <h4 style={{ color: "red" }}>In Inventory : {inInventory}</h4>
        )}
      </center>

      <center>{searchSuccess}</center>

      {data.length !== 0 ? (
        <GenerateReport name={search} data={data} inInventory={inInventory} />
      ) : null}

      {searchSuccess === null && data.length !== 0 ? (
        <center>
          <button
            type="button"
            className="btn btn-secondary search-button mb-5"
            onClick={() => {
              setData([]);
              setInInventory(null);
              setSearch("");
              setSearchSuccess(null);
            }}
          >
            Clear
          </button>
        </center>
      ) : null}
    </div>
  );
};

export default InventoryList;
