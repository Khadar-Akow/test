const TitalEl = document.getElementById('title');
const UrlEl = document.getElementById('url');
const BookMarkFormEl = document.getElementById('bookmark-form');
const BookMarkListEl = document.getElementById('bookmark-list');

let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

BookMarkFormEl.addEventListener('submit', addBookmark);

function addBookmark(e) {
    e.preventDefault();

    // get form values
    const title = TitalEl.value.trim();
    const url = UrlEl.value.trim();

    if (!title || !url) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please fill in both fields!',
            confirmButtonColor: '#d33'
        });
        return;
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            alert("Please enter a valid URL starting with http:// or https://");
            return;
        }
    }

    bookmarks.push({
        id: Date.now(),
        title,
        url,
    });

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    updateBookmarkList();
    BookMarkFormEl.reset();
}
function updateBookmarkList() {
    BookMarkListEl.innerHTML = '';

    bookmarks.forEach((bookmark) => {
        const bookmarkEl = createBookmarkElement(bookmark);
        BookMarkListEl.appendChild(bookmarkEl);
    });
}
function createBookmarkElement(bookmark) {
    const li = document.createElement('li');
    li.classList.add('bookmark');

    li.innerHTML = `
        
        <span>
            <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
            <button class="delete-btn" onclick="removeBookmark(${bookmark.id})">Remove</button>
        </span>
    `;

    return li;
}
function removeBookmark(id) {
    bookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    updateBookmarkList();
}

updateBookmarkList();

