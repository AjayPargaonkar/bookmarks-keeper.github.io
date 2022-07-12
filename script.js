const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');


let bookmarks = [];


// show modal , focus on Input 
function showModal()
{
    modal.classList.add('show-modal');
    websiteNameEl.focus();

}


//Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal'):false));
//console.log()


//Validate form 
function validate(nameValue, urlValue)
{
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
   
    if(!nameValue || !urlValue)
    {
        alert('Provide Both values');
        return false;
    }

    if(!urlValue.match(regex))
    {
        alert('please provide a valid web address.');
        return false;
    }

    //valid
    return true;
}

//Build bookmarks DOM
function buildBookmarks()
{
    //Remove all bookmark elements
     bookmarksContainer.textContent = '';

    //buil items
    bookmarks.forEach((bookmark) => 
    {
       const {name, url} = bookmark;
       console.log(name, url);
    
    const item = document.createElement('div');
    item.classList.add('item');

    //close Icon 
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    //favicon 
    const favicon = document.createElement('img');
    favicon.setAttribute('src', 'bookmark-solid.svg');
    favicon.setAttribute('alt', 'Favicon');
    //Link 
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', `_blank`);
    link.textContent = name;
    
    //Append to bookmarks container 
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
});

    
}


//fetch bookmarks from local storage
function fetchBookmarks()
{
    //Get bookmarks from localstorage if availbe
    if(localStorage.getItem('bookmarks'))
    {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        
    }
    else 
    {
        //create bookmark array in localStorage
        bookmarks = [
            {
                name:'Ajay Design',
                url:'https://ajayp.Design',
            }
        ];

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
} 


//Delete Bookmark
function deleteBookmark(url)
{
    //console.log('delete Url', url);
    bookmarks.forEach((bookmark, i) => {
      if(bookmark.url === url)
      {
        bookmarks.splice(i, 1);
      }
    });
    //Update bookmarks array in localstorage, re-populate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}


//bookmark storing 
function storeBookmark(e)
{
    e.preventDefault();
    //console.log(e)
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;

    if(!urlValue.includes('http://', 'https://'))
    {
        urlValue = `https://${urlValue}`;
    }
   
    if(!validate(nameValue, urlValue))
    {
        return false;
    }  
 
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };

    bookmarks.push(bookmark);
    console.log(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
    //console.log(nameValue, urlValue);  
}


//Event Listener 
bookmarkForm.addEventListener('submit', storeBookmark);

// On load fetch bookmarks 
fetchBookmarks();
