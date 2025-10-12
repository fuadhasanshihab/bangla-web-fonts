function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}



let fonts = [];
  var timeoutFHS;
  var listenersAdded = false;

  function activateLazyLoading() {
    try {
      if (!localStorage.getItem("lazy")) {
        localStorage.setItem("lazy", "1");
      }
    } catch (e) {
      console.warn("error", e);
    }

    loadCSS('/css/webfonts.min.css');

setTimeout(() => {
  document.querySelectorAll('.skeleton').forEach(el => el.classList.add('loaded'));
}, 0);

	      

    // Fetch font data
    fetch('/api/fonts.json')
      .then(res => res.json())
      .then(data => fonts = data);


    // Remove event listeners only if they were added
    if (listenersAdded) {
      document.removeEventListener("mousemove", activateLazyLoading);
      document.removeEventListener("touchstart", activateLazyLoading);
      document.removeEventListener("keydown", activateLazyLoading);
      document.removeEventListener("scroll", activateLazyLoading);
      clearTimeout(timeoutFHS);
    }
  }

  try {
    if (localStorage.getItem("lazy") === "1") {
      activateLazyLoading();
    } else {
      listenersAdded = true;
      document.addEventListener("mousemove", activateLazyLoading);
      document.addEventListener("touchstart", activateLazyLoading);
      document.addEventListener("keydown", activateLazyLoading);
      document.addEventListener("scroll", activateLazyLoading);
      timeoutFHS = setTimeout(activateLazyLoading, 30000);
    }
  } catch (e) {
    activateLazyLoading();
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

    // Open modal
openSearch.forEach(el => {
  el.addEventListener('click', () => {
    searchModal.classList.remove('hidden');
	searchInput.value = '';
      clearBtn.classList.add('hidden');
      displayResults(fonts, '');
    // document.body.classList.add('overflow-hidden');
    setTimeout(() => searchInput.focus(), 150);
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
	document.getElementById("mobileMenuBackground").classList.add("opacity-0");
	document.getElementById("mobileMenuBackground").classList.remove("hidden");

	setTimeout(() => {
		document
			.getElementById("mobileMenuBackground")
			.classList.remove("opacity-0");
	}, 1);
};

function closeMobileMenu() {
	document.getElementById("closeMenu").classList.add("hidden");
	document.getElementById("openMenu").classList.remove("hidden");
	document.getElementById("menu").classList.add("hidden");
	document.getElementById("mobileMenuBackground").classList.add("hidden");
};


	document.getElementById("openMenu").addEventListener("click", () => {
		openMobileMenu();
	});

	document.getElementById("closeMenu").addEventListener("click", () => {
		closeMobileMenu();
	});

