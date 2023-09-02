import propTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { getCategoriesService } from "../services/categories.service.js";

const CategoriesContext = createContext();

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const categoriesData = await getCategoriesService();
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

CategoriesProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { CategoriesContext, CategoriesProvider };
