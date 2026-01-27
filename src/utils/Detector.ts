const detectPlatform = () => {
  const ua = navigator.userAgent || navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (/Android/.test(ua)) return 'Android';
  if (/Windows/.test(ua)) return 'Windows';
  if (/Mac/.test(ua)) return 'Mac';
  return 'Unknown';
};

const detectBrowser = () => {
  if (/Chrome/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent)) {
    return 'Chrome';
  } else if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
    return 'Safari';
  } else if (/Firefox/.test(navigator.userAgent)) {
    return 'Firefox';
  } else if (/Edg/.test(navigator.userAgent)) {
    return 'Edge';
  }
  return 'Other';
};
const detectPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches;
};

const detectWebView = () => {
  return !!(window as any).ReactNativeWebView;
};

export { detectBrowser, detectPlatform, detectPWA, detectWebView };
