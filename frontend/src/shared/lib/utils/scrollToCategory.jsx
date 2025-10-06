import { useLocation, useNavigate } from "react-router-dom";


const ScrollToCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToCategory = (categoryId) => {
    if (location.pathname !== "/") {
      navigate(`/#category-${categoryId}`);
    }

    setTimeout(() => {
      const categoryElement = document.getElementById(`category-${categoryId}`);
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 170); 
  };

  return scrollToCategory;
};

export default ScrollToCategory;
