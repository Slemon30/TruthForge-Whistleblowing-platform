import logo from "./no-projects.png";
import CustomModal from "./CustomModal";
import { useState } from "react";
export default function NoProject({tasks,headp,namig}) {

    const[isOpen, setIsOpen]= useState(false);

    function modalHandler(){
        console.log("yes");
        setIsOpen((prevOpn)=> !prevOpn);
    }

    return (
        <div className="flex justify-center items-center w-3/4 h-1/2 mt-40">
            <div className="text-center" >
                {headp && <h2 className="text-4xl mb-4 mt-8 text-start">Hello {namig} </h2> }
                <img src={logo} alt="" className="w-16 h-auto" />
                <h2 className="text-4xl mb-4 mt-8">No Projects</h2>
                
                <p className=" mt-8 mb-8">Select a project or get Started with new one</p>
                <button className="bg-slate-900 opacity-90 p-4 rounded-lg text-white" onClick={modalHandler}>+ Add Your Project</button>
                <CustomModal modalOpen={isOpen} funcHandle={modalHandler} tasking={tasks} />
            </div>
        </div>
    );
}
