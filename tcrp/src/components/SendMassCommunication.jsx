import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Footer from "./Footer";
import Header from "./Header";

const SendMassCommunication = () => {
  const [convertedText, setConvertedText] = useState("Message");
  const options = ["All Events", "Volunteer Day", "H.A.N.D.S"];
  const defaultOption = options[0];
  return (
    <div className="bg-white flex flex-col h-screen w-screen">
      <Header />
      <div className="bg-[#B7C9D3] mt-6 mx-2 overflow-hidden rounded-xl p-2 flex flex-col">
        <div className="text-black flex flex-col text-start">
          <h2 className="font-bold text-xl">Send Mass Communication</h2>
          <h4>Reach out to your community members efficiently</h4>
        </div>
        <div className="w-full gap-5 flex flex-col mt-4">
          <div>
            <p className="text-start text-gray-500">Title</p>
            <input
              type="text"
              className="bg-white rounded-md w-full h-10 text-black p-1"
              placeholder="Subject title"
            />
          </div>
          <div>
            <p className="text-start text-gray-500">Message</p>
            <ReactQuill
              theme="snow"
              className="min-h-100 bg-white rounded-md text-black"
              value={convertedText}
              onChange={setConvertedText}
            />
          </div>
          <div className="justify-start flex">
            <button className="bg-black text-white rounded-md h-10 p-2">
              Attach File
            </button>
          </div>
          <div>
            <p className="text-start text-gray-500">Select Recipients</p>
            <div className="bg-white w-full rounded-md flex p-2 flex-row justify-between">
              <div className="flex flex-col">
                <h3 className="text-black text-start">Groups</h3>
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <input type="radio" name="groups" id="allMembers" />
                    <label htmlFor="allMembers" className="text-black ml-2">
                      All Members
                    </label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input type="radio" name="groups" id="newMembers" />
                    <label htmlFor="newMembers" className="text-black ml-2">
                      New Members
                    </label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input type="radio" name="groups" id="eventAttendees" />
                    <label htmlFor="eventAttendees" className="text-black ml-2">
                      Event Attendees
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-black text-start">Events</h3>
                <div>
                  <Dropdown
                    options={options}
                    value={defaultOption}
                    placeholder="Select an Event"
                    className="w-30"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-start text-gray-500">Channel selection</p>
            <div className="bg-white w-full rounded-md flex p-2 flex-row justify-between">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input type="radio" name="channel" id="allMembers" />
                  <label htmlFor="allMembers" className="text-black ml-2">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="channel" id="newMembers" />
                  <label htmlFor="newMembers" className="text-black ml-2">
                    SMS
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="justify-start flex">
              <button className="bg-black text-white rounded-md h-10 p-2">
                Send Now
              </button>
            </div>
            <div className="justify-start flex">
              <button className="bg-black text-white rounded-md h-10 p-2">
                Schedule
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SendMassCommunication;
