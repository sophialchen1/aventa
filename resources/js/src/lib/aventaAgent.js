// The Aventa AI advisor (ThreeKit) as a floating panel on every page.
//
// Adapted from the drop-in snippet the vendor supplied. Four things had to
// change for this site:
//
// 1. The original set `open = true` and rendered immediately, so it opened
//    itself full size on every page load and loaded the vendor iframe for
//    every visitor whether or not they wanted it. Here the iframe is created
//    the first time the panel opens, and the panel opens by itself only once,
//    only on the desktop homepage.
//
// 2. The original ran once. That does not work in a single page app: the
//    router swaps pages without a page load, so the decision has to follow the
//    route instead of being frozen at whichever page the visitor landed on.
//
// 3. Its bubble sat on exactly the same coordinates as the WhatsApp button and
//    covered it. On desktop the advisor now lives bottom left and WhatsApp
//    keeps bottom right. Below 640px they stack in the right corner, advisor
//    at the bottom, WhatsApp lifted above it by a rule in MainLayout.vue.
//
// 4. Closing depended entirely on the vendor iframe posting a message back. If
//    their page does not render a minimize control the visitor is stuck, and
//    on a phone the panel is full height, so stuck means trapped. There is now
//    a close button of our own and Escape also closes.

import { track } from "./track.js";

const AGENT_URL = "https://aventa-v2.3kit.com/agent";
const AGENT_ORIGIN = "https://aventa-v2.3kit.com";
const Z_INDEX = 2147483000;

// When the advisor may open itself. It greets arrivals, not people already
// moving through the site, so it opens by itself only on the page the visit
// started on, whichever page that is: an ad that lands on /ventanas gets the
// same greeting the homepage does. Once the visitor navigates anywhere else
// they are browsing, not arriving, and the greeting is spent for the session.
// Desktop only, see DESKTOP below.
const AUTO_OPEN_AFTER_MS = 8000;
// Scrolled more than one screen, rather than a fixed number of pixels, so the
// trigger means the same thing on a phone as on a monitor.
const AUTO_OPEN_AFTER_SCREENS = 1.25;

// The page the visit started on, read before the router has done anything.
const LANDING_PATH = typeof window !== "undefined" ? window.location.pathname : "";

// Matches the CSS breakpoint further down. Below it the panel is full screen,
// so the advisor never opens itself there: the visitor taps the bubble or
// nothing happens.
const DESKTOP = "(min-width: 641px) and (min-height: 521px)";

// The page at this route embeds the same agent full width. Showing a floating
// copy of it on top would be the agent twice.
const HIDDEN_PATHS = ["/design-experience"];

// One auto-open per browser session. Closing it counts: someone who dismissed
// the advisor on the homepage should not meet it again on the next page.
const SEEN_KEY = "aventa-agent-seen";

const ns = "aventa-agent";

const ICON_CHAT =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';

const ICON_CLOSE =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';

const css = `
.${ns}{position:fixed;z-index:${Z_INDEX};left:max(1.25rem,env(safe-area-inset-left,0px));bottom:max(1.25rem,env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:flex-start;gap:.75rem;pointer-events:none;box-sizing:border-box}
.${ns}--hidden{display:none}
.${ns}__panel{display:flex;flex-direction:column;pointer-events:auto;box-sizing:border-box;width:min(400px,calc(100vw - 2.5rem));height:min(620px,calc(100dvh - 5.5rem));max-height:calc(100svh - 2.5rem);border-radius:20px;overflow:hidden;background:rgba(247,242,234,.58);backdrop-filter:blur(22px) saturate(1.35);-webkit-backdrop-filter:blur(22px) saturate(1.35);border:1px solid rgba(255,255,255,.48);box-shadow:0 18px 48px rgba(42,34,28,.18),0 2px 8px rgba(42,34,28,.08),inset 0 1px 0 rgba(255,255,255,.55)}
.${ns}__panel--hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);pointer-events:none;visibility:hidden}
.${ns}__bar{flex:0 0 34px;display:flex;align-items:center;justify-content:flex-end;padding:0 8px}
.${ns}__iframe{flex:1 1 auto;width:100%;min-height:0;border:0;display:block;background:transparent}
.${ns}__close{width:28px;height:28px;flex:0 0 28px;border-radius:50%;border:1px solid rgba(42,34,28,.12);background:rgba(247,242,234,.92);color:#2a221c;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}
.${ns}__close:hover{background:#fff}
.${ns}__fab{pointer-events:auto;width:56px;height:56px;min-width:56px;min-height:56px;border-radius:50%;border:1px solid rgba(255,255,255,.22);background:rgba(42,34,28,.88);color:#f7f2ea;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 10px 28px rgba(42,34,28,.28),inset 0 1px 0 rgba(255,255,255,.12);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform 180ms ease,background-color 180ms ease}
.${ns}__fab:hover{transform:translateY(-2px);background:rgba(42,34,28,.96)}
@media (max-width:640px),(max-height:520px){
.${ns}{left:max(1rem,env(safe-area-inset-left,0px));right:max(1rem,env(safe-area-inset-right,0px));bottom:max(1rem,env(safe-area-inset-bottom,0px));align-items:stretch}
.${ns}__panel{width:100%;height:calc(100dvh - 2rem - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px));max-height:calc(100svh - 2rem);border-radius:16px}
.${ns}__fab{align-self:flex-end;width:52px;height:52px;min-width:52px;min-height:52px}
}
@media (prefers-reduced-motion: reduce){.${ns}__fab,.${ns}__fab:hover{transition:none;transform:none}}
`;

let root, panel, iframe, fab, isOpen = false, autoOpenTimer = null;

// Set as soon as the visitor navigates anywhere else. From then on the session
// has no landing page left to greet.
let leftLanding = false;

function seen() {
    try {
        return sessionStorage.getItem(SEEN_KEY) === "1";
    } catch (e) {
        // Private mode and blocked storage both throw. Treat it as seen, so a
        // visitor whose browser will not remember the dismissal is greeted at
        // most once rather than on every navigation.
        return true;
    }
}

function markSeen() {
    try {
        sessionStorage.setItem(SEEN_KEY, "1");
    } catch (e) {
        /* nothing to do: the session just loses the memory */
    }
}

function agentSrc() {
    const params = new URLSearchParams();
    params.set("embed", "1");
    // Set once, when the panel first opens. Re-pointing the iframe on a later
    // language switch would restart the conversation mid-sentence.
    params.set("lang", (document.documentElement.lang || "es").slice(0, 2).toLowerCase() === "en" ? "en" : "es");
    params.set("parent_page", location.href);
    params.set("parent_host", location.hostname.replace(/^www\./i, ""));
    params.set("parent_search", location.search || "");
    return AGENT_URL + "?" + params.toString();
}

function render() {
    panel.classList.toggle(`${ns}__panel--hidden`, !isOpen);
    fab.style.display = isOpen ? "none" : "flex";
}

function setOpen(next) {
    isOpen = !!next;
    if (isOpen && !iframe.src) iframe.src = agentSrc();
    if (isOpen) markSeen();
    render();
}

function cancelAutoOpen() {
    if (autoOpenTimer) clearTimeout(autoOpenTimer);
    autoOpenTimer = null;
    window.removeEventListener("scroll", onScroll);
}

function onScroll() {
    if (window.scrollY < AUTO_OPEN_AFTER_SCREENS * window.innerHeight) return;
    cancelAutoOpen();
    autoOpen();
}

function autoOpen() {
    if (seen() || isOpen) return;
    setOpen(true);
    track("advisor_open", { link_location: "auto_inicio" });
}

// Waits for whichever comes first, a scroll or the timer. Opening the instant
// the page loads reads as an interruption; opening once the visitor has moved
// reads as an offer.
function armAutoOpen() {
    cancelAutoOpen();
    if (seen()) return;
    if (!window.matchMedia(DESKTOP).matches) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    autoOpenTimer = setTimeout(() => {
        cancelAutoOpen();
        autoOpen();
    }, AUTO_OPEN_AFTER_MS);
}

export function mountAventaAgent(router) {
    if (window.__AventaAgentLoaded) return;
    window.__AventaAgentLoaded = true;

    const styleEl = document.createElement("style");
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    root = document.createElement("div");
    root.className = ns;

    panel = document.createElement("div");
    panel.className = `${ns}__panel`;
    root.appendChild(panel);

    const bar = document.createElement("div");
    bar.className = `${ns}__bar`;
    panel.appendChild(bar);

    iframe = document.createElement("iframe");
    iframe.className = `${ns}__iframe`;
    iframe.title = "Aventa advisor";
    iframe.allow = "camera; microphone; clipboard-write";
    panel.appendChild(iframe);

    // Their header carries its own control on the right. Ours lives in a strip
    // above their UI so the two never sit on top of each other.
    const close = document.createElement("button");
    close.type = "button";
    close.className = `${ns}__close`;
    close.setAttribute("aria-label", "Cerrar");
    close.innerHTML = ICON_CLOSE;
    close.addEventListener("click", () => setOpen(false));
    bar.appendChild(close);

    fab = document.createElement("button");
    fab.type = "button";
    fab.className = `${ns}__fab`;
    fab.setAttribute("aria-label", "Chatear con Aventa");
    fab.innerHTML = ICON_CHAT;
    fab.addEventListener("click", () => {
        setOpen(true);
        track("advisor_open", { link_location: "boton_flotante" });
    });
    root.appendChild(fab);

    document.body.appendChild(root);
    render();

    window.addEventListener("message", (event) => {
        // The original listened to every origin. Only the vendor has anything
        // to say to us here.
        if (event.origin !== AGENT_ORIGIN) return;
        const data = event.data;
        if (data && typeof data === "object" && data.type === "AVENTA_WIDGET_MINIMIZE") setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) setOpen(false);
    });

    // The route decides where the advisor is allowed to appear at all, and
    // where it may open itself. Both have to be re-read on every navigation:
    // nothing reloads the page in between.
    const apply = (to) => {
        const hide = HIDDEN_PATHS.includes(to.path);
        root.classList.toggle(`${ns}--hidden`, hide);
        if (hide) {
            cancelAutoOpen();
            setOpen(false);
            return;
        }
        // Note this never closes a panel that is already open: someone who was
        // greeted on /ventanas and then clicks Home keeps the conversation.
        if (to.path !== LANDING_PATH) leftLanding = true;
        if (!leftLanding) armAutoOpen();
        else cancelAutoOpen();
    };

    router.afterEach(apply);
    router.isReady().then(() => apply(router.currentRoute.value));

    window.AventaAgent = { open: () => setOpen(true), close: () => setOpen(false) };
}
