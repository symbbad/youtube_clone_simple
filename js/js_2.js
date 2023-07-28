// // header

// // hamburger 버튼으로 navbar 요소의 display 값 변환 (none <----> block)

// function hamburgerMobileFunc() {
//   const navbarFunc = document.querySelector(".navbar");

//   // 현재 요소의 display 상태를 가져옵니다.
//   const currentDisplay = window.getComputedStyle(navbarFunc).display;

//   // display 속성을 토글합니다.
//   if (currentDisplay === "none") {
//     navbarFunc.style.display = "block";
//   } else {
//     navbarFunc.style.display = "none";
//   }
// }

// function hamburgerFunc() {
//   const navbarFunc = document.querySelector(".navbar");
//   const navbarSmallFunc = document.querySelector(".navbar-small");

//   // 현재 요소의 display 상태를 가져옵니다.
//   const currentDisplay = window.getComputedStyle(navbarFunc).display;

//   // display 속성을 토글합니다.
//   if (currentDisplay === "none") {
//     navbarFunc.style.display = "block";
//     navbarSmallFunc.style.display = "none";
//   } else {
//     navbarFunc.style.display = "none";
//     navbarSmallFunc.style.display = "block";
//   }
// }

// document.querySelector(".hamburger").onclick = hamburgerFunc;

// // notification 창 활성화 (미완성입니다)
// //active_notifications.svg 생성 필요

// function notificationFunc() {
//   const notificationIcon = document.querySelector(".notifications");

//   // active 클래스가 이미 존재하면 제거, 존재하지 않으면 추가
//   notificationIcon.classList.toggle("active");

//   // css
//   /*
//     기본 아이콘 이미지
//     .notifications {
//     background-image: url('./img/notifications.svg');
//   }
  
//    클릭시 바뀔 아이콘 이미지
//   .notifications.active {
//     background-image: url('./img/active_notifications.svg');
//   }
//      */
// }


/* ---------------navbar on/off------------- */
function toggleNavbar() {
  var navbar = document.querySelector(".navbar");
  var expandNavbar = document.querySelector(".expand-navbar");

  navbar.classList.toggle("displayNone");
  expandNavbar.classList.toggle("display");
}


function isMiddlePage() {
  return window.location.pathname.includes("/middle-page");
}

function showExpandNavbar() {
  const expandNavbar = document.querySelector(".expand-navbar");
  expandNavbar.style.display = "block";
}

function hideExpandNavbar() {
  const expandNavbar = document.querySelector(".expand-navbar");
  expandNavbar.style.display = "none";
}

// 페이지 사이즈별 구분
function controlScreen() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const screenWidth = window.innerWidth;

  // 모든 페이지에서 햄버거 버튼은 보여짐 // 최소화면에서 햄버거가 계속 사라져서 강제시켰습니다.
  hamburger.style.display = "block";

  if (isMiddlePage() && screenWidth > 768) {
    showExpandNavbar();
    navbar.style.display = "none";
  } else {
    hideExpandNavbar();
    navbar.style.display = "block";
  }
}

window.addEventListener("load", controlScreen);
window.addEventListener("resize", controlScreen);

controlScreen();