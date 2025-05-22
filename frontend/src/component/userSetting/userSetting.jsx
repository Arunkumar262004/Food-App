import React, { useState } from "react";

function UserSetting() {
    const [isOn, setIsOn] = useState(false);

    const switchStyles = {
        width: "50px",
        height: "25px",
        borderRadius: "25px",
        backgroundColor: isOn ? "#4ade80" : "#ccc", // green or gray
        display: "flex",
        alignItems: "center",
        padding: "3px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    };

    const circleStyles = {
        height: "20px",
        width: "20px",
        borderRadius: "50%",
        backgroundColor: "#fff",
        transform: isOn ? "translateX(25px)" : "translateX(0)",
        transition: "transform 0.3s ease",
    };

    return (
        <div>
            <h5 className='mb-5'>Dark Theme</h5>
            <div className='mt-4' onClick={() => setIsOn(!isOn)} style={switchStyles}>
                <div style={circleStyles}></div>
            </div>
        </div>
    );
}

export default UserSetting;
