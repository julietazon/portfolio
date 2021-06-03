/* Typewrite effect */
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 9) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 4;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 600;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");

  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

/* Tooltip */
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

/* Components*/
class Navigation extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <navigation>
      <style>
        li {
          margin-right: 15px;
        }

        .navbar {
          background-color: black;
          font-weight: bolder;
        }

        .navbar-toggler-icon {
          color: white;
        }

        .ml-auto,
        .mx-auto {
          margin-left: auto !important;
        }

        .nav-link {
          font-weight: normal;
        }

        li:hover {
          opacity: 0.6;
        }

      </style>
      <nav class="navbar fixed-top navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"
            ><img src="/img/logo_w.png" alt="julie's logo" class="logo" width="50"
          /></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
          >
            <span class="navbar-toggler-icon" title="homepage"
              ><i class="fas fa-bars fa-lg align-middle"></i
            ></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarToggler">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link text-white" href="/index.html#about" title="about">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="/projects.html" title="projects">Projects</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </navigation>
    `;
  }
}

customElements.define("navigation-component", Navigation);

/* Theme change */
/*
let theme = localStorage.getItem("data-theme");

const changeThemeToDark = () => {
  document.documentElement.setAttribute("data-theme", "dark"); // set theme to dark
  localStorage.setItem("data-theme", "dark"); // save theme to local storage
};
const changeThemeToLight = () => {
  document.documentElement.setAttribute("data-theme", "light"); // set theme light
  localStorage.setItem("data-theme", "light"); // save theme to local storage
};

// Get the element based on ID
const checkbox = document.getElementById("flexSwitchCheckChecked");
// Apply retrived theme to the website
checkbox.addEventListener("change", () => {
  let theme = localStorage.getItem("data-theme"); // Retrieve saved theme from local storage
  if (theme === "light") {
    changeThemeToDark();
  } else {
    changeThemeToLight();
  }
});
*/

/* Theme change 2 */
// Get the theme toggle input
const themeToggle = document.querySelector("#flexSwitchCheckChecked");
// Function that will switch the theme based on the if the theme toggle is checked or not
function switchTheme(theme) {
  if (theme.target.checked) {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}
// Add an event listener to the theme toggle, which will switch the theme
themeToggle.addEventListener("change", switchTheme, false);

function switchTheme(theme) {
  if (theme.target.checked) {
    document.documentElement.setAttribute("data-theme", "light");

    // Set the user's theme preference to light
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");

    // Set the user's theme preference to dark
    localStorage.setItem("theme", "dark");
  }
}

// Get the current theme from local storage
const currentTheme = localStorage.getItem("theme");
// If the current local storage item can be found
if (currentTheme) {
  // Set the body data-theme attribute to match the local storage item
  document.documentElement.setAttribute("data-theme", currentTheme);
  // If the current theme is dark, check the theme toggle
  if (currentTheme === "light") {
    themeToggle.checked = true;
  }
}
