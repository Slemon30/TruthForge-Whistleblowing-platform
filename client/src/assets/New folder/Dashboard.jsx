import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import ButtonG from "./ButtonG";
import CustomModal from "./CustomModal";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const openModal = () => {
    console.log(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function handleTasking(newProject) {
    // Update projects state with the new project
    setProjects([...projects, ...newProject]);
    console.log(projects);

   }

  return (
    <>
      <Sidebar />
      <div className="m-7 flex justify-center font-bold">
        <h1 className="text-4xl pt-10">Hello User</h1>
        <div className="mt-10 ml-5">
          {/* Pass the openModal function as onClick prop */}
          <ButtonG text={"Create new Issue"} onClick={openModal} />
        </div>
      </div>

      <div className="m-7 flex justify-center">
        <h2 className="text-2xl font-semibold">Resolved Issues:</h2>
      </div>

      <CustomModal modalOpen={isModalOpen} funcHandle={closeModal} tasking={handleTasking} />
    </>
  );
}
