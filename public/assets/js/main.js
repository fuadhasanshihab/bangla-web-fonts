function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}



function openMobileMenuBG() {
	document.getElementById("mobileMenuBackground").classList.add("opacity-0");
	document.getElementById("mobileMenuBackground").classList.remove("hidden");


	setTimeout(() => {
		document
			.getElementById("mobileMenuBackground")
			.classList.remove("opacity-0");
	}, 300);
};




function closeMobileMenuBG() {
	document.getElementById("mobileMenuBackground").classList.add("opacity-0");
	// document.getElementById("mobileMenuBackground").classList.remove("hidden");


	setTimeout(() => {
		document
			.getElementById("mobileMenuBackground")
			.classList.add("hidden");
	}, 300);
};

function closeAllOverlaysExcept(except) {
	// closeMobileMenuBG();
  if (except !== 'search') {
    document.getElementById('searchModal')?.classList.add('hidden');
    document.getElementById('results')?.classList.add('hidden');
  }


  if (except !== 'menu') {
    document.getElementById('menu')?.classList.add('hidden');
    // document.getElementById('mobileMenuBackground')?.classList.add('hidden');
    document.getElementById('closeMenu')?.classList.add('hidden');
    document.getElementById('openMenu')?.classList.remove('hidden');
  }


  if (except !== 'bookmark') {
    document.getElementById('fontBookmark').checked = false;
    // document.querySelector('.bookmark-inner')?.classList.add('hidden');
  }
}


document.getElementById("mobileMenuBackground").addEventListener("click", () => {
		document.getElementById('searchModal')?.classList.add('hidden');
    document.getElementById('results')?.classList.add('hidden');
  document.getElementById('menu')?.classList.add('hidden');
    // document.getElementById('mobileMenuBackground')?.classList.add('hidden');
    document.getElementById('closeMenu')?.classList.add('hidden');
    document.getElementById('openMenu')?.classList.remove('hidden');
  document.getElementById('fontBookmark').checked = false;
    
	});


