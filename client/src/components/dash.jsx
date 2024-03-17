import Navbar from "./Navbar";
import styles from '../style';
import Dashboard from "./dashboard";
import { User } from "@auth0/auth0-react";
import { useState } from "react";
function dash() {
    const [isEmail, setEmail] = useState("");
    const handleEmail = (email) => {
        setEmail(email);
    };
    return (
        <>
            <div className="bg-primary w-full overflow-hidden">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar handleEmail={handleEmail} />
                        <h1>Hi</h1>
                    </div>
                </div>
            </div>
            <Dashboard userEmail={isEmail} />
        </>
    )
}
export default dash;