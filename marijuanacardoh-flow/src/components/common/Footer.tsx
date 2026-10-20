import React from "react";

export function Footer() {
  return (
    <footer className="fld0dG_fFoot">
      <p>
        © 2026 Marijuana Card OH ·{" "}
        <a href="#privacy" onClick={(e) => e.preventDefault()}>
          Privacy
        </a>{" "}
        ·{" "}
        <a href="#terms" onClick={(e) => e.preventDefault()}>
          Terms
        </a>
        <br />
        In crisis? Call or text 988. In an emergency, call 911.
      </p>
    </footer>
  );
}
