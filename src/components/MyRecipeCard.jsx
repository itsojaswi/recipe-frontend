import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

const MyRecipe = ({
  imageSrc,
  title,
  description,
  ingredients,
  instructions,
  cookTime,
  recipeId,
  onEdit,
  onDelete,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: title || "",
    description: description || "",
    ingredients: ingredients || "",
    instructions: instructions || "",
    cookTime: cookTime || "",
  });

  const handleDelete = () => {
    setIsDialogOpen(false);
    onDelete(recipeId);
    toast.success("Recipe deleted!", {
      style: {
        borderRadius: "10px",
        background: "#BD6E64",
        color: "white",
      },
    });
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onEdit(recipeId, editData);
    console.log("Updated Recipe Data:", editData);
    toast.success("Recipe updated successfully!", {
      style: {
        borderRadius: "10px",
        background: "#BD6E64",
        color: "white",
      },
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-[20px] shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/recipe/${recipeId}`}>
        <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold truncate">{title}</h3>
        <div className="flex space-x-2 mt-4 justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <button className="">
                <FaEdit />
              </button>
            </DialogTrigger>
            <DialogContent
              style={{ borderRadius: "10px" }}
              className="bg-white max-w-lg"
            >
              <DialogHeader>
                <DialogTitle>
                  <p className="flex flex-col justify-center items-center font-semibold">
                    Edit Recipe
                  </p>
                </DialogTitle>
                <DialogDescription className="text-sm"></DialogDescription>
              </DialogHeader>

              {/* Form for editing recipe */}
              <div className="space-y-4">
                <Input
                  name="title"
                  value={editData.title}
                  onChange={handleInputChange}
                  placeholder="Recipe Title"
                  className=" w-full border-[#E3E3E3] rounded-[18px] mb-[14px] h-[2.7rem] bg-[#F5F5F5]"
                />

                <Input
                  name="cookTime"
                  type="number"
                  value={editData.cookTime}
                  onChange={handleInputChange}
                  placeholder="Cook Time (in minutes)"
                  className=" w-full  border-[#E3E3E3] rounded-[18px] mb-[14px] h-[2.7rem] bg-[#F5F5F5]"
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleInputChange}
                  placeholder="Recipe Description"
                  className="p-3 w-full border border-[#E3E3E3] rounded-[18px] mb-[14px] h-[6rem] resize-none  bg-[#F5F5F5] scrollbar-none outline-none"
                />
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <Button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white"
                >
                  Update
                </Button>
                <DialogTrigger asChild>
                  <Button className="bg-gray-300">Cancel</Button>
                </DialogTrigger>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <button className="">
                <FaTrash />
              </button>
            </DialogTrigger>
            <DialogContent
              style={{ borderRadius: "10px" }}
              className="bg-white"
            >
              <DialogHeader>
                <DialogTitle>
                  <p className="flex flex-col justify-center items-center font-semibold">
                    Are you sure you want to delete this recipe?
                  </p>
                </DialogTitle>
                <DialogDescription className="text-sm">
                  {/* This action cannot be undone. */}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end mt-4 space-x-2">
                <Button
                  onClick={handleDelete}
                  className="bg-[#B55D51] text-white"
                >
                  Delete
                </Button>
                <DialogTrigger asChild>
                  <Button className="bg-gray-300">Cancel</Button>
                </DialogTrigger>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MyRecipe;
