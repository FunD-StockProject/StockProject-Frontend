if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
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
  self.define = (n, r) => {
    const l = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[l]) return;
    let o = {};
    const t = (e) => i(e, l),
      d = { module: { uri: l }, exports: o, require: t };
    s[l] = Promise.all(n.map((e) => d[e] || t(e))).then((e) => (r(...e), o));
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
        { url: 'assets/index-BStUxWAW.js', revision: null },
        { url: 'assets/index-C40e0zhX.js', revision: null },
        { url: 'assets/index-C6HsIiKa.css', revision: null },
        { url: 'assets/index-DVUSbx7S.js', revision: null },
        { url: 'assets/index-mhomQ8iD.css', revision: null },
        { url: 'assets/StockWordCloudWorker-Bexbeaoe.js', revision: null },
        { url: 'assets/StockWordCloudWorker-BrtTfJIZ.js', revision: null },
        { url: 'index.html', revision: 'e893c030c6f74671d77d446db4bd7f9c' },
        { url: 'registerSW.js', revision: 'f492c5f8e84450e6f894d51b54b1c946' },
        { url: 'favicon.ico', revision: 'c027d8b6c38c4121a744b4b40b80fd48' },
        { url: 'maskable-icon-512x512.png', revision: '4f2b2c81d41d4c0009f0879f0c424566' },
        { url: 'pwa-192x192.png', revision: 'f23c092f5cb7e0c2ab329e0116fa24d7' },
        { url: 'pwa-512x512.png', revision: '986757564776a8b1cf3d5522c34bbda2' },
        { url: 'pwa-64x64.png', revision: 'eedd2af4fe159e751e93ccd75eabdde6' },
        { url: 'manifest.webmanifest', revision: 'e966477e558ae42673077b2d63e830a2' },
      ],
      {},
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html')));
});