const bookmarks = {
  maxWidget: 200,
  maxAll: 200,
  emptyText: 'No favourite fonts yet. <a href="/" class="font-semibold text-blue-600 hover:underline">Explore all fonts.</a>',
  moreText: 'see more',
  currentText: 'You are currently viewing favourite fonts page',
  morePage: '/favourite/',
  deleteText: '<svg viewBox="0 0 24 24"><path d="M18.8892 9.5542C18.8892 17.5732 20.0435 21.198 12.2797 21.198C4.5149 21.198 5.693 17.5732 5.693 9.5542"/><path d="M20.3651 6.47985H4.2146"/><path d="M15.7148 6.47983C15.7148 6.47983 16.2434 2.71411 12.2891 2.71411C8.33578 2.71411 8.86435 6.47983 8.86435 6.47983"/></svg>'
};
! function (d) {
  let fontbookmark = JSON.parse(localStorage.getItem("fontBookmark")) || [];
  d.querySelector(".fontBookmark").querySelector("i").innerHTML = fontbookmark.length;
  const bmCek = () => {
    if (fontbookmark.length > 0) {
      fontbookmark.forEach((e) => {
        if (d.getElementById("bm-" + e.id)) {
          d.getElementById("bm-" + e.id).checked = true;
        }
      });
    }
  };
  const bmRender = () => {
    localStorage.setItem("fontBookmark", JSON.stringify(fontbookmark));
    d.querySelector(".fontBookmark").querySelector("i").innerHTML = fontbookmark.length;
    let bmContainer = d.querySelector(".bookmark-inner"),
      bmContainerAll = d.querySelector(".fontBookmarks"),
      bmBuild = "";
    if (fontbookmark.length > 0) {
      let max = bookmarks.maxWidget,
        more = false;
      if (d.location.pathname == bookmarks.morePage) {
        max = bookmarks.maxAll;
      } else {
        max = bookmarks.maxWidget;
        if (fontbookmark.length > max) {
          more = true;
        }
      }
      fontbookmark.slice(0, max).forEach((e) => {
        bmBuild += '<li data-id="' + e.id + '"><div class="bm-thumb"><a href="' + e.url + '" title="' + e.title + '" style="font-family: ' + e.img + ';">অ</a></div><div class="bm-title"><a href="' + e.url + '" title="' + e.title + '">' + e.title + '</a></div><div class="bm-delete" role="button">' + bookmarks.deleteText + "</div>";
      });
      bmContainer.innerHTML += "</ul>";
      if (d.location.pathname == bookmarks.morePage) {
        bmContainer.innerHTML = bookmarks.currentText;
        if (bmContainerAll) bmContainerAll.innerHTML = "<ul>" + bmBuild + "</ul>";
      } else {
        bmContainer.innerHTML = "<ul>" + bmBuild;
        if (more) {
          bmContainer.innerHTML += '<li class="bm-more"><a href="' + bookmarks.morePage + '" title="' + bookmarks.moreText + '">' + bookmarks.moreText + " (+" + (fontbookmark.length - max) + ")</a></li>";
        }
      }
    } else {
      bmContainer && (bmContainer.innerHTML = bookmarks.emptyText);
      bmContainerAll && (bmContainerAll.innerHTML = bookmarks.emptyText);
    }
    bmDel();
  };
  const bmAdd = (a) => {
    fontbookmark.push(a);
    bmRender();
  };
  const bmRem = (id) => {
    fontbookmark = fontbookmark.filter((obj) => obj.id !== id);
    bmRender();
    if (d.getElementById("bm-" + id)) {
      d.getElementById("bm-" + id).checked = false;
    }
  };
  const bmDel = () => {
    const a = d.querySelectorAll(".bm-delete");
    if (a.length > 0) {
      a.forEach((e) => {
        const dId = e.parentNode.getAttribute("data-id");
        e.addEventListener("click", () => {
          bmRem(dId);
        });
      });
    }
  };
  const fontBookmark = () => {
    const a = d.querySelectorAll(".fontBookmarkPost input");
    if (a.length > 0) {
      a.forEach((e) => {
        e.addEventListener("change", () => {
          const bmId = e.id.replace(/^bm-/, ""),
            bmParent = e.parentNode,
            bookmarkItem = {
              id: bmId,
              img: bmParent.querySelector("label").getAttribute("data-img"),
              title: bmParent.querySelector("label").getAttribute("data-title"),
              url: bmParent.querySelector("label").getAttribute("data-url"),
            };
          if (fontbookmark) {
            const findId = fontbookmark.find((obj) => obj.id === bmId);
            if (findId) {
              bmRem(bmId);
            } else {
              bmAdd(bookmarkItem);
            }
          } else {
            bmAdd(bookmarkItem);
          }
        });
      });
    }
  };
  d.location.pathname == bookmarks.morePage && bmRender();
  d.querySelector(".fontBookmark").addEventListener("click", () => {
	  closeAllOverlaysExcept('bookmark');
	  openMobileMenuBG();
    bmRender();
  });
  d.addEventListener("scroll", () => {
    bmCek;
    fontBookmark
  });
  fontBookmark();
  bmCek();
}(document);







let fonts = [];
  var timeoutFHS;
  var listenersAdded = false;

  function activateLoading() {
    try {
      if (!localStorage.getItem("loaded")) {
        localStorage.setItem("loaded", "1");
      }
    } catch (e) {
      console.warn("error", e);
    }

    loadCSS('/css/webfonts.min.css');

setTimeout(() => {
  document.querySelectorAll('.skeleton').forEach(el => el.classList.add('loaded'));
}, 1000);

	      

    // Fetch font data
    fetch('/api/fonts.json')
      .then(res => res.json())
      .then(data => fonts = data);


    // Remove event listeners only if they were added
    if (listenersAdded) {
      document.removeEventListener("mousemove", activateLoading);
      document.removeEventListener("touchstart", activateLoading);
      document.removeEventListener("keydown", activateLoading);
      document.removeEventListener("scroll", activateLoading);
      clearTimeout(timeoutFHS);
    }
  }

  try {
    if (localStorage.getItem("loaded") === "1") {
      activateLoading();
    } else {
      listenersAdded = true;
      document.addEventListener("mousemove", activateLoading);
      document.addEventListener("touchstart", activateLoading);
      document.addEventListener("keydown", activateLoading);
      document.addEventListener("scroll", activateLoading);
      timeoutFHS = setTimeout(activateLoading, 30000);
    }
  } catch (e) {
    activateLoading();
  }















