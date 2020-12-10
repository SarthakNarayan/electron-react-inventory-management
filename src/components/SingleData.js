import React from "react";

const SingleData = ({
  _id,
  sapno,
  description,
  received,
  withdrawn,
  date,
  deleteHandler,
}) => {
  return (
    <tr className="d-flex" style={{ wordWrap: "break-word" }}>
      <td className="col-2">{sapno}</td>
      <td className="col-5">{description} </td>
      <td className="col-1">{received}</td>
      <td className="col-1">{withdrawn}</td>
      <td className="col-2">{date}</td>
      <td className="col-1">
        <button onClick={() => deleteHandler(_id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SingleData;
