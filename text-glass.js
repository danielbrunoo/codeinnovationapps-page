(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  function appendTextAsWords(text, fragment) {
    var parts = text.split(/(\s+)/);
    parts.forEach(function (part) {
      if (!part) {
        return;
      }
      if (/^\s+$/.test(part)) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }
      var wrap = document.createElement("span");
      wrap.className = "glass-text__word";
      wrap.setAttribute("tabindex", "0");
      var inner = document.createElement("span");
      inner.className = "glass-text__word-inner";
      inner.textContent = part;
      wrap.appendChild(inner);
      fragment.appendChild(wrap);
    });
  }

  function initGlassText(element) {
    if (element.dataset.glassReady) {
      return;
    }
    element.dataset.glassReady = "true";

    var nodes = Array.prototype.slice.call(element.childNodes);
    var fragment = document.createDocumentFragment();

    nodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        appendTextAsWords(node.textContent, fragment);
      } else if (node.nodeName === "BR") {
        fragment.appendChild(document.createElement("br"));
      }
    });

    element.textContent = "";
    element.appendChild(fragment);
    element.classList.add("glass-text");
  }

  document.querySelectorAll("[data-glass-text]").forEach(initGlassText);
})();
