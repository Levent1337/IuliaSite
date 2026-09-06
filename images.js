/* ==========================================================================
   IMAGE FORMAT FALLBACK
   Lets every <img> in the site be written without a file extension, e.g.:
     <img data-img="images/billie-maria/1" alt="...">
   This script tries each extension in EXTENSIONS below, in order, and uses
   whichever file actually exists — so you can drop in a .jpg here and a
   .png there without touching any HTML. Add more extensions to the list
   if you ever use something else (e.g. "avif").
   ========================================================================== */
(function () {
  var EXTENSIONS = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP"];

  function tryNext(img, index) {
    if (index >= EXTENSIONS.length) {
      // Nothing matched any extension — leave a visible gap rather than
      // a broken-image icon, so a missing photo is obvious at a glance.
      img.removeAttribute("src");
      img.classList.add("img-missing");
      return;
    }
    img.onerror = function () {
      tryNext(img, index + 1);
    };
    img.src = img.dataset.img + "." + EXTENSIONS[index];
  }

  document.addEventListener("DOMContentLoaded", function () {
    var images = document.querySelectorAll("img[data-img]");
    images.forEach(function (img) {
      tryNext(img, 0);
    });
  });
})();
