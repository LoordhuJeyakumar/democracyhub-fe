import React from "react";

function Footer() {
  return (
    <footer className="footer p-3 d-flex justify-content center">
      <div className="container text-center">
        <p className=" mb-0">© 2024 DemocracyHub. All rights reserved.</p>
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a href="/terms" className="text-decoration-none">
              Terms of Use
            </a>
          </li>
          <span>| </span>
          <li className="list-inline-item text-secondary">
            <a href="/privacy" className="text-decoration-none">
              Privacy Policy
            </a>
          </li>
        </ul>
        <small className=" mb-0">
          Contact Us:{" "}
          <a href="mailto:info@democracyhub.org" className="">
            info@democracyhub.org
          </a>
        </small>
      </div>
    </footer>
  );
}

export default Footer;
