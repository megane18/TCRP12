import React, { useState, useRef } from "react";
import "react-dropdown/style.css";
import { XIcon } from "lucide-react";
import Editor from "./Editor";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";

const SendMassCommunication = ({ close }) => {
  const [convertedText, setConvertedText] = useState("");
  const [title, setTitle] = useState("");
  const [recipientGroup, setRecipientGroup] = useState("allMembers");
  const [selectedValue, setSelectedValue] = useState("All Events");
  const [channel, setChannel] = useState([]);
  const [file, setFile] = useState(null);

  const [readOnly, setReadOnly] = useState(false);
  const quillRef = useRef();

  const [scheduleDate, setScheduleDate] = useState(
    new Date().toISOString().slice(0, 16)
  );

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
      selectedValue === "All Events"
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
      selectedValue,
      channel,
      file,
      scheduleDate,
    };
    console.log("Form Data Submitted:", formData);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="p-4 bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg">
      <div className="justify-center  rounded-lg ">
        <button
          onClick={() => handleRemoveEvent(event.id)}
          className="absolute top-2 right-2 bg-white border-1 border-black flex items-center justify-center p-0.5 rounded-lg hover:bg-red-100  "
        >
          <XIcon size={24} color="red" onClick={close} />
        </button>
      </div>
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
            className="border border-gray-300 bg-gray-100 rounded-md w-full h-10 text-black p-1"
            placeholder="Subject title"
          />
        </div>
        <div>
          <p className="text-start text-gray-500">Message</p>

          <div className="border border-gray-300 rounded-lg overflow-hidden w-full max-w-2xl">
            <Editor ref={quillRef} className="h-64 p-4" readOnly={readOnly} />
          </div>
          <style jsx>{`
            .ql-editor {
              max-height: 100px;
              color: black;
              padding: 1rem;
              background: white;
            }
            .ql-toolbar {
              background: #f7f7f7;
              border: 1px solid #ccc;
              border-radius: 4px 4px 0 0;
              padding: 8px;
            }
          `}</style>
        </div>

        <div className="flex align-middle">
          <label className="bg-blue-600 text-white rounded-md h-10 p-2 cursor-pointer">
            Attach File
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
          {file && <p className="ml-2 text-gray-600 mt-2">{file.name}</p>}
        </div>
        <div>
          <p className="text-start text-gray-500">Select Recipients</p>
          <div className="border border-gray-300 bg-white w-full rounded-md flex p-2 flex-row justify-between">
            <div className="flex flex-col">
              <h3 className="text-black text-start">Groups</h3>
              <div className="flex flex-col gap-1">
                {groups.map((group, index) => {
                  return (
                    <div className="flex items-center" key={index}>
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
              <select
                value={selectedValue}
                onChange={handleChange}
                className="bg-white text-black border-2 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2  focus:border-none "
              >
                {options.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div>
          <p className="text-start text-gray-500">Channel Selection</p>
          <div className="border border-gray-300 bg-white w-full rounded-md flex p-2 flex-row justify-between">
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

        <input
          type="datetime-local"
          name="Date"
          value={scheduleDate} // Make sure scheduleDate is in "yyyy-MM-dd" format
          onChange={(event) => {
            setScheduleDate(event.target.value); // Use event.target.value to get the date string
          }}
          className="border border-gray-300 p-2 rounded-lg w-full mb-4 bg-gray-100 text-gray-500"
        />

        <div className="flex flex-row gap-2 mt-4">
          <div className="justify-start flex">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md h-10 p-2"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendMassCommunication;
