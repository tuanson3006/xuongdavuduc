// (function scrollSpy () {
//   "use strict";

//   var section = document.querySelectorAll(".section");
//   var sections = {};
//   var i = 0;

//   Array.prototype.forEach.call(section, function (e) {
//     sections[e.id] = e.offsetTop;
//   });

//   window.onscroll = function () {
//     var scrollPosition =
//       document.documentElement.scrollTop || document.body.scrollTop;

//     for (i in sections) {
//       if (sections[i] <= scrollPosition) {
//         let x = document
//           .querySelector(".nav-item.active")
//           .setAttribute("class", "nav-item");
//           let aToActive = document.querySelector(`a[href*="${i}"]`);
//           console.log(aToActive);
//         // let aToActive = document.querySelector(`a[href*="${i}"]`).parentNode;
//         // aToActive.setAttribute("class", "nav-item active");
//       }
//     }
//   };
// })();
// console.log(x);
