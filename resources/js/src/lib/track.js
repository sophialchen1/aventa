// Every click we want to measure goes through here and lands in the Google Tag
// Manager dataLayer. The GTM container (GTM-NV4MJRZX) is loaded in
// resources/views/welcome.blade.php.
//
// Nothing in this file talks to Google Analytics or Google Ads. It only
// announces "this happened, here". Ian builds the tags and triggers in GTM
// against the event names below, which means a new report or a new Ads
// conversion never needs a code change or a deploy.
//
// Where the visitor came from (Google Ads, Meta, direct, a specific campaign)
// is not this file's job. GA4 attaches the traffic source to every event it
// receives, so the source and the click can be crossed in a report. Our job is
// to say precisely which link was clicked and where on the site it lives.
//
// The event names and their parameters are a contract with GTM. Renaming one
// silently breaks Ian's tags without breaking the site. Add new names instead.
//
// Events currently sent:
//
//   whatsapp_click         link_location
//   design_assistant_click link_location
//   quote_submit           link_location
//   catalog_download       link_location, file_name
//   doc_download           link_location, file_name
//
// link_location is where the link sits, not which page it is on. The page is
// added automatically below.

export function track(event, params = {}) {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event,
        page_path: window.location.pathname,
        site_language: document.documentElement.lang || "es",
        ...params,
    });
}
