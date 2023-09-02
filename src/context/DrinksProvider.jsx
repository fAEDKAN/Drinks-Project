import propTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  filterDrinksService,
  getRecipeService,
} from "../services/drink.service.js";

const DrinksContext = createContext();

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [modal, setModal] = useState(false);
  const [drinkId, setDrinkId] = useState(null);
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);

  //cambia de estado el booleano del modal
  function handleModalClick() {
    setModal(!modal);
  }
  // recibe un id y setea drinkId con el que se haya pasado
  function handleDrinkIdClick(id) {
    setDrinkId(id);
  }

  async function getRecipe() {
    if (!drinkId) return;

    try {
      setLoading(true);
      const recipeData = await getRecipeService(drinkId);
      setRecipe(recipeData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getDrink(data) {
    try {
      setLoading(true);
      const drinksData = await filterDrinksService(data.name, data.category);
      setDrinks(drinksData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecipe();
  }, [drinkId]);

  const contextValues = {
    drinks,
    modal,
    recipe,
    loading,
    handleModalClick,
    handleDrinkIdClick,
    getDrink,
  };

  return (
    <DrinksContext.Provider value={contextValues}>
      {children}
    </DrinksContext.Provider>
  );
};

DrinksProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { DrinksContext, DrinksProvider };
