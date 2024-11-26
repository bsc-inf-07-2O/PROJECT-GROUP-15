import React, { useState } from "react";
import Navbar from './NavBar';
import Footer from './footer';

const MessageList = ({ messages, handleSelect }) => {
  return (
    <div className="bg-gray-50 border-r border-gray-200 p-4 w-full lg:w-1/3 sm:mx-auto">
      <h2 className="text-xl font-semibold mb-4">Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li
            key={index}
            className="mb-4 cursor-pointer"
            onClick={() => handleSelect(msg)}
          >
            <h3 className="font-semibold text-gray-700">{msg.title}</h3>
            <p className="text-gray-500 truncate">{msg.content}</p>
            <span className="text-gray-400 text-sm">{msg.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MessageDetail = ({ selectedMessage }) => {
  return (
    <div className="w-full lg:w-2/3 p-4 sm:mx-auto flex-center item-center">
      {selectedMessage ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">{selectedMessage.title}</h2>
          <p className="text-gray-700">{selectedMessage.content}</p>
          <span className="text-gray-400">{selectedMessage.time}</span>
        </>
      ) : (
        <p className="text-gray-500 ">Select a message to view</p>
      )}
    </div>
  );
};

const BondingMessage = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const messages = [
    { title: "Proceed to deposit application fees", content: "You have successfully submitted your loan application...", time: "08:43PM" },
    { title: "Proceed to deposit application fees", content: "You have successfully submitted your loan application...", time: "08:56AM" },
    { title: "Bank account changed", content: "This is to let you know that your bank account details have changed.", time: "10:23AM" },
    { title: "Welcome", content: "Dear JOEL GANIZANI, Welcome to Student...", time: "02:33PM" },
  ];

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col sm:flex-col lg:flex-row lg:ml-16 sm:items-center">
      
        <MessageList messages={messages} handleSelect={handleSelectMessage} />
        
       
        <MessageDetail selectedMessage={selectedMessage} />
      </div>
      <Footer />
    </div>
  );
};

export default BondingMessage;
