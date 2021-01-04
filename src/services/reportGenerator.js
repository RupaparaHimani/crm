import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from 'axios';
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = tickets => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Question", "Answer"];
  // define an empty array of rows
  const tableRows = [];
  // for each ticket pass all its data into an array
  tickets.forEach(ticket => {
    const ticketData = [
      ticket.question,
      ticket.answer,
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Test result of "+JSON.parse(localStorage.getItem('userData')).last_name + " "+ JSON.parse(localStorage.getItem('userData')).first_name, 14, 15);
  // we define the name of our PDF file.
  // var blobPDF = doc.output('datauristring');
  // var blob = doc.output();
  // console.log("=================", typeof blob);
  // var formData = new FormData();
  // formData.append('pdf', blob);
  // axios.post(api_url+'update_pdf', {user_id: JSON.parse(localStorage.getItem('userData')).id, pdf_blob: blob, order_id: localStorage.getItem('paid_test_test_is')})
  //   .then(function (response) {
  //     console.log("success api called");
  //   })
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
