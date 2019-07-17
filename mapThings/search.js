function setUpSearch() {
    
    map.Search.placeholder(document.getElementById('result'));
    search = document.getElementById("searchBox")
    suggest = document.getElementById('suggest');
 
    search.oninput = function() {
        if (search.value.length < 3) {
            suggest.style.display = 'none';
            return;
        }

        map.Search.suggest(search.value, {
            area: document.getElementById('area').value
        });
    }

    search.onkeyup = function(event) {
        // keycode 13 enter
        if((event || window.event).keyCode != 13) return;

        doSearch();
    }

   // bind suggest show resultSuggest  
    map.Event.bind('suggest', function(result) {
      if (result.meta.keyword != search.value) return;
//      console.log(result)
      suggest.innerHTML = '';
      for (var i = 0, item; item = result.data[i]; ++i) {
        longdo.Util.append(suggest, 'a', {
          innerHTML: item.d,
          href: 'javascript:doSuggest(\'' + item.w + '\')'
        });
      }
      suggest.style.display = 'block';
    });


    let language = document.getElementById('language');

    language.onchange = function() {
      map.Search.language(language.value);
    }

    document.getElementById('submit').onclick = doSearch;

}

// press on suggest to do search
function doSuggest(value) {
    search.value = value;
    doSearch();
}

function doSearch() {
    // search then show in result
    map.Search.search(search.value, {
      area: document.getElementById('area').value,
      tag: document.getElementById('tag').value,
      span: document.getElementById('span').value,
      limit: document.getElementById('limit').value
    });
    suggest.style.display = 'none';
}
