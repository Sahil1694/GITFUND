import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

import { logo, money } from "../assets";
import { navlinks } from "../constants";

const Icon = ({ styles, name, imgUrl, isActive, handleClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative w-[48px] h-[48px] rounded-[10px] ${
        isActive ? "bg-[#2c2f32]" : ""
      } flex justify-center items-center cursor-pointer ${styles}`}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {name === "money" && showTooltip && (
        <span className="tooltip absolute top-[30px] left-[50%] transform translate-x-[-50%] bg-white p-2 rounded shadow-md">
          Donate
        </span>
      )}
      <img
        src={imgUrl}
        alt={name}
        className={`w-1/2 h-1/2 ${isActive ? "" : "grayscale"}`}
      />
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("logo"); // Change initial active state to "logo"
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32]"
          imgUrl={logo}
          name="logo" // Add name to differentiate the logo
          isActive={isActive === "logo"} // Check if the logo is active
          handleClick={() => {
            setIsActive("logo"); // Update the active state to logo on click
            navigate("/"); // Navigate to home on logo click
          }}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <div
              key={link.name}
              className="tooltip-container"
              onMouseEnter={() => setHoveredIcon(link.name)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Icon
                {...link}
                isActive={isActive === link.name}
                handleClick={() => {
                  setIsActive(link.name);
                  if (link.name === "dashboard") {
                    navigate("/home"); // Navigate to /home on Dashboard click
                  } else {
                    navigate(link.link); // Navigate to other links
                  }
                }}
              />
              {hoveredIcon === link.name && (
                <span className="tooltip">{link.name}</span>
              )}
            </div>
          ))}
          <Icon
            styles="w-[52px] h-[52px]"
            imgUrl={money}
            name="money"
            isActive={isActive === "money"} // Check if money icon is active
            handleClick={() => {
              setIsActive("money"); // Update active state to money
              navigate("/news"); // Navigate to /news on money icon click
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
