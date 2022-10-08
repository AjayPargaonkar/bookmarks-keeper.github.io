const showBookmarkBtn = document.getElementById('show-modal');
console.log(showBookmarkBtn);

const bookmarkContainer = document.getElementById('modal');
console.log(bookmarkContainer);


const bookmarkForm = document.getElementById('bookmark-form');

const websiteNameEl = document.getElementById('website-name');
console.log(websiteNameEl);

const websiteUrlEl = document.getElementById('website-url');
console.log(websiteUrlEl);

const mainpagedisplay = document.getElementById('bookmarks-container');
console.log(mainpagedisplay);

let bookmarks = []

//show modal focus on Input (1)
function showModal()
{
 //we first removed the class name from html and now using js we adding this class to modal container
  bookmarkContainer.classList.add('show-modal');
  //websiteNameEl.focus();
  console.log("calling showmodal");
}

//Modal event Listener 
//h2 id
showBookmarkBtn.addEventListener('click', showModal);


//event for close button to close the bookmark form
const modalCloseBtn = document.getElementById('close-modal');
console.log(modalCloseBtn);

modalCloseBtn.addEventListener('click', ()=> bookmarkContainer.classList.remove('show-modal'));

//now if user click outside the container then also it will be closed
//window.addEventListener('click', (e) => console.log(e));
//window.addEventListener('click', (e) => console.log(e.target));

//using the ternary operatory
window.addEventListener('click', (e) => (e.target== bookmarkContainer ? bookmarkContainer.classList.remove('show-modal') : false));


//validate form 
function validate(nameValue, urlValue)
{
 const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
 const regex = new RegExp(expression);

 if(!nameValue || !urlValue)
 {
  alert('Please submit values for both fields');
  return false;
 }

 if(urlValue.match(regex))
 {
  alert('match');
 }

 if(!urlValue.match(regex))
 {
  alert("Please provid a valid web address");
  return false;
 }
 return true;
}

//Build Bookmarks DOM
function buildBookmarks()
{

  //remove all bookmark elements
  mainpagedisplay.textContent = '';
  //Build items 
  bookmarks.forEach((bookmark) => {
   const {name, url} = bookmark;
   //console.log("name - ",name, "url -", url);
   //Item 
   const item = document.createElement('div');
   item.classList.add('item');
   //close icon
   const closeIcon = document.createElement('i');
   closeIcon.classList.add('fas', 'fa-times');
   closeIcon.setAttribute('title', 'Delete button');
   closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
   console.log(closeIcon);

   //Favicon /link container
   const linkInfo = document.createElement('div');
   linkInfo.classList.add('name');
   //favicon 
   const favicon = document.createElement('img');
   favicon.setAttribute('src', `titlelogo.png`);
   favicon.setAttribute('alt', 'favicon');

   const link = document.createElement('a');
   link.setAttribute('href', `${url}`);
   link.setAttribute('target', '_blank');
   link.textContent = name;

   //Append to bookmarks container
   linkInfo.append(favicon, link);
   item.append(closeIcon, linkInfo);
   mainpagedisplay.appendChild(item);

  });
}


//Fetch Bookmarks (4)
function fetchBookmarks()
{
  //Get bookmarks from localStoarge if available
  if(localStorage.getItem('bookmarks'))
  {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  }
  else 
  {
    bookmarks = [
      {
        name:'Demo1',
        url:'https://demo.com'
      }
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  // console.log(bookmarks);
  buildBookmarks();
}


//Delete Bookmark 
function deleteBookmark(url)
{
 //console.log('delete Url', url);
 bookmarks.forEach((bookmark, i) =>{
     if(bookmark.url === url)
     {
      bookmarks.splice(i, 1);
     }
 });

 //update bookmarks array in localStorage repopulate Dom
 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
 fetchBookmarks();

};



//storing bookmark (2)
function storeBookmark(e)
{
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if(!urlValue.includes('http://' && 'https://'))
  {
    urlValue = `https://${urlValue}`;
  }
  console.log(nameValue, urlValue);
  //console.log(e);
  if(!validate(nameValue, urlValue))
  {
    return false;
  }
  const bookmark = {
    name:nameValue,
    url:urlValue
  };
  bookmarks.push(bookmark);
  //console.log(bookmarks);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}


//Event Listener 
bookmarkForm.addEventListener('submit', storeBookmark);

//on load fetch bookmarks
fetchBookmarks();
buildBookmarks();
