import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Header from "./Header";
import "react-datepicker/dist/react-datepicker.css";
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";

const RequestForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [requestType, setRequestType] = useState("Request Type");
  const [file, setFile] = useState(null);

  const options = ["Join Community", "Event Information", "Report Issue"];

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      alert("Please enter your name");
      return;
    } else if (!email) {
      alert("Please enter your email");
      return;
    } else if (!phone) {
      alert("Please enter your phone number");
      return;
    } else if (!message) {
      alert("Please enter your message");
      return;
    } else if (requestType === "Request Type") {
      alert("Please select a request type");
      return;
    }

    const formData = {
      name,
      email,
      phone,
      message,
      requestType,
      file,
    };
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className=" flex flex-col h-screen w-screen bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <Header />
      <div className="mt-28 mx-2 rounded-xl p-4 flex flex-col overflow-auto gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <div className="text-black flex flex-col text-start">
            <h2 className="font-bold text-3xl">Request Form</h2>
          </div>
          <div>
            <p className="text-start text-gray-500">Full Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white rounded-md w-full h-10 text-black p-1"
              placeholder="Full Name"
            />
          </div>
          <div>
            <p className="text-start text-gray-500">Email Address</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white rounded-md w-full h-10 text-black p-1"
              placeholder="Email Address"
            />
          </div>
          <div>
            <p className="text-start text-gray-500">Phone Number</p>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white rounded-md w-full h-10 text-black p-1"
              placeholder="Phone Number"
            />
          </div>
          <div>
            <p className="text-start text-gray-500">Request Type</p>
            <Dropdown
              options={options}
              value={requestType}
              onChange={(option) => setRequestType(option.value)}
              placeholder="Select an Event"
              className="w-30"
            />
          </div>
          <div>
            <p className="text-start text-gray-500">Message Box</p>
            <textarea
              className="bg-white text-black flex  w-full min-h-20"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex align-middle">
            <label className="bg-blue-600 text-white rounded-md h-10 p-2 cursor-pointer">
              Attach File
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file && <p className="ml-2 text-gray-600 mt-2">{file.name}</p>}
          </div>

          <div className="flex flex-row gap-2 mt-4 justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md h-10 p-2 w-40"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
