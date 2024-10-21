import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
    votes: 0,
    category: "",
  });
  
  const { createCampaign, getCategories } = useStateContext();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesList = await getCategories();
      setCategories(categoriesList);
    };
    fetchCategories();
  }, [getCategories]);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
          votes: form.votes,
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Image URL is invalid");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-[#2C2F33] flex flex-col items-center rounded-lg shadow-lg p-8">
      {isLoading && <Loader />}
      <h1 className="text-3xl font-bold text-white mb-6">Launch Your Campaign</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <FormField
            labelName="Your Full Name *"
            placeholder="Enter your name"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Name *"
            placeholder="Campaign for a cause"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Campaign Description *"
          placeholder="Tell us your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex flex-col gap-4">
          <FormField
            labelName="Funding Goal (ETH) *"
            placeholder="e.g., 0.75"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="Select a date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <FormField
          labelName="Campaign Image URL *"
          placeholder="https://your-image-url.com"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <label className="text-lg font-medium text-white">Select Category *</label>
        <select
          value={form.category}
          onChange={(e) => handleFormFieldChange("category", e)}
          className="bg-[#40444B] p-2 rounded-lg text-white"
          required
        >
          <option value="">Choose a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex justify-center mt-6">
          <CustomButton
            btnType="submit"
            title="Create Campaign"
            styles="bg-[#7289DA] hover:bg-[#5B6EAE] transition duration-300"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
