import Sidebar from "./Sidebar";
import ButtonG from "./ButtonG";
export default function Home() {
  
  
  return (
    <>
      <Sidebar />
      <div className="mt-7 flex justify-center text-center">
        <h1 className=" text-8xl mt-20 pt-10">TruthFORDGE</h1>
      </div>
      <div className="mt-7 flex justify-center text-center">
        <ButtonG text={"Connect ->"} ></ButtonG>
      </div>
    </>
    

  );
}

