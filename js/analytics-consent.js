(function () {
  'use strict';
  var measurementId = 'G-8ZVLKNJC2D';
  var storageKey = 'ditolabs_analytics_consent';
  function loadAnalytics() {
    if (window.__ditoAnalyticsLoaded) return;
    window.__ditoAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { anonymize_ip: true });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
  }
  function trackContact(event) {
    if (localStorage.getItem(storageKey) !== 'accepted') return;
    window.gtag('event', 'generate_lead', { lead_source: event.currentTarget.dataset.track, page_location: window.location.pathname });
  }
  function addBanner() {
    var banner = document.createElement('aside');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Preferencias de medición');
    banner.innerHTML = '<div><strong>Medición del sitio</strong><p>Usamos Google Analytics solo para conocer visitas y clics de contacto. No enviamos el contenido de formularios ni datos de salud.</p><a href="/politica-privacidad.html">Ver privacidad</a></div><div><button type="button" data-choice="rejected">No aceptar</button><button type="button" data-choice="accepted">Aceptar</button></div>';
    banner.style.cssText = 'position:fixed;right:1rem;bottom:1rem;z-index:9999;max-width:31rem;padding:1rem 1.1rem;border:1px solid #cfd8d1;border-radius:12px;background:#fff;color:#172420;box-shadow:0 14px 38px rgba(0,0,0,.18);font:14px/1.45 system-ui,sans-serif;display:flex;gap:1rem;align-items:flex-end';
    banner.querySelector('p').style.cssText = 'margin:.35rem 0 .55rem';
    banner.querySelector('a').style.cssText = 'color:#176e60';
    banner.querySelectorAll('button').forEach(function (button) {
      button.style.cssText = 'border:1px solid #176e60;border-radius:7px;padding:.55rem .75rem;margin-left:.35rem;background:' + (button.dataset.choice === 'accepted' ? '#176e60;color:#fff' : '#fff;color:#176e60') + ';font:600 13px system-ui,sans-serif;cursor:pointer';
      button.addEventListener('click', function () {
        localStorage.setItem(storageKey, button.dataset.choice);
        if (button.dataset.choice === 'accepted') loadAnalytics();
        banner.remove();
      });
    });
    document.body.appendChild(banner);
  }
  document.addEventListener('DOMContentLoaded', function () {
    var consent = localStorage.getItem(storageKey);
    if (consent === 'accepted') loadAnalytics();
    if (!consent) addBanner();
    document.querySelectorAll('[data-track]').forEach(function (link) { link.addEventListener('click', trackContact); });
  });
}());
