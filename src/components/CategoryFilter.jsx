import { Heading, Checkbox } from "@chakra-ui/react";

const CategoryFilter = ({
  categoriesData,
  selectedCategories,
  handleCategorySelect,
}) => (
  <Heading size="small" p="10px">
    {categoriesData.map((category) => (
      <Checkbox
        pr="25px"
        key={category.id}
        isChecked={selectedCategories.includes(category.id)}
        onChange={() => handleCategorySelect(category.id)}
      >
        {category.name}
      </Checkbox>
    ))}
  </Heading>
);
export default CategoryFilter;
