// Global app controller
// forkify-api.herokuapp.com --> api documentation
import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

//GLOBAL STATE
//SEARCH OBJECT
//CURRENT RECIPE OBJECT
//SHOPPING LIST OBJECT
//LIKED RECIPES
const state = {};

/*
*   SEARCH CONTROLLER
*/

const controlSearch = async () => {
    // 1- get query from view
    const query = searchView.getInput();

    if (query) {
        // 2- new search object and add to state
        state.search = new Search(query);

        // 3- prepare ui for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4- do the search
            await state.search.getResults();

            // 5- render results on ui
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch (error) {
            alert('Something wrong with the search...');
        }
    }
};

//search form - submit event handler
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

//pagination buttons event handler
elements.searchResPages.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/*
*   RECIPE CONTROLLER
*/

const controlRecipe = async () => {
    // get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        //prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //highlight selected item
        if (state.search) searchView.highlightSelected(id);

        //create new recipe object
        state.recipe = new Recipe(id);

        try {
            //get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();


            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('Error processing recipe!');

        }
    }
};

//hashchange and load window events handler
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));


// increment and decrement serving buttons in recipe click event handler
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrase btn
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //increase btn
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }

    console.log(state.recipe);
});