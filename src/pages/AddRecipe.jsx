import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const AddRecipe = () => {
  const { handleSubmit, control, register, getValues } = useForm({
    defaultValues: {
      title: "",
      description: "",
      ingredients: [{ name: "", quantity: "" }],
      instructions: [{ text: "" }], // Array of objects with 'text' property
      cookTime: "",
      tags: [],
      image: "",
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const onSubmit = (data) => {
    console.log("Submitting recipe:", data);
    // Replace with your actual submit function
    // onSubmit(data);
  };

  return (
    <div className="h-full p-4">
      <div className="w-full mb-4">
        <h1 className="text-3xl font-bold">Add Recipe</h1>
        <hr className="h-[2px] border border-stone-200 mt-4 mb-4" />
      </div>

      <div className="flex gap-6">
        <div className="w-1/3 bg-white rounded-[30px] overflow-hidden flex flex-col items-center p-4 h-[810px]">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <img
                src={
                  getValues("image") ||
                  "https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=612x612&w=0&k=20&c=qRydgCNlE44OUSSoz5XadsH7WCkU59-l-dwrvZzhXsI="
                }
                alt=""
                className="h-1/3 w-full object-cover mb-2 rounded-[30px] bg-[#F5F5F5]"
              />
            )}
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
                {...register("image")}
                className="pl-6 py-3 pr-4 border border-[#E3E3E3] rounded-[18px] h-[3rem] bg-[#F5F5F5] w-full outline-none"
                required
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
                {...register("title")}
                className="pl-6 py-3 pr-4 border border-[#E3E3E3] rounded-[18px] h-[3rem] bg-[#F5F5F5] w-full outline-none"
                required
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
                {...register("cookTime")}
                className="pl-6 py-3 pr-4 border border-[#E3E3E3] rounded-[18px] h-[3rem] bg-[#F5F5F5] w-full outline-none"
                required
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
                {...register("tags")}
                className="pl-6 py-3 pr-4 border border-[#E3E3E3] rounded-[18px] h-[3rem] bg-[#F5F5F5] w-full outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const tagInput = e.target.value;
                    if (tagInput) {
                      const tags = getValues("tags");
                      setValue("tags", [...tags, tagInput]);
                      setValue("tagInput", "");
                    }
                  }
                }}
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
                {...register("description")}
                className="pl-6 py-3 pr-4 border border-[#E3E3E3] rounded-[18px] h-[7rem] bg-[#F5F5F5] w-full resize-none overflow-y-auto outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full w-2/3">
          <div className="flex-grow flex">
            {/* Content Section */}
            <div className="w-full p-4 rounded-lg overflow-y-auto">
              <h2 className="text-lg font-bold mb-4">Add Ingredients</h2>
              {ingredientFields.map((ingredient, index) => (
                <div
                  key={ingredient.id}
                  className="mb-2 flex items-center gap-2"
                >
                  <input
                    type="text"
                    name={`ingredients[${index}].name`}
                    defaultValue={ingredient.name}
                    {...register(`ingredients.${index}.name`)}
                    placeholder={`Ingredient ${index + 1} Name`}
                    className="pl-4 py-2 border border-gray-300 rounded-[18px] h-[2.5rem] w-full outline-none"
                    required
                  />
                  <input
                    type="text"
                    name={`ingredients[${index}].quantity`}
                    defaultValue={ingredient.quantity}
                    {...register(`ingredients.${index}.quantity`)}
                    placeholder={`Quantity ${index + 1}`}
                    className="pl-4 py-2 border border-gray-300 rounded-[18px] h-[2.5rem] w-full outline-none"
                    required
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
                onClick={() => appendIngredient({ name: "", quantity: "" })}
                className="bg-[#BD6E64] text-white py-2 px-2 rounded-full h-[42px] w-[42px] mb-4 hover:bg-[#BD6E64]"
              >
                <FaPlus />
              </Button>

              <h2 className="text-lg font-bold mb-4">Add Instructions</h2>
              {instructionFields.map((instruction, index) => (
                <div
                  key={instruction.id}
                  className="mb-2 flex items-center gap-2"
                >
                  <textarea
                    {...register(`instructions.${index}.text`)}
                    placeholder={`Instruction ${index + 1}`} // Correct placeholder
                    className="pl-4 py-2 border border-gray-300 rounded-[18px] h-[6rem] w-full resize-none outline-none"
                    required
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
                onClick={() => appendInstruction({ text: "" })} // Append an object with 'text' property
                className="bg-[#BD6E64] text-white py-2 px-2 h-[42px] w-[42px] rounded-full mb-4 hover:bg-[#BD6E64]"
              >
                <FaPlus />
              </Button>
            </div>
          </div>

          <div className=" flex p-4 justify-end">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="bg-[#BD6E64] text-white py-2 px-4 rounded-full hover:bg-[#BD6E64]"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
