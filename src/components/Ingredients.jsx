import React, { useState } from "react";

const Ingredients = ({ recipeIngredients }) => {
  const [ingredients, setIngredients] = useState(recipeIngredients);

  const handleCheckboxChange = (index) => {
    const newIngredients = [...ingredients];
    const item = newIngredients[index];
    item.checked = !item.checked;
    setIngredients(newIngredients);
  };

  return (
    <div className="">
      <h2 className="text-3xl font-medium italic mb-4">Ingredients:</h2>
      <ul className="space-y-2">
        {ingredients.map((item, index) => (
          <li
            key={index}
            className={`flex items-center ${
              item.checked ? "line-through" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={item.checked || false} // Ensure it works even if `checked` is undefined
              onChange={() => handleCheckboxChange(index)}
              className="m-2 accent-[#B55D51]"
            />
            <span>{item.name}</span>
            <span>{item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;
