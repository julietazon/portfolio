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

/* Theme change 1 */
const themeSwitch = document.querySelector(".form-check-input");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", "light-theme");
});

/* Theme change 2 */
/*
const themeSwitcher = document.querySelector(".form-check-input");

themeSwitcher.checked = false;
function clickHandler() {
  if (this.checked) {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light-theme");
  } else {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark-theme");
  }
}

themeSwitcher.addEventListener("click", clickHandler);

window.onload = checkTheme();
function checkTheme() {
  const localStorageTheme = localStorage.getItem("theme");

  if (localStorageTheme !== null && localStorageTheme === "dark") {
    document.body.className = localStorageTheme;

    const themeSwitch = document.querySelector(".form-check-input");
    themeSwitch.checked = true;
  }
}
*/
