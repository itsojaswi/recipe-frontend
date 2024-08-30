import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

// AddRecipe Component
const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [instructions, setInstructions] = useState([""]);
  const [cookTime, setCookTime] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);

  // Handle Ingredient Change
  const handleIngredientChange = (index, event) => {
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index
        ? { ...ingredient, [event.target.name]: event.target.value }
        : ingredient
    );
    setIngredients(newIngredients);
  };

  // Add Ingredient Field
  const addIngredientField = () =>
    setIngredients([...ingredients, { name: "", quantity: "" }]);

  // Remove Ingredient
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Handle Instruction Change
  const handleInstructionChange = (index, event) => {
    const newInstructions = instructions.map((instruction, i) =>
      i === index ? event.target.value : instruction
    );
    setInstructions(newInstructions);
  };

  // Add Instruction Field
  const addInstructionField = () => setInstructions([...instructions, ""]);

  // Remove Instruction
  const removeInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  // Handle Tag Change
  const handleTagChange = (event) => {
    if (event.key === "Enter" && tagInput) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  // Handle Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("instructions", JSON.stringify(instructions));
    formData.append("cookTime", cookTime);
    formData.append("tags", JSON.stringify(tags));
    formData.append("image", JSON.stringify(image));

    // Replace with your actual submit function
    console.log("Submitting recipe:", formData);
    // onSubmit(formData);
  };

  return (
    <div className="h-full p-4">
      <div className="w-full mb-4">
        <h1 className="text-3xl font-bold">Add Recipe</h1>
        <hr className="h-[2px] border border-stone-200 mt-4 mb-4" />
      </div>

      <div className="flex gap-6">
        <div className="w-1/3 bg-white rounded-[30px] overflow-hidden flex flex-col items-center p-4 h-[810px]">
          <img
            src={
              "https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=612x612&w=0&k=20&c=qRydgCNlE44OUSSoz5XadsH7WCkU59-l-dwrvZzhXsI=" ||
              setImage
            }
            alt=""
            className="h-1/3 w-full object-cover mb-2 rounded-[30px] bg-[#F5F5F5]"
          />

          <div className="w-full">
            <div className="mb-4">
              <label
                htmlFor="image-url-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Image URL
              </label>
              <input
                id="image-url-input"
                type="text"
                placeholder="e.g., https://www.example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="pl-6 py-3 pr-4 border border-[#E3E3E3] rounded-[18px] h-[3rem] bg-[#F5F5F5] w-full outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="recipe-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Recipe Name
              </label>
              <input
                id="recipe-input"
                type="text"
                placeholder="e.g., chicken curry"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="pl-6 py-3 pr-4 border border-[#E3E3E3] rounded-[18px] h-[3rem] bg-[#F5F5F5] w-full outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="cook-time-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cook Time (minutes)
              </label>
              <input
                id="cook-time-input"
                type="text"
                placeholder="e.g., 30"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                className="pl-6 py-3 pr-4 border border-[#E3E3E3] rounded-[18px] h-[3rem] bg-[#F5F5F5] w-full outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="tags-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tags
              </label>
              <input
                id="tags-input"
                type="text"
                placeholder="e.g., italian, healthy"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagChange}
                className="pl-6 py-3 pr-4 border border-[#E3E3E3] rounded-[18px] h-[3rem] bg-[#F5F5F5] w-full outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description-input"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="pl-6 py-3 pr-4 border border-[#E3E3E3] rounded-[18px] h-[7rem] bg-[#F5F5F5] w-full resize-none overflow-y-auto outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-2/3">
          <div className="flex-grow flex">
            {/* Content Section */}
            <div className="w-full p-4 rounded-lg  overflow-y-auto">
              <h2 className="text-lg font-bold mb-4">Add Ingredients</h2>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="mb-2 flex items-center gap-2">
                  <input
                    type="text"
                    name="name"
                    value={ingredient.name}
                    onChange={(event) => handleIngredientChange(index, event)}
                    placeholder={`Ingredient ${index + 1} Name`}
                    className="pl-4 py-2 border border-gray-300 rounded-[18px] h-[2.5rem] w-full outline-none"
                  />
                  <input
                    type="text"
                    name="quantity"
                    value={ingredient.quantity}
                    onChange={(event) => handleIngredientChange(index, event)}
                    placeholder={`Quantity ${index + 1}`}
                    className="pl-4 py-2 border border-gray-300 rounded-[18px] h-[2.5rem] w-full outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-[#BD6E64]"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                onClick={addIngredientField}
                className="bg-[#BD6E64] text-white py-2 px-4 rounded-full mb-4 hover:bg-[#BD6E64]"
              >
                <FaPlus />
              </Button>

              <h2 className="text-lg font-bold mb-4">Add Instructions</h2>
              {instructions.map((instruction, index) => (
                <div key={index} className="mb-2 flex items-center gap-2">
                  <textarea
                    value={instruction}
                    onChange={(event) => handleInstructionChange(index, event)}
                    placeholder={`Instruction ${index + 1}`}
                    className="pl-4 py-2 border border-gray-300 rounded-[18px] h-[6rem] w-full resize-none outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="text-[#BD6E64]"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                onClick={addInstructionField}
                className="bg-[#BD6E64] text-white py-2 px-4 rounded-full hover:bg-[#BD6E64]"
              >
                <FaPlus />
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-4 flex justify-end">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#BD6E64] text-white py-2 px-4 rounded-[18px] hover:bg-[#BD6E64]"
            >
              Submit Recipe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
