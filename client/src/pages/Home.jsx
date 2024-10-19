import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from '../components'

const categories = ['All', 'Technology', 'Health', 'Education', 'Environment', 'Art']

const Home = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [campaigns, setCampaigns] = useState([])
    const [filteredCampaigns, setFilteredCampaigns] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')

    const { address, contract, getCampaigns } = useStateContext()
    
    const fetchCampaigns = async () => {
        setIsLoading(true)
        const campaigns = await getCampaigns()
        setCampaigns(campaigns)
        setFilteredCampaigns(campaigns) 
        setIsLoading(false)
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
        if (category === 'All') {
            setFilteredCampaigns(campaigns)
        } else {
            const filtered = campaigns.filter(campaign => campaign.category === category)
            setFilteredCampaigns(filtered)
        }
    }

    useEffect(() => {
        if (contract) fetchCampaigns()
    }, [address, contract])

    return (
        <div className="w-full">
            {/* Category Filter */}
            <div className="flex justify-center space-x-4 my-6">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 rounded-full transition-colors ${
                            selectedCategory === category
                                ? 'bg-[#5E17EB] text-white'  // Active category button with neon purple
                                : 'bg-[#1E1E2F] text-[#6C6CFF] hover:bg-[#5E17EB] hover:text-white' // Dark background with neon blue text for inactive
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Display Campaigns */}
            <DisplayCampaigns 
                isLoading={isLoading}
                campaigns={filteredCampaigns}
                title={selectedCategory === 'All' ? 'All Campaigns' : `${selectedCategory} Campaigns`}
            />
        </div>
    )
}

export default Home
