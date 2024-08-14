const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex space-x-4 mt-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`flex flex-col items-center justify-center p-4 rounded-[100%] h-[110px] w-[110px] border-2 cursor-pointer ${
            selectedCategory === category.id
              ? "bg-[#B55D51] text-white border-transparent"
              : "bg-transparent text-gray-500 border-gray-200 hover:bg-gray-100"
          }`}
        >
          {/* Replace with actual icons if available */}
          <span className="text-xl mb-2">{category.icon}</span>
          <span className="text-sm font-semibold">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
