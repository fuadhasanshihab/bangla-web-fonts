    const openSearch = document.querySelectorAll('.openSearch');
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('results');
    const clearBtn = document.getElementById('clearBtn');
    let fonts = [];

    // Fetch font data
    fetch('https://cdn.jsdelivr.net/gh/fuadhasanshihab/bangla-web-fonts@main/src/collections/fonts.json')
      .then(res => res.json())
      .then(data => fonts = data);

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
            window.location.href = `https://banglawebfonts.pages.dev/${font.FontPath}/`;
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

    // Show results on focus
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim() === '') {
        displayResults(fonts, '');
      }
    });

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






window.darkMode = false;

const stickyClasses = ["fixed", "h-14"];
const unstickyClasses = ["absolute", "h-20"];
const stickyClassesContainer = [
	"border-neutral-300/50",
	"bg-white/80",
	"dark:border-neutral-600/40",
	"dark:bg-neutral-900/60",
	"backdrop-blur-2xl",
];
const unstickyClassesContainer = ["border-transparent"];
let headerElement = null;

document.addEventListener("DOMContentLoaded", () => {
	headerElement = document.getElementById("header");

	if (
		localStorage.getItem("dark_mode") &&
		localStorage.getItem("dark_mode") === "true"
	) {
		window.darkMode = true;
		showNight();
	} else {
		showDay();
	}
	stickyHeaderFuncionality();
	applyMenuItemClasses();
	evaluateHeaderPosition();
	mobileMenuFunctionality();
});

// window.toggleDarkMode = function(){
//     document.documentElement.classList.toggle('dark');
//     if(document.documentElement.classList.contains('dark')){
//         localStorage.setItem('dark_mode', true);
//         window.darkMode = true;
//     } else {
//         window.darkMode = false;
//         localStorage.setItem('dark_mode', false);
//     }
// }

window.stickyHeaderFuncionality = () => {
	window.addEventListener("scroll", () => {
		evaluateHeaderPosition();
	});
};

window.evaluateHeaderPosition = () => {
	if (window.scrollY > 16) {
		headerElement.firstElementChild.classList.add(...stickyClassesContainer);
		headerElement.firstElementChild.classList.remove(
			...unstickyClassesContainer,
		);
		headerElement.classList.add(...stickyClasses);
		headerElement.classList.remove(...unstickyClasses);
		document.getElementById("menu").classList.add("top-[56px]");
		document.getElementById("menu").classList.remove("top-[75px]");

document.getElementById("searchModal").classList.add("top-[55px]");
		document.getElementById("searchModal").classList.remove("top-[74px]");

	} else {
		headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
		headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
		headerElement.classList.add(...unstickyClasses);
		headerElement.classList.remove(...stickyClasses);
		document.getElementById("menu").classList.remove("top-[56px]");
		document.getElementById("menu").classList.add("top-[75px]");

document.getElementById("searchModal").classList.remove("top-[55px]");
		document.getElementById("searchModal").classList.add("top-[74px]");

	}
};

document.getElementById("darkToggle").addEventListener("click", () => {
	document.documentElement.classList.add("duration-300");

	if (document.documentElement.classList.contains("dark")) {
		localStorage.removeItem("dark_mode");
		showDay(true);
	} else {
		localStorage.setItem("dark_mode", true);
		showNight(true);
	}
});

function showDay(animate) {
	document.getElementById("sun").classList.remove("setting");
	document.getElementById("moon").classList.remove("rising");

	let timeout = 0;

	if (animate) {
		timeout = 500;

		document.getElementById("moon").classList.add("setting");
	}

	setTimeout(() => {
		document.getElementById("dayText").classList.remove("hidden");
		document.getElementById("nightText").classList.add("hidden");

		document.getElementById("moon").classList.add("hidden");
		document.getElementById("sun").classList.remove("hidden");

		if (animate) {
			document.documentElement.classList.remove("dark");
			document.getElementById("sun").classList.add("rising");
		}
	}, timeout);
}

function showNight(animate) {
	document.getElementById("moon").classList.remove("setting");
	document.getElementById("sun").classList.remove("rising");

	let timeout = 0;

	if (animate) {
		timeout = 500;

		document.getElementById("sun").classList.add("setting");
	}

	setTimeout(() => {
		document.getElementById("nightText").classList.remove("hidden");
		document.getElementById("dayText").classList.add("hidden");

		document.getElementById("sun").classList.add("hidden");
		document.getElementById("moon").classList.remove("hidden");

		if (animate) {
			document.documentElement.classList.add("dark");
			document.getElementById("moon").classList.add("rising");
		}
	}, timeout);
}

window.applyMenuItemClasses = () => {
	const menuItems = document.querySelectorAll("#menu a");
	for (let i = 0; i < menuItems.length; i++) {
		if (menuItems[i].pathname === window.location.pathname) {
			menuItems[i].classList.add("text-neutral-900", "dark:text-white");
		}
	}
	//:class="{ 'text-neutral-900 dark:text-white': window.location.pathname == '{menu.url}', 'text-neutral-700 dark:text-neutral-400': window.location.pathname != '{menu.url}' }"
};

function mobileMenuFunctionality() {
	document.getElementById("openMenu").addEventListener("click", () => {
		openMobileMenu();
	});

	document.getElementById("closeMenu").addEventListener("click", () => {
		closeMobileMenu();
	});
}

window.openMobileMenu = () => {
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

window.closeMobileMenu = () => {
	document.getElementById("closeMenu").classList.add("hidden");
	document.getElementById("openMenu").classList.remove("hidden");
	document.getElementById("menu").classList.add("hidden");
	document.getElementById("mobileMenuBackground").classList.add("hidden");
};
