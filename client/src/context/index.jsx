import React, { createContext, useContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xe56a12e5439d124FB44D248f86e83Bf8Bc992E35"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      console.log("Publishing campaign with the following data:", {
        address,
        title: form.title,
        description: form.description,
        target: form.target, // Log target value
        deadline: Math.floor(new Date(form.deadline).getTime() / 1000),
        image: form.image,
        category: form.category,
      });
  
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          ethers.utils.parseEther(form.target.toString()), // Ensure target is a string
          Math.floor(new Date(form.deadline).getTime() / 1000),
          form.image,
          form.category,
        ],
      });
  
      console.log("Contract Call Successful", data);
    } catch (error) {
      console.error("Contract Call Error", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber() * 1000, // Convert to milliseconds for JS Date
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      votes: campaign.votes.toNumber(), // Include votes
      category: campaign.category,
      pId: i,
    }));

    return parsedCampaigns;
  };

  const deleteUserCampaigns = async (campaignId) => {
    try {
      await contract.call("deleteCampaign", [campaignId]);
    } catch (error) {
      console.error("Error deleting user campaign:", error);
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const userCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return userCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const getWinnersByCategory = async () => {
    const winners = await contract.call("getWinnersByCategory");
    
    const parsedWinners = winners.map((winner) => ({
      category: winner.category,
      title: winner.title,
      owner: winner.owner,
      amountCollected: ethers.utils.formatEther(winner.amountCollected.toString()),
    }));

    return parsedWinners;
  };

  const getNumberOfCampaigns = async (user) => {
    const allCampaigns = await getCampaigns();

    const userCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === user
    );

    return userCampaigns.length;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        getWinnersByCategory, // Expose the new function
        getNumberOfCampaigns,
        deleteUserCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
