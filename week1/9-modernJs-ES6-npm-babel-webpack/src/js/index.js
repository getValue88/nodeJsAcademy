// Global app controller
// forkify-api.herokuapp.com --> api documentation
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

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
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (error) {
            alert('Error processing recipe!');

        }
    }
};

//hashchange and load window events handler
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));



/*
*   LIST CONTROLLER
*/

const controlList = () => {
    //create a new list if there is none yet
    if (!state.list) state.list = new List();

    //add each ingredient to the list and ui
    state.recipe.ingredients.forEach(ing => {
        const item = state.list.addItem(ing.count, ing.unit, ing.ingredient);
        listView.renderItem(item);
    });
}

// handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;


    //handle delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //delete from state
        state.list.deleteItem(id);

        //delete from ui
        listView.deleteItem(id);

    } else if (e.target.matches('.shopping__count-value')) {
        const value = parseInt(e.target.value);
        state.list.updateCount(id, value);
    }
});



/*
*   LIKES CONTROLLER
*/

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentId = state.recipe.id;

    //user has not yet liked current recipe
    if (!state.likes.isLiked(currentId)) {
        //add like to state
        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        //toggle like btn
        likesView.toggleLikeBtn(true);

        //add like to ui
        likesView.renderLike(newLike);


        //user has liked current recipe
    } else {
        //remove like from state
        state.likes.deleteLike(currentId);

        //toggle like btn
        likesView.toggleLikeBtn(false);

        //remove like from ui
        likesView.deleteLike(currentId);

    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}


//restore likes when the page loads
window.addEventListener('load', () => {
    state.likes = new Likes();

    //restore likes
    state.likes.readStorage();

    //toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    //render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});






// recipe buttons event handling
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

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //add to shopping btn
        controlList();

    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //like btn
        controlLike();
    }
});