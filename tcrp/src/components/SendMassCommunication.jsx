import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Header from "./Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";
const SendMassCommunication = () => {
  const [convertedText, setConvertedText] = useState(
    "Compose your message here"
  );
  const [title, setTitle] = useState("");
  const [recipientGroup, setRecipientGroup] = useState("allMembers");
  const [selectedEvent, setSelectedEvent] = useState("All Events");
  const [channel, setChannel] = useState("emailChannel");
  const [file, setFile] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const options = ["All Events", "Volunteer Day", "H.A.N.D.S"];
  const defaultOption = options[0];

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh
    const formData = {
      title,
      message: convertedText,
      recipientGroup,
      selectedEvent,
      channel,
      file,
      scheduleDate,
    };
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className=" flex flex-col h-screen w-screen bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <Header />
      <div className="mt-28 mx-2 flex-grow rounded-xl p-4 flex flex-col overflow-auto gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <div className="text-black flex flex-col text-start">
            <h2 className="font-bold text-3xl">Send Mass Communication</h2>
            <h4>Reach out to your community members efficiently</h4>
          </div>
          <div>
            <p className="text-start text-gray-500">Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white rounded-md w-full h-10 text-black p-1"
              placeholder="Subject title"
            />
          </div>
          <div>
            <p className="text-start text-gray-500">Message</p>
            <ReactQuill
              theme="snow"
              className="bg-white rounded-md text-black"
              value={convertedText}
              onChange={setConvertedText}
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
          <div>
            <p className="text-start text-gray-500">Select Recipients</p>
            <div className="bg-white w-full rounded-md flex p-2 flex-row justify-between">
              <div className="flex flex-col">
                <h3 className="text-black text-start">Groups</h3>
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="groups"
                      id="allMembers"
                      value="allMembers"
                      checked={recipientGroup === "allMembers"}
                      onChange={(e) => setRecipientGroup(e.target.value)}
                    />
                    <label htmlFor="allMembers" className="text-black ml-2">
                      All Members
                    </label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="groups"
                      id="newMembers"
                      value="newMembers"
                      checked={recipientGroup === "newMembers"}
                      onChange={(e) => setRecipientGroup(e.target.value)}
                    />
                    <label htmlFor="newMembers" className="text-black ml-2">
                      New Members
                    </label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="groups"
                      id="eventAttendees"
                      value="eventAttendees"
                      checked={recipientGroup === "eventAttendees"}
                      onChange={(e) => setRecipientGroup(e.target.value)}
                    />
                    <label htmlFor="eventAttendees" className="text-black ml-2">
                      Event Attendees
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-black text-start">Events</h3>
                <Dropdown
                  options={options}
                  value={selectedEvent}
                  onChange={(option) => setSelectedEvent(option.value)}
                  placeholder="Select an Event"
                  className="w-30"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-start text-gray-500">Channel Selection</p>
            <div className="bg-white w-full rounded-md flex p-2 flex-row justify-between">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="channel"
                    id="emailChannel"
                    value="emailChannel"
                    checked={channel === "emailChannel"}
                    onChange={(e) => setChannel(e.target.value)}
                  />
                  <label htmlFor="emailChannel" className="text-black ml-2">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="channel"
                    id="smsChannel"
                    value="smsChannel"
                    checked={channel === "smsChannel"}
                    onChange={(e) => setChannel(e.target.value)}
                  />
                  <label htmlFor="smsChannel" className="text-black ml-2">
                    SMS
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 mt-4">
            <div className="justify-start flex">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-md h-10 p-2"
              >
                Send
              </button>
            </div>

            <div className="flex">
              <DatePicker
                selected={scheduleDate}
                onChange={(date) => setScheduleDate(date)}
                showTimeSelect
                className="bg-blue-600 rounded-md w-full p-2 text-white"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </div>
        </form>
        <footer className="bg-gray-800 text-white p-8 rounded-lg">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-300 transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-300 transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-300 transition duration-300"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-300 transition duration-300"
                  >
                    Volunteer
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-300 transition duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p>(404) 207-8517</p>
              <p>3726 East Main Street</p>
              <p>College Park, GA 30337</p>
              <p>P.O. Box 211, Fairburn, GA 30213</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 text-2xl mb-4">
                <a
                  href="#"
                  className="hover:text-blue-300 transition duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="hover:text-blue-300 transition duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="hover:text-blue-300 transition duration-300"
                >
                  <FaYoutube />
                </a>
                <a
                  href="#"
                  className="hover:text-blue-300 transition duration-300"
                >
                  <FaLinkedin />
                </a>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold w-full mb-2">
                Donate
              </button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-gray-800 transition duration-300 text-lg font-semibold w-full">
                Report an issue
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SendMassCommunication;
