const CACHE_NAME = self.location.pathname;
const CACHE_ASSETS = [];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_ASSETS));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  function cacheResponse(response) {
    if (isCacheable(response)) {
      return caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone())).then(() => response);
    }
    return response;
  }

  function getCachedResponse() {
    return caches.open(CACHE_NAME).then((cache) => cache.match(request.url));
  }

  function isCacheable(response) {
    return response.type === "basic" && response.ok && !response.headers.has("Content-Disposition");
  }
 event.respondWith(fetch(request).then(cacheResponse).catch(getCachedResponse));
});
