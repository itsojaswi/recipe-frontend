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
import { useNavigate } from "react-router-dom";

const MyRecipe = ({ imageSrc, title, recipeId, onDelete }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

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

  return (
    <div className="bg-white rounded-[20px] shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/recipe/${recipeId}`}>
        <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold truncate">{title}</h3>
        <div className="flex space-x-2 mt-4 justify-end">
          <button
            className=""
            onClick={() => navigate("/edit-recipe", { state: recipeId })}
          >
            <FaEdit />
          </button>
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
