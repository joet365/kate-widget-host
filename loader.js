(function () {
  // 1. Identify where we are loading from
  const script = document.currentScript;
  if (!script) {
    console.warn("Conquer AI Widget: document.currentScript is null. Ensure script is loaded normally (not as a module).");
    return;
  }

  const scriptUrl = script.src;
  const baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/'));

  // 2. Inject CSS if not already present
  const styleId = 'conquer-ai-widget-styles';
  if (!document.getElementById(styleId)) {
    const link = document.createElement('link');
    link.id = styleId;
    link.rel = 'stylesheet';
    link.href = baseUrl + '/style.css';
    document.head.appendChild(link);
  }

  // 3. Load the actual UMD bundle
  const bundleScript = document.createElement('script');
  bundleScript.src = baseUrl + '/kate-widget.umd.js';
  bundleScript.async = true;

  // 4. Pass through all data-attributes (agent ID, etc)
  for (let i = 0; i < script.attributes.length; i++) {
    const attr = script.attributes[i];
    if (attr.name.startsWith('data-')) {
      bundleScript.setAttribute(attr.name, attr.value);
    }
  }

  document.head.appendChild(bundleScript);
  console.log("Conquer AI Widget: Loader initialized from", baseUrl);
})();