const openSearch = document.querySelectorAll('.openSearch');
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('results');
    const clearBtn = document.getElementById('clearBtn');

    // Show filtered or all results
    function displayResults(fontArray, query) {
      resultsContainer.innerHTML = '';
      resultsContainer.classList.remove('hidden');

      if (fontArray.length > 0) {
        fontArray.forEach(font => {
          const div = document.createElement('div');
          div.className = 'px-4 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900';

          const regex = new RegExp(`(${query})`, 'gi');
          const highlighted = font.FontName.replace(regex, match => `<span class="font-bold text-blue-600">${match}</span>`);
          div.innerHTML = highlighted;

          div.onclick = () => {
            window.location.href = `https://banglawebfonts.pages.dev/font/${font.FontPath}/`;
          };

          resultsContainer.appendChild(div);
        });
      } else if (query.trim()) {
        const noMatch = document.createElement('div');
        noMatch.className = 'px-4 py-2 text-gray-500 italic';
        noMatch.textContent = `No results found for "${query}"`;
        resultsContainer.appendChild(noMatch);
      } else {
        resultsContainer.classList.add('hidden');
      }
    }

    // Input logic
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      clearBtn.classList.toggle('hidden', query.length === 0);
      if (query.length === 0) {
        displayResults(fonts, '');
      } else {
        const filtered = fonts.filter(font =>
          font.FontName.toLowerCase().includes(query)
        );
        displayResults(filtered, searchInput.value);
      }
    });

/*
    // Show results on focus
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim() === '') {
        displayResults(fonts, '');
      }
    });
*/
    // Clear input
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.classList.add('hidden');
      displayResults(fonts, '');
      searchInput.focus();
    });

/*
    // Open modal
openSearch.forEach(el => {
  el.addEventListener('click', () => {
	  closeAllOverlaysExcept('search');
    searchModal.classList.remove('hidden');
	searchInput.value = '';
      clearBtn.classList.add('hidden');
      displayResults(fonts, '');
    // document.body.classList.add('overflow-hidden');
    setTimeout(() => searchInput.focus(), 150);
  });
});
*/

function openSearchModal() {
	closeAllOverlaysExcept('search');
	openMobileMenuBG();
  searchModal.classList.remove('hidden');
  searchInput.value = '';
  clearBtn.classList.add('hidden');
  displayResults(fonts, '');
  setTimeout(() => searchInput.focus(), 150);
}

function closeSearchModal() {
	closeMobileMenuBG();
  searchModal.classList.add('hidden');
  resultsContainer.classList.add('hidden');
}

openSearch.forEach(el => {
  el.addEventListener('click', () => {
    // Check if modal is hidden
    if (searchModal.classList.contains('hidden')) {
      // If hidden → OPEN it
      openSearchModal();
    } else {
      // If already open → CLOSE it
      closeSearchModal();
    }
  });
});


// Close modal if clicked on background
searchModal.addEventListener('click', (e) => {
  if (e.target === searchModal) {
    searchModal.classList.add('hidden');
    resultsContainer.classList.add('hidden');
   //document.body.classList.remove('overflow-hidden');
  }
});

// Close modal on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchModal.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    // document.body.classList.remove('overflow-hidden');
  }
});




function applyMenuItemClasses() {
	const menuItems = document.querySelectorAll("#menu a");
	for (let i = 0; i < menuItems.length; i++) {
		if (menuItems[i].pathname === window.location.pathname) {
			menuItems[i].classList.add("text-neutral-900", "dark:text-white");
		}
	}
	//:class="{ 'text-neutral-900 dark:text-white': window.location.pathname == '{menu.url}', 'text-neutral-700 dark:text-neutral-400': window.location.pathname != '{menu.url}' }"
};
applyMenuItemClasses();


function openMobileMenu() {
	document.getElementById("openMenu").classList.add("hidden");
	document.getElementById("closeMenu").classList.remove("hidden");
	document.getElementById("menu").classList.remove("hidden");
	openMobileMenuBG ();
};

function closeMobileMenu() {
	document.getElementById("closeMenu").classList.add("hidden");
	document.getElementById("openMenu").classList.remove("hidden");
	document.getElementById("menu").classList.add("hidden");
	closeMobileMenuBG ();
};


	document.getElementById("openMenu").addEventListener("click", () => {
		closeAllOverlaysExcept('menu');
		openMobileMenu();
	});

	document.getElementById("closeMenu").addEventListener("click", () => {
		closeMobileMenu();
	});
