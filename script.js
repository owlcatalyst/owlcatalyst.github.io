//ICONS 目前在<script>标签的onload里执行
//feather.replace();

var is_menu_open = false;
var top_fixed = false;

//Simple lazy load
document.querySelectorAll(".lazyload").forEach((img) => {
  img.src = img.attributes["data-src"].value;
});

//Menu
const $moblie_header = document.querySelector("#moblie-header");
document.querySelector(".burger").addEventListener("click", () => {
  if (is_menu_open) {
    document.querySelector(".sidebar").classList.remove("active");
    document.querySelector(".burger").innerHTML = `<i data-feather="menu"></i>`;
    $moblie_header.classList.remove("no-shadow");
  } else {
    document.querySelector(".sidebar").classList.add("active");
    document.querySelector(".burger").innerHTML = `<i data-feather="x"></i>`;
    $moblie_header.classList.add("no-shadow");
  }
  feather.replace();
  is_menu_open = !is_menu_open;
});

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 40 && !top_fixed) {
    $moblie_header.classList.add("fixed");
    top_fixed = true;
  }
  if (window.pageYOffset <= 40 && top_fixed) {
    $moblie_header.classList.remove("fixed");
    top_fixed = false;
  }
});

//Scroll To Top
document.querySelector(".fab").addEventListener("click", () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
  document.querySelector(".fab").blur();
});

// TOC

if (document.querySelector(".toc") != null) {
  var toc = {};
  //const title_height = 35;
  var keys = {};

  function getOffset(element) {
    if (element.offsetParent) {
      return element.offsetTop + getOffset(element.offsetParent);
    } else {
      return element.offsetTop;
    }
  }

  function getCurId(keys) {
    if (window.pageYOffset < toc[keys[0]]) {
      return keys[0];
    } else if (window.pageYOffset >= toc[keys[keys.length - 1]]) {
      return keys[keys.length - 1];
    } else {
      for (let i = 0; i < keys.length - 1; i++) {
        if (
          window.pageYOffset >= toc[keys[i]] &&
          window.pageYOffset < toc[keys[i + 1]]
        ) {
          return keys[i];
        }
      }
    }
  }

  document.querySelectorAll("h2,h3").forEach((ele) => {
    toc[`to-${ele.id}`] = getOffset(ele);
  });

  keys = Object.keys(toc);

  if (keys.length > 0) {
    window.addEventListener("scroll", function () {
      let id = getCurId(keys);
      keys.forEach((ele) =>
        document.getElementById(ele).classList.remove("active")
      );
      document.getElementById(id).classList.add("active");
    });
  } else {
    document.querySelector(".toc").remove();
  }
}

//feather Icon loaded
function icon_loaded() {
  
  // Copy Code
  document.querySelectorAll(".post-type pre").forEach((ele) => {
    //wrap
    let $div = document.createElement("div");
    $div.style = "position:relative";
    ele.parentNode.insertBefore($div, ele);
    $div.append(ele);
    //建立按钮
    let $btn = document.createElement("button");
    $btn.classList.add("copy");
    $btn.innerHTML = `<i data-feather="copy">copy</i>`;
    $btn.onclick = () => {
      const $textarea = document.createElement("textarea");
      $textarea.style = "position:fixed;left:-1000px";
      $textarea.setAttribute("readonly", "readonly");
      document.querySelector("body").append($textarea);
      //$textarea.setAttribute("value", ele.innerText);
      $textarea.innerHTML = ele.innerText;
      $textarea.select();
      document.execCommand("Copy");
    };
    ele.parentNode.insertBefore($btn, ele);
  });

  feather.replace();
}
