import { getFormatHour } from "@/utils/utils";

const TurnCard = ({ turnName, startTime, endTime, color = "default", height, isActive=true }) => {

    const bgColorCard = {
        // default - blue - purple - orangle.
        default: "bg-neutral-gray-medium",
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        orange: "bg-orange-500",
    }

    return (
        <div
            className={`p-4 rounded-lg shadow-md text-black flex flex-col justify-center items-center ${bgColorCard[color]} ${!isActive && "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
            style={{ height: height, opacity: isActive ? 1 : 0.5 }}
        >
            <h3 className="text-sm font-bold">{turnName}</h3>
            <p className="text-[10px] font-semibold">
                {getFormatHour(startTime)} - {getFormatHour(endTime)}
            </p>
        </div>
    );
};

export default TurnCard;
