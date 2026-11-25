
// All forms send to the advisors inbox via FormSubmit (https://formsubmit.co)
const ENDPOINT = "https://formsubmit.co/ajax/advisors@risikopartnersus.com";
document.querySelectorAll('form.panel, form.sub').forEach(f => f.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = f.querySelector('button'); const label = btn.textContent;
  btn.disabled = true; btn.textContent = 'Sending…';
  const d = new FormData(f);
  d.append('_subject', 'Website: ' + (f.dataset.subject || 'Enquiry') + ' – Risiko Partners U.S.');
  d.append('_template', 'table'); d.append('_captcha', 'false');
  d.append('Page', location.pathname);
  if (d.get('email')) d.append('_replyto', d.get('email'));
  try {
    const r = await fetch(ENDPOINT, { method: 'POST', body: d, headers: { 'Accept': 'application/json' } });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.success === 'false' || j.success === false) throw new Error(j.message || 'Send failed');
    if (f.classList.contains('sub')) { f.innerHTML = '<span style="color:#b9a8ff;padding:.6rem .8rem">Thank you for subscribing.</span>'; return; }
    f.reset(); const s = f.querySelector('.sent'); if (s) s.style.display = 'block';
    btn.textContent = 'Sent ✓';
  } catch (err) {
    btn.disabled = false; btn.textContent = label;
    alert('Sorry, your message could not be sent. Please email advisors@risikopartnersus.com directly.');
  }
}));
