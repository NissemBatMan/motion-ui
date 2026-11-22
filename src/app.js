import { animations, withReducedMotion } from "./animations.js";

const grid = document.querySelector("#grid");
const filters = document.querySelector("#filters");
const toast = document.querySelector("#toast");
const pauseButton = document.querySelector("#pause");
const dialog = document.querySelector("#code");

const categories = ["All", ...new Set(animations.map((a) => a.category))];
let active = "All";

// One <style> with every snippet: the previews use exactly the code people copy.
const style = document.createElement("style");
style.textContent = animations.map((a) => withReducedMotion(a.css, a.id)).join("\n\n");
document.head.append(style);

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** Very small CSS/HTML highlighter: enough for readable snippets, no dependency. */
function highlight(code, language) {
  let html = escapeHtml(code);
  if (language === "css") {
    html = html
      .replace(/(@[\w-]+)/g, '<span class="t-at">$1</span>')
      .replace(/([\w-]+)(?=\s*:[^:{}]*;)/g, '<span class="t-prop">$1</span>')
      .replace(/(#[0-9a-fA-F]{3,8}\b|\b\d*\.?\d+(?:px|s|ms|deg|turn|%|ch|em|rem|fr)?\b)/g, '<span class="t-num">$1</span>');
  } else {
    html = html
      .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="t-tag">$2</span>')
      .replace(/([\w-]+)=(&quot;[^&]*&quot;)/g, '<span class="t-prop">$1</span>=<span class="t-str">$2</span>');
  }
  return html;
}

function snippet(animation) {
  return `<!-- ${animation.title} — Motion UI (MIT) -->\n${animation.html}\n\n<style>\n${withReducedMotion(animation.css, animation.id)}\n</style>\n`;
}

async function copy(text, label) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(`${label} copied`);
  } catch {
    showToast("Copy failed: select the code and copy it manually");
  }
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

function openCode(animation) {
  dialog.querySelector("h2").textContent = animation.title;
  dialog.querySelector("[data-lang=html] code").innerHTML = highlight(animation.html, "html");
  dialog.querySelector("[data-lang=css] code").innerHTML = highlight(withReducedMotion(animation.css, animation.id), "css");
  dialog.querySelector("#copy-all").onclick = () => copy(snippet(animation), "HTML + CSS");
  dialog.showModal();
  history.replaceState(null, "", `#${animation.id}`);
}

function render() {
  filters.replaceChildren(
    ...categories.map((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = category;
      button.setAttribute("aria-pressed", String(category === active));
      button.onclick = () => {
        active = category;
        render();
      };
      return button;
    }),
  );

  const visible = animations.filter((a) => active === "All" || a.category === active);
  grid.replaceChildren(
    ...visible.map((animation, index) => {
      const card = document.createElement("article");
      card.className = "tile";
      card.id = animation.id;
      card.style.setProperty("--i", String(index));
      card.innerHTML = `
        <div class="stage">${animation.html}</div>
        <footer>
          <div>
            <h3>${escapeHtml(animation.title)}</h3>
            <span>${escapeHtml(animation.category)}</span>
          </div>
          <button type="button" class="ghost" data-action="code" aria-label="View code for ${escapeHtml(animation.title)}">&lt;/&gt;</button>
          <button type="button" data-action="copy">Copy</button>
        </footer>`;
      card.querySelector("[data-action=code]").onclick = () => openCode(animation);
      card.querySelector("[data-action=copy]").onclick = () => copy(snippet(animation), animation.title);
      // Demo links must not jump to the top of the gallery.
      card.querySelectorAll(".stage a").forEach((link) => link.addEventListener("click", (e) => e.preventDefault()));
      return card;
    }),
  );
  document.querySelector("#count").textContent = `${animations.length} animations`;
}

pauseButton.onclick = () => {
  const paused = document.body.classList.toggle("paused");
  pauseButton.setAttribute("aria-pressed", String(paused));
  pauseButton.textContent = paused ? "▶ Play" : "❚❚ Pause";
};

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => history.replaceState(null, "", location.pathname));
dialog.querySelectorAll("[data-copy]").forEach((button) => {
  button.onclick = () => copy(button.closest("section").querySelector("code").textContent, button.dataset.copy);
});

document.querySelector("#accent").addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--mu-accent", e.target.value);
});

render();

// Deep link: /#typewriter opens that snippet.
const fromHash = animations.find((a) => `#${a.id}` === location.hash);
if (fromHash) openCode(fromHash);
