const STORE = {
  currentPage: 'list',
  // landing, results, details
  navDrawerOpen: false,
  currentBrewery: null,
  allBreweries: [],
  selectedBrewery: []
}



// LIST MODULE
const listModule = (function(){

  function renderItem(item) {
    return `<li>${item.content}</li>`
  }

  function renderListPage(state) {
    const renderedItems = state.list.map(renderItem);
    const renderedList = `<ul>${renderedItems}</ul>`;

    $('#root').html(renderedList);

    handleDeleteItem(state);
  }

  function handleDeleteItem(state) {
    $('li').click(function() {
      const content = $(this).text();

      const newList= state.list.filter(item => item.content !== content);
      const newState = { ...state, list: newList };

      render(newState);
    })
  }

  function handlePageChange(state) {
    $('#details').click(function() {
      state.currentPage = 'listDetail';
      render(state);
    })
  }

  return {
    render: renderListPage
  }
})();

// MAIN MODULE

function render(state) {
  if(state.currentPage === 'list') {
    listModule.render(state)
  } else if (state.currentPage === 'listDetail') {
    renderDetailPage(state);
  }
}

function main() {
  render(STORE);
}

$(main);


// finish static pages
// landing
// results
// detail


// main render function
// module per page/screen
  // dont forget to add each module in the right loading order to the html
  // any module required by another module must be loaded first
// dynamic render each page
// MODEL DATA
// explore api's
// learn basics of google maps
// familiarize more with map


