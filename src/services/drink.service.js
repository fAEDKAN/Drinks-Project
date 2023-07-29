import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getRecipeService = async (drinkId) => {
  try {
    const url = `${apiUrl}lookup.php?i=${drinkId}`;
    const { data } = await axios.get(url);
    return data.drinks[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al obtener la receta.");
  }
};

export const filterDrinksService = async (name, category) => {
  try {
    const url = `${apiUrl}filter.php?i=${name}&${category}`;
    const { data } = await axios.get(url);
    return data.drinks;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al obtener las bebidas.");
  }
};