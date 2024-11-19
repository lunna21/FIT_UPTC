import React from "react";

const TurnCard = ({ turnName, startTime, endTime, color = "default", height, isActive=true }) => {

    const bgColorCard = {
        // default - blue - purple - orangle.
        default: "bg-neutral-gray-medium",
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        orange: "bg-orange-500",
    }

    // entra con un string en formato HH:MM:SS y retorna un string en formato HH:MM AM/PM
    const getFormatHour = (hour) => {
        const [h, m] = hour.split(":");
        const amPm = h >= 12 ? "PM" : "AM";
        const newHour = h > 12 ? h - 12 : h;
        return `${newHour}:${m} ${ amPm }`;
    };

    return (
        <div
            className={`p-4 rounded-lg shadow-md text-blanck flex flex-col justify-center items-center cursor-pointer ${bgColorCard[color]} ${!isActive && "bg-gray-600 text-gray-400"}`}
            style={{ height: height }}
        >
            <h3 className="text-sm font-bold">{turnName}</h3>
            <p className="text-[10px] font-semibold">
                {getFormatHour(startTime)} - {getFormatHour(endTime)}
            </p>
        </div>
    );
};

export default TurnCard;
