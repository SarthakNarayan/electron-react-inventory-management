import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const GenerateReport = ({ name, data, inInventory }) => {
  const exportPdf = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = `Report of ${name}. Inventory status: ${inInventory}`;
    const headers = [
      ["SAPNO", "DESCRIPTION", "LOCATION", "RECEIVED", "WITHDRAWN", "DATE"],
    ];

    const finalData = data.map((item) => [
      item.sapno,
      item.description,
      item.location,
      item.received,
      item.withdrawn,
      item.date,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: finalData,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(`${name}.pdf`);
  };
  return (
    <div>
      <center>
        <button className="btn btn-success" onClick={exportPdf}>
          Export
        </button>
      </center>
    </div>
  );
};

export default GenerateReport;
