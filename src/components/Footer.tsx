import React from 'react';

const Footer = () => {
  return (
    <footer className="footerStrip">
      <div>© 2026 ESCRIBANIA · BUENOS AIRES · AR</div>
      <div>STATUS · <span style={{ color: 'var(--log)' }}>●</span> OPERATIVO</div>
      <div><a href="/privacidad">PRIVACIDAD</a> · <a href="/terminos">TÉRMINOS</a></div>
    </footer>
  );
};

export default Footer;
