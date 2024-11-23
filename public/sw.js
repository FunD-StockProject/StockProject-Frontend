if (!self.define) {
  let e,
    s = {};
  const i = (i, r) => (
    (i = new URL(i + '.js', r).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (r, n) => {
    const o = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[o]) return;
    let l = {};
    const t = (e) => i(e, o),
      d = { module: { uri: o }, exports: l, require: t };
    s[o] = Promise.all(r.map((e) => d[e] || t(e))).then((e) => (n(...e), l));
  };
}
define(['./workbox-5ffe50d4'], function (e) {
  'use strict';
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: 'assets/index-BPuNpBwE.css', revision: null },
        { url: 'assets/index-BriG2w8_.js', revision: null },
        { url: 'assets/index-C40e0zhX.js', revision: null },
        { url: 'assets/index-DVUSbx7S.js', revision: null },
        { url: 'assets/index-mhomQ8iD.css', revision: null },
        { url: 'assets/StockWordCloudWorker-Bexbeaoe.js', revision: null },
        { url: 'assets/StockWordCloudWorker-BrtTfJIZ.js', revision: null },
        { url: 'index.html', revision: 'aef90f4f1fad8523e763bc08664ca3a1' },
        { url: 'registerSW.js', revision: '1872c500de691dce40960bb85481de07' },
        { url: 'favicon.ico', revision: 'c027d8b6c38c4121a744b4b40b80fd48' },
        { url: 'maskable-icon-512x512.png', revision: '30db35385471f2440233e2a1c1fed46e' },
        { url: 'pwa-192x192.png', revision: 'f23c092f5cb7e0c2ab329e0116fa24d7' },
        { url: 'pwa-512x512.png', revision: '171e4339dc9422fc445e53781e2ffedd' },
        { url: 'pwa-64x64.png', revision: 'eedd2af4fe159e751e93ccd75eabdde6' },
        { url: 'manifest.webmanifest', revision: 'a27231ba2600fb799bec26351962bf85' },
      ],
      {},
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html')));
});
