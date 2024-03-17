import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
import Navbar from "./Navbar";
import Modal from "./Modal";
import styles from "../style";
import Button from "./ButtonG";
import "./dashboard.css";
// import axios from 'axios';

function Dashboard({ userEmail }) {
    const location = useLocation();
    const username = location.state && location.state.username;
    const [rooms, setRooms] = useState([]); // State to store the list of rooms with statuses
    const [selectedRoom, setSelectedRoom] = useState(''); // State to store the selected room
    const [messages, setMessages] = useState([]); // State to store messages in the selected room
    const [newMessage, setNewMessage] = useState(''); // State to store the new message
    const [newIssue, setNewIssue] = useState(''); // State to store the new issue
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [description, setDescription] = useState('No Issue Selected');


    useEffect(() => {
        if (username) {
            fetchRooms();
            testPython();
        }
    }, [username]);

    const fetchRooms = async () => {
        try {
            const response = await axios.post('http://localhost:3001/get_rooms', { username });
            setRooms(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const fetchMessages = async (selectedRoom) => {
        try {
            const response = await axios.post('http://localhost:3001/fetch_messages', { room: selectedRoom });
            const newMessages = response.data.map(message => ({
                author: message.author,
                time: message.time,
                message: message.message
            }));
            setMessages(newMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchIssueDescription = async (selectedRoom) => {
        try {
            const response = await axios.post('http://localhost:3001/get_message', { query: selectedRoom });
            console.log(response.data);
            setDescription(response.data);
            // setMessages(newMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const testPython = async () => {
        await axios.get('http://localhost:5000/test')
    };

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        fetchMessages(room);
        fetchIssueDescription(room);
        console.log(room);
        // setDescription(room.);
    };

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleAddMessage = async () => {
        try {
            await axios.post('http://localhost:3001/add_message', {
                room: selectedRoom,
                author: username,
                message: newMessage
            });
            fetchMessages(selectedRoom);
            setNewMessage('');
        } catch (error) {
            console.error('Error adding message:', error);
        }
    };

    const handleNewIssueChange = (event) => {
        setNewIssue(event.target.value);
    };

    const handleAddIssue = () => {
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleIssueFormSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3001/add_issue', {
                author: username,
                issue: newIssue,
                status: "Active"
            });

            if (response.data.success) {
                fetchRooms();
                setNewIssue('');
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error adding issue:', error);
        }
    };


    return (
        <>
            {/* <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
            <h1>Hi</h1>
          </div>
        </div>
      </div> */}
            {/* {console.log({userEmail})} */}

            {console.log({ userEmail })}

            <section className="flex flex-row ">
                <div>
                    {username && <p className="login-text">Logged In as, {username}</p>}
                    {/* <div className="m-4">
                        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                            <Button text={"Create an Issue (+)"} onClick={handleAddIssue} />
                        </div>
                        <br />
                        <ul className="room-list m-3">
                            <br></br>
                            {rooms.map((room, index) => (
                                <li
                                    key={index}
                                    className="room"
                                    onClick={() => handleRoomSelect(room.room)}
                                >
                                    {room.room} - Status: {room.status}
                                </li>
                            ))}
                        </ul>
                    </div> */}
                    <div>
                        <div className="bg-slate-900 pt-16 pb-16 rounded-r-3xl text-center h-screen w-96">
                            <h2 className="text-white text-4xl font-semibold mb-4">Your Issues</h2>
                            <Button text={"Create an Issue (+)"} onClick={handleAddIssue} />
                            
                            <ul className="text-white">
                            <br></br>
                            {rooms.map((room, index) => (
                                <li
                                    key={index}
                                    className="room"
                                    onClick={() => handleRoomSelect(room.room)}
                                >
                                    {room.room} - Status: {room.status}
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={`${styles.paddingX}`}>
                    <h2 className=" justify-center font-poppins font-semibold text-[25px] xs:leading-[76.8px] leading-[66.8px] ">
                        Issue ID - {selectedRoom}
                    </h2>
                    <h2 className=" justify-center font-poppins font-semibold text-[25px] xs:leading-[76.8px] leading-[66.8px]">Message - {description}</h2>
                    <ul className="   ">
                        {messages &&
                            messages.map((message, index) => (
                                <li key={index} className="message">
                                    <p className="message-text">{message.message}</p>
                                    <div>
                                        <span className="message-author">
                                            Sent by {message.author}
                                        </span>
                                        <span className="message-time">{message.time}</span>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={handleNewMessageChange}
                        className="message-input"
                    />
                    <Button text={"Add Message"} onClick={handleAddMessage} />
                </div>

            </section>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleIssueFormSubmit}
                newIssue={newIssue}
                handleNewIssueChange={handleNewIssueChange}
            />
        </>
    );
}

export default Dashboard;
