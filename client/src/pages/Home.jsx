import React, { useState, useEffect, useRef } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const { address, contract, getCampaigns, getCategories, getCampaignsByCategory, getTotalVotes } = useStateContext();
  
  const [uniqueDonations, setUniqueDonations] = useState(0);
  const [projectsRaisedFunds, setProjectsRaisedFunds] = useState(0); // Initialize projectsRaisedFunds with state
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  // Fetch the votes count when the component mounts
  useEffect(() => {
    const fetchVotesCount = async () => {
      try {
        const totalVotes = await getTotalVotes();
        setUniqueDonations(totalVotes);
      } catch (error) {
        console.error("Error fetching total votes:", error);
      }
    };
    
    fetchVotesCount();
  }, [getTotalVotes]);

  // Fetch Campaigns
  const fetchCampaigns = async () => {
    setIsLoading(true);
    
    let campaigns;
    if (selectedCategory) {
      campaigns = await getCampaignsByCategory(selectedCategory);
    } else {
      campaigns = await getCampaigns();
    }
    
    setCampaigns(campaigns);
    setIsLoading(false);
  };

  // Fetch Categories
  const fetchCategories = async () => {
    const categoriesList = await getCategories();
    setCategories(categoriesList);
  };

  // Effect to fetch campaigns and categories
  useEffect(() => {
    if (contract) {
      fetchCampaigns();
      fetchCategories();
    }
  }, [address, contract, selectedCategory]);

  // Observer for stats visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  // Animate counts when visible
  useEffect(() => {
    if (isVisible) {
      animateCount(uniqueDonations, setUniqueDonations);
      animateCount(projectsRaisedFunds, setProjectsRaisedFunds);
    }
  }, [isVisible]);

  const animateCount = (target, setValue) => {
    let start = 0;
    const increment = Math.ceil(target / 50);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setValue(start); // Use state to trigger re-renders
    }, 20);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Statistics Section */}
      <div ref={statsRef} style={styles.statsContainer}>
        <div className="stat-box">
          <h2 className="stat-title">Unique Donations</h2>
          <p className="stat-value">{uniqueDonations}</p>
        </div>
        <div className="stat-box">
          <h2 className="stat-title">Projects Raised Funds</h2>
          <p className="stat-value">0.00215</p>
        </div>
        <div className="stat-box">
          <h2 className="stat-title">Fund Distribution</h2>
          <p className="stat-value">100% Distributed</p>
        </div>
      </div>

      {/* Dropdown to select category */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl">Filter by Category:</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#3a3a43] p-2 rounded-[10px] text-white"
        >
          <option value="">All Categories</option>
          {categories.length === 0 ? (
            <option value="">No categories found</option>
          ) : (
            categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))
          )}
        </select>
      </div>

      {categories.length === 0 && (
        <p className="text-white text-lg">No categories found.</p>
      )}

      {/* Display Campaigns */}
      <DisplayCampaigns 
        isLoading={isLoading}
        campaigns={campaigns}
        title={selectedCategory ? `${selectedCategory} Campaigns` : "All Campaigns"}
      />
    </div>
  );
};

const styles = {
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
    backgroundColor: '#000000',
    padding: '20px',
    borderRadius: '12px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
};

// CSS animations and styling
const css = `
.stat-box {
  position: relative;
  width: 30%;
  padding: 20px;
  text-align: center;
  border-radius: 12px;
  overflow: hidden;
}

.stat-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #f9f9f9;
  font-weight: bold;
}

.stat-value {
  font-size: 2rem;
  color: #4fc128;
  font-weight: bold;
}

.stat-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  border: 2px solid transparent;
  box-sizing: border-box;
  animation: borderAnimation 4s linear infinite;
}

@keyframes borderAnimation {
  0% {
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    border-color: #8e44ad;
  }
  25% {
    clip-path: polygon(0 0, 100% 0, 0 0, 0 0);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
  }
  75% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 100%);
  }
}
`;

// Inject CSS into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

export default Home;
