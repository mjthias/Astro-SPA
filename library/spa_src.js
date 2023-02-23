// Save current url
let memoUrl = location.pathname;
// Set init history state
history.replaceState({ spaUrl: location.pathname }, "", memoUrl);
// Set current url on spa-container
document.querySelector("#__CONTENT").dataset.spa_url = memoUrl;

async function spa(spaUrl, doPushState = true) {
    // if new and current url are same - end
    if (spaUrl == memoUrl) return;

    document.querySelector("#__ANIM").classList.add("anim");

    // Fetch spaUrl
    const conn = await fetch(spaUrl);
    if (!conn.status == 200) return; // Set fallback here if wanted;
    const html = await conn.text();

    // Extract spa block from html string
    const spaBlock = html.substring(html.indexOf("<div data-__start") + 24, html.indexOf("<div data-__end"));

    // Remove old data
    document.querySelector(`[data-spa_url="${memoUrl}"]`).remove();
    // Append the new data, set dataset-spa_url and page transition
    document.querySelector("[data-__start]").insertAdjacentHTML("afterend", spaBlock);
    document.querySelector("#__CONTENT").dataset.spa_url = spaUrl;
    document.querySelector("#__ANIM").classList.remove("anim");

    // Get and set title
    const title = document.querySelector(`[data-spa_url="${spaUrl}"]`).dataset.page_title;
    document.querySelector("title").textContent = title;

    // Memo the appended url
    memoUrl = spaUrl;

    // Push state
    if (doPushState) {
        history.pushState({ spaUrl: spaUrl }, "", spaUrl);
    }
}

// History back/forth
window.addEventListener("popstate", (e) => {
    spa(e.state.spaUrl, false);
});
