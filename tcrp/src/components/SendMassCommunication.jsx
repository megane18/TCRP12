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
  const [channel, setChannel] = useState([]);
  const [file, setFile] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const options = ["All Events", "Volunteer Day", "H.A.N.D.S"];
  const groups = ["All Members", "New Members", "Event Attendees"];

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) {
      alert("Title is missing");
      return;
    } else if (!convertedText) {
      alert("Message is missing");
      return;
    } else if (!recipientGroup) {
      alert("Please select a recipient group");
      return;
    } else if (
      recipientGroup === "eventAttendees" &&
      selectedEvent === "All Events"
    ) {
      alert("Please select an event");
      return;
    } else if (!channel) {
      alert("Please select a channel");
      return;
    }

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
                <div className="flex flex-col gap-1">
                  {groups.map((group) => {
                    return (
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="groups"
                          id={group}
                          value={group}
                          checked={recipientGroup === group}
                          onChange={(e) => setRecipientGroup(e.target.value)}
                          className="hidden" // Hide the default radio button
                        />
                        <label
                          htmlFor={group}
                          className={`flex items-center cursor-pointer ml-2 ${
                            recipientGroup === group
                              ? "text-blue-600"
                              : "text-black"
                          }`}
                        >
                          <span className="w-4 h-4 border-2 border-blue-600 rounded-full flex items-center justify-center mr-2">
                            {recipientGroup === group && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </span>
                          {group}
                        </label>
                      </div>
                    );
                  })}
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
              <div className="flex gap-4 ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailChannel"
                    checked={channel.includes("emailChannel")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setChannel((prev) => [...prev, "emailChannel"]);
                      } else {
                        setChannel((prev) =>
                          prev.filter((c) => c !== "emailChannel")
                        );
                      }
                    }}
                    className="hidden" // Hide the default checkbox
                  />
                  <label
                    htmlFor="emailChannel"
                    className={`flex items-center cursor-pointer ml-2 ${
                      channel.includes("emailChannel")
                        ? "text-blue-600"
                        : "text-black"
                    }`}
                  >
                    <span className="w-4 h-4 border-2 border-blue-600 rounded flex items-center justify-center mr-2">
                      {channel.includes("emailChannel") && (
                        <span className="w-2 h-2 bg-blue-600 rounded"></span>
                      )}
                    </span>
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smsChannel"
                    checked={channel.includes("smsChannel")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setChannel((prev) => [...prev, "smsChannel"]);
                      } else {
                        setChannel((prev) =>
                          prev.filter((c) => c !== "smsChannel")
                        );
                      }
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="smsChannel"
                    className={`flex items-center cursor-pointer ml-2 ${
                      channel.includes("smsChannel")
                        ? "text-blue-600"
                        : "text-black"
                    }`}
                  >
                    <span className="w-4 h-4 border-2 border-blue-600 rounded flex items-center justify-center mr-2">
                      {channel.includes("smsChannel") && (
                        <span className="w-2 h-2 bg-blue-600 rounded"></span>
                      )}
                    </span>
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
      </div>
    </div>
  );
};

export default SendMassCommunication;
