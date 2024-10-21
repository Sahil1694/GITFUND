import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { FundCard } from "./";

const DisplayCampaigns = ({ isLoading, campaigns, title }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div className="bg-gradient-to-r from-[#282c34] to-[#1c1c24] p-6 rounded-lg shadow-lg">
      <h1 className="font-epilogue font-semibold text-[24px] text-[#f0f0f0] mb-4 border-b-2 border-[#8c6dfd] pb-2">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-4 gap-6">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[80px] h-[80px] object-contain mx-auto animate-spin"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[16px] text-[#ccc]">
            No campaigns available at the moment.
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>

      {/* Additional visual interest */}
      <div className="mt-6 text-center">
        <p className="text-[#8c6dfd] italic">Support a campaign today!</p>
      </div>
    </div>
  );
};

export default DisplayCampaigns;
