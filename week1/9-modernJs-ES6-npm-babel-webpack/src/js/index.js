// Global app controller
// forkify-api.herokuapp.com --> api documentation
import { elements } from './views/base';
import Search from './models/Search';
import * as searchView from './views/searchView';

//GLOBAL STATE
//SEARCH OBJECT
//CURRENT RECIPE OBJECT
//SHOPPING LIST OBJECT
//LIKED RECIPES
const state = {};

const controlSearch = async () => {
    // 1- get query from view
    const query = searchView.getInput();

    if (query) {
        // 2- new search object and add to state
        state.search = new Search(query);

        // 3- prepare ui for results
        searchView.clearInput();
        searchView.clearResults();

        // 4- do the search
        await state.search.getResults();

        // 5- render results on ui
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();

})



//recipe.js
//const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

