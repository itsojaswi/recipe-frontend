import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const MyRecipe = ({ imageSrc, title, onEdit, onDelete, recipeId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    setIsDialogOpen(false);
    onDelete(recipeId); // Call the delete function with the recipe ID
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
          <button onClick={onEdit} className="">
            <FaEdit />
          </button>
          <button onClick={() => setIsDialogOpen(true)} className="">
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        className=""
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
      >
        <DialogContent
          style={{ borderRadius: "15px" }}
          className="bg-white"
          id="recipe-dialog-content"
        >
          <img
            className="w-11 h-11 m-auto "
            src="https://media.tenor.com/A4iBZ-oMD-oAAAAM/thinking-emoji.gif"
            alt=""
          />
          <DialogTitle>
            <p className="flex flex-col justify-center items-center font-semibold text-[20px]">
              Are you sure you want to delete this recipe?
            </p>
          </DialogTitle>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              style={{ borderRadius: "10px" }}
              onClick={() => setIsDialogOpen(false)}
              className="bg-gray-500 hover:bg-gray-500 text-white "
            >
              Cancel
            </Button>
            <Button
              style={{ borderRadius: "10px" }}
              onClick={handleDelete}
              className="bg-[#B55D51] hover:bg-[#B55D51] text-white rounded-sm"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyRecipe;
