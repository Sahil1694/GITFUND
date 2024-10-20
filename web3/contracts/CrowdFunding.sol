// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        uint256 votes;
        string category;
        address[] donators;
        uint256[] donations;
    }

    struct User {
    bool hasVoted;                           // Indicates if the user has voted for any campaign
    mapping(string => bool) votesByCategory; // Tracks whether the user has voted in specific categories by name
    }

    struct Category {
        uint256 numberOfEntries;
        string name;
        Campaign[] campaigns;
    }

    struct Winner {
        string category;
        string title;
        address owner;
        uint256 amountCollected;
    }

    mapping(string => Category) public categories; // Mapping of categories to campaigns
    mapping(uint256 => Campaign) public campaigns; // Mapping of campaign IDs to campaigns
    mapping(address => User) public users; // Mapping of user addresses to their voting status

    uint256 public numberOfCampaigns = 0; // Total number of campaigns

    event CampaignCreated(uint256 indexed campaignId, address indexed owner);
    event DonationReceived(uint256 indexed campaignId, address indexed donator, uint256 amount);

    // Create a new campaign
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image,
        string memory _category
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.votes = 0;
        campaign.category = _category;

        categories[_category].campaigns.push(campaign);
        categories[_category].numberOfEntries++;

        emit CampaignCreated(numberOfCampaigns, _owner); // Emit event for campaign creation
        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    // Donate to a campaign
    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];

        require(campaign.deadline >= block.timestamp, "Campaign has expired and cannot accept donations.");
        require(campaign.amountCollected < campaign.target, "Campaign has reached its target and cannot accept more donations.");

        uint256 amount = msg.value;

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        require(sent, "Failed to send Ether"); // Ensure the Ether transfer was successful

        campaign.amountCollected += amount;

        // Allow the user to vote only if they haven't voted yet
        if (!users[msg.sender].hasVoted || !users[msg.sender].votesByCategory[campaign.category]) {
            campaign.votes += 1;
            users[msg.sender].hasVoted = true; // Set haveVote to true after voting
            users[msg.sender].votesByCategory[campaign.category] = true; // Set haveVote to true for the category
        }

        emit DonationReceived(_id, msg.sender, amount); // Emit event for donation
    }

    // Get list of donators and their donations for a campaign
    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    // Get all campaigns
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }

    // Get all categories
    function getCategories() public view returns (Category[] memory) {
        uint256 categoryCount = 0;

        // Count the number of categories
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            if (bytes(campaigns[i].category).length > 0) {
                categoryCount++;
            }
        }

        Category[] memory allCategories = new Category[](categoryCount);
        uint256 index = 0;

        // Populate allCategories with existing categories
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            string memory categoryName = campaigns[i].category;
            if (bytes(categoryName).length > 0) {
                allCategories[index] = categories[categoryName];
                index++;
            }
        }

        return allCategories;
    }

    // Get winners by category
    function getWinnersByCategory() public view returns (Winner[] memory) {
        Winner[] memory winners = new Winner[](numberOfCampaigns);
        uint256 winnerCount = 0;

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];

            if (campaign.amountCollected >= campaign.target) {
                bool categoryExists = false;
                for (uint256 j = 0; j < winnerCount; j++) {
                    if (keccak256(abi.encodePacked(winners[j].category)) == keccak256(abi.encodePacked(campaign.category))) {
                        categoryExists = true;
                        // Update the existing winner if this campaign has a higher amount collected
                        if (campaign.amountCollected > winners[j].amountCollected) {
                            winners[j] = Winner(campaign.category, campaign.title, campaign.owner, campaign.amountCollected);
                        }
                        break;
                    }
                }

                // If the category does not exist in winners, add it
                if (!categoryExists) {
                    winners[winnerCount] = Winner(campaign.category, campaign.title, campaign.owner, campaign.amountCollected);
                    winnerCount++;
                }
            }
        }

        // Create a final array to return winners with the correct size
        Winner[] memory finalWinners = new Winner[](winnerCount);
        for (uint256 k = 0; k < winnerCount; k++) {
            finalWinners[k] = winners[k];
        }

        return finalWinners;
    }
}