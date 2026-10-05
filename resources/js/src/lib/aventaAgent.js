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
// 4. Closing is the vendor's minimize button, which posts a message back to
//    us. Escape closes too, as a fallback that costs nothing. We briefly
//    carried a close button of our own, from when their header had only a
//    refresh control and a visitor on a phone, where the panel is full height,
//    had no way out at all. They added the minimize, so ours came back out.

import { i18n } from "../router/i18n.js";
import { track } from "./track.js";

const AGENT_URL = "https://aventa-v2.3kit.com/agent";
const AGENT_ORIGIN = "https://aventa-v2.3kit.com";
const Z_INDEX = 2147483000;

// When the advisor may open itself. It greets arrivals, not people already
// moving through the site, so it opens by itself only on the page the visit
// started on, whichever page that is: an ad that lands on /ventanas gets the
// same greeting the homepage does. Once the visitor navigates anywhere else
// they are browsing, not arriving, and the greeting is spent for the session.
const AUTO_OPEN_AFTER_MS = 8000;
// Scrolled more than one screen, rather than a fixed number of pixels, so the
// trigger means the same thing on a phone as on a monitor.
const AUTO_OPEN_AFTER_SCREENS = 1.25;

// The page the visit started on, read before the router has done anything.
const LANDING_PATH = typeof window !== "undefined" ? window.location.pathname : "";

// The page at this route embeds the same agent full width. Showing a floating
// copy of it on top would be the agent twice.
const HIDDEN_PATHS = ["/design-experience"];

// When the advisor last greeted this visitor, as a timestamp in localStorage.
// localStorage rather than sessionStorage because sessionStorage belongs to one
// tab: a second tab would count as a fresh visit and greet them again. Closing
// the panel counts as having been greeted, so someone who dismissed it on the
// landing page does not meet it again on the next page.
const SEEN_KEY = "aventa-agent-seen";

// How long that record holds. Coming back the next day is a new visit and gets
// a new greeting; coming back after lunch does not.
const SEEN_FOR_MS = 24 * 60 * 60 * 1000;

// Whether the panel was open when the page last unloaded. Read back only on a
// reload, so refreshing leaves the advisor exactly as the visitor had it while
// a new tab still starts closed.
const OPEN_KEY = "aventa-agent-open";

const ns = "aventa-agent";

const ICON_CHAT =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';

const css = `
.${ns}{position:fixed;z-index:${Z_INDEX};left:max(1.25rem,env(safe-area-inset-left,0px));bottom:max(1.25rem,env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:flex-start;gap:.75rem;pointer-events:none;box-sizing:border-box}
.${ns}--hidden{display:none}
.${ns}__panel{pointer-events:auto;box-sizing:border-box;width:min(400px,calc(100vw - 2.5rem));height:min(620px,calc(100dvh - 5.5rem));max-height:calc(100svh - 2.5rem);border-radius:20px;overflow:hidden;background:rgba(247,242,234,.58);backdrop-filter:blur(22px) saturate(1.35);-webkit-backdrop-filter:blur(22px) saturate(1.35);border:1px solid rgba(255,255,255,.48);box-shadow:0 18px 48px rgba(42,34,28,.18),0 2px 8px rgba(42,34,28,.08),inset 0 1px 0 rgba(255,255,255,.55)}
.${ns}__panel--hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);pointer-events:none;visibility:hidden}
.${ns}__iframe{width:100%;height:100%;border:0;display:block;background:transparent}
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
        const at = Number(localStorage.getItem(SEEN_KEY));
        return !!at && Date.now() - at < SEEN_FOR_MS;
    } catch (e) {
        // Private mode and blocked storage both throw. Treat it as seen, so a
        // visitor whose browser will not remember the dismissal is greeted at
        // most once rather than on every navigation.
        return true;
    }
}

// Tells a refresh apart from any other way of arriving at the page, which is
// what decides whether the remembered panel state is restored. It cannot tell
// a hard refresh from a normal one: Navigation Timing reports both as "reload"
// and nothing exposes whether the cache was bypassed.
function isReload() {
    try {
        const nav = performance.getEntriesByType("navigation")[0];
        if (nav) return nav.type === "reload";
        // Removed from the spec but still the only answer in older browsers.
        return performance.navigation && performance.navigation.type === 1;
    } catch (e) {
        return false;
    }
}

function storedOpen() {
    try {
        return localStorage.getItem(OPEN_KEY) === "1";
    } catch (e) {
        return false;
    }
}

function storeOpen(open) {
    try {
        localStorage.setItem(OPEN_KEY, open ? "1" : "0");
    } catch (e) {
        /* nothing to do: a refresh just loses the state */
    }
}

function markSeen() {
    try {
        localStorage.setItem(SEEN_KEY, String(Date.now()));
    } catch (e) {
        /* nothing to do: the session just loses the memory */
    }
}

function agentSrc() {
    const params = new URLSearchParams();
    params.set("embed", "1");
    // From i18n, not from <html lang>. Vue sets that attribute once the router
    // has applied the page head, which is after this module mounts, so a panel
    // restored open on a reload would read the Blade file's hardcoded lang="es"
    // and serve a Spanish agent to an English visitor. Switching language
    // reloads the page, so that was every switch. i18n is right from the first
    // line, since it reads the stored preference before the app mounts.
    params.set("lang", i18n.global.locale.value === "en" ? "en" : "es");
    params.set("parent_page", location.href);
    params.set("parent_host", location.hostname.replace(/^www\./i, ""));
    params.set("parent_search", location.search || "");
    return AGENT_URL + "?" + params.toString();
}

function render() {
    panel.classList.toggle(`${ns}__panel--hidden`, !isOpen);
    fab.style.display = isOpen ? "none" : "flex";
}

// restore: true means this is a refresh putting the panel back the way it was,
// not a fresh greeting, so it must not push the 24 hour window forward.
function setOpen(next, { restore = false } = {}) {
    isOpen = !!next;
    if (isOpen && !iframe.src) iframe.src = agentSrc();
    if (isOpen && !restore) markSeen();
    storeOpen(isOpen);
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
    if (isOpen || seen()) return;
    setOpen(true);
    track("advisor_open", { link_location: "auto_inicio" });
}

// Waits for whichever comes first, a scroll or the timer. Opening the instant
// the page loads reads as an interruption; opening once the visitor has moved
// reads as an offer.
function armAutoOpen() {
    cancelAutoOpen();
    if (seen()) return;
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

    iframe = document.createElement("iframe");
    iframe.className = `${ns}__iframe`;
    iframe.title = "Aventa advisor";
    iframe.allow = "camera; microphone; clipboard-write";
    panel.appendChild(iframe);

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

    // ?advisor=reset forgets the visitor, so the greeting can be tested on the
    // live site without opening DevTools.
    if (new URLSearchParams(location.search).get("advisor") === "reset") {
        try {
            localStorage.removeItem(SEEN_KEY);
            localStorage.removeItem(OPEN_KEY);
        } catch (e) {
            /* nothing to forget */
        }
    }

    if (isReload() && storedOpen()) setOpen(true, { restore: true });
    else render();

    window.addEventListener("message", (event) => {
        // The original listened to every origin. Only the vendor has anything
        // to say to us here.
        if (event.origin !== AGENT_ORIGIN) return;
        const data = event.data;
        if (!data || typeof data !== "object") return;
        if (data.type === "AVENTA_WIDGET_MINIMIZE") setOpen(false);
        // The agent asking to be shown, added by the vendor in October 2026. It
        // overrides the once a day rule on purpose: this is the agent itself
        // deciding it has something to say, not us interrupting.
        if (data.type === "AVENTA_WIDGET_OPEN" && !isOpen) {
            setOpen(true);
            track("advisor_open", { link_location: "agente" });
        }
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

    // Same shape the vendor's own launcher exposes, minimize included, so
    // anything they tell us to run in the console works here unchanged.
    window.AventaAgent = {
        open: () => setOpen(true),
        close: () => setOpen(false),
        minimize: () => setOpen(false),
    };
}
