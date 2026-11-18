import { BUSINESS_CONFIG } from '../data/catalog.js';

export default function AnnouncementBar() {
  return (
    <aside className="announcement-bar" id="announcementBar">
      <div className="container announcement-content">
        <span className="announcement-pill">
          <i className="fa-solid fa-cookie-bite"></i> Horneado en el día
        </span>
        <p>
          Cookies, tortas, chipá y scones recién salidos del horno
          <span className="announcement-extra">
            {' '}· Retiro en {BUSINESS_CONFIG.shortAddress} o envíos en C. del Uruguay
          </span>
        </p>
      </div>
    </aside>
  );
}
