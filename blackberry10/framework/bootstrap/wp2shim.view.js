var fragment = document.createDocumentFragment(),
    uiScript = document.createElement("script"),
    requireScript,
    wpScript,
    cssLink = document.createElement("link");

cssLink.rel = "stylesheet";
cssLink.type = "text/css";
cssLink.media = "screen";
cssLink.charset = "utf-8";

if (window.wp) {
    cssLink.href = "platform:///ui/styles/styles.css";
} else {
    requireScript = document.createElement("script");
    wpScript = document.createElement("script");
    requireScript.src = "./require.js";
    wpScript.src = "platform:///webplatform.js";
    uiScript.src = "platform:///ui-resources/index.js";
    cssLink.href = "platform:///ui-resources/styles/styles.css";
    fragment.appendChild(requireScript);
    fragment.appendChild(wpScript);
    fragment.appendChild(uiScript);
}

fragment.appendChild(cssLink);
document.head.appendChild(fragment);
