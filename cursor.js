(function () {
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (reducedMotion || !finePointer) {
    return;
  }

  var root = document.documentElement;
  var visible = false;

  document.addEventListener(
    "mousemove",
    function (e) {
      root.style.setProperty("--mouse-x", e.clientX + "px");
      root.style.setProperty("--mouse-y", e.clientY + "px");

      if (!visible) {
        visible = true;
        root.classList.add("cursor-glow-visible");
      }
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", function () {
    visible = false;
    root.classList.remove("cursor-glow-visible");
  });
})();
