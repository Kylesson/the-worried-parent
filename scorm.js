'use strict';
// Small SCORM 1.2 wrapper. With no LMS found, every call is a quiet no-op (standalone mode).
const SCORM = (() => {
  let api = null;
  let live = false;

  function scan(win) {
    let hops = 0;
    try {
      while (win && !win.API && win.parent && win.parent !== win && hops < 10) {
        win = win.parent;
        hops++;
      }
      return (win && win.API) || null;
    } catch (e) {
      return null; // cross-origin parent: treat as no LMS
    }
  }

  function findAPI() {
    let found = scan(window);
    if (!found && window.opener) found = scan(window.opener);
    return found;
  }

  // A throwing LMS adapter must never break the course, so every call is guarded.
  function safe(fn, fallback) {
    try { return fn(); } catch (e) { return fallback; }
  }

  function init() {
    api = findAPI();
    if (!api) return false;
    live = safe(() => String(api.LMSInitialize('')) === 'true', false);
    return live;
  }

  const get = (key) => (live ? safe(() => String(api.LMSGetValue(key)), '') : '');
  const set = (key, val) => (live ? safe(() => String(api.LMSSetValue(key, String(val))) === 'true', false) : false);
  const commit = () => (live ? safe(() => api.LMSCommit(''), false) : false);

  function finish() {
    if (!live) return;
    live = false;
    safe(() => api.LMSFinish(''));
  }

  // SCORM 1.2 CMITimespan: HHHH:MM:SS.SS (work in whole hundredths so seconds never show 60.00)
  function timespan(ms) {
    const cs = Math.floor(Math.max(0, ms) / 10);
    const h = Math.floor(cs / 360000);
    const m = Math.floor((cs % 360000) / 6000);
    const s = (cs % 6000) / 100;
    return String(h).padStart(4, '0') + ':' + String(m).padStart(2, '0') + ':' + s.toFixed(2).padStart(5, '0');
  }

  return { init, get, set, commit, finish, timespan, isLive: () => live };
})();
