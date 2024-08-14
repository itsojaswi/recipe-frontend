import React from "react";
import { useState } from "react";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([
    { name: "2 cups all purpose flour", checked: false, crossed: false },
    { name: "1/2 teaspoon salt", checked: true, crossed: true },
    { name: "2-3 tablespoons water", checked: false, crossed: false },
    {
      name: "olive or vegetable oil 1 tablespoon (optional)",
      checked: true,
      crossed: true,
    },
    { name: "1/4 teaspoon turmeric powder", checked: false, crossed: false },
    {
      name: "1/4 cup spinach puree (optional)",
      checked: false,
      crossed: false,
    },
    { name: "1/4 cup beet puree (optional)", checked: false, crossed: false },
    { name: "soy sauce", checked: false, crossed: false },
    { name: "sesame seed", checked: false, crossed: false },
  ]);

  const handleCheckboxChange = (index) => {
    const newIngredients = [...ingredients];
    const item = newIngredients[index];
    item.checked = !item.checked;
    item.crossed = item.checked;
    setIngredients(newIngredients);
  };
  return (
    <div className="">
      <h2 className="text-2xl font-medium  italic mb-4">Ingredients:</h2>
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
              checked={item.checked}
              onChange={() => handleCheckboxChange(index)}
              className="mr-2 accent-[#B55D51]"
            />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;
