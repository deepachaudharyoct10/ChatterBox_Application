import React from "react";

const COLORS = ["#4A6FA5", "#6B8CAE", "#5C7A99", "#7FA37F", "#B98B5E", "#A45C68", "#6E8B74", "#8067A6"];

const getColor = (name = "") => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COLORS[Math.abs(hash) % COLORS.length];
};

const getInitials = (name = "") => {
    const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase());
    return initials.join("") || "?";
};

const Avatar = ({ name, size = "w-12 h-12", textSize = "text-base" }) => (
    <div
        className={`${size} ${textSize} rounded-full font-semibold select-none`}
        style={{
            backgroundColor: getColor(name),
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        {getInitials(name)}
    </div>
);

export default Avatar;
