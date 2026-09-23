import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isRegister && !consent) {
      setError("You need to agree to the Terms of Service and Privacy Policy to create an account.");
      return;
    }
    setLoading(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message.replace("Firebase: ", "").replace(/\(auth.*\)\.?/, ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.grid} />

      <div className={styles.box}>
        <div className={styles.topBar} />

        <div className={styles.logoArea}>
          <div className={styles.eyebrow}>&gt; Weyland-Yutani Corp // Access Terminal</div>
          <h1 className={styles.title}>ALIEN World<span>.</span></h1>
          <p className={styles.subtitle}>Franchise Archive — Restricted Access</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>IDENT</label>
            <input
              className={styles.input}
              type="email"
              placeholder="employee@weyland-yutani.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>PASSKEY</label>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isRegister && (
            <label className={styles.fieldGroup} style={{ flexDirection: "row", alignItems: "flex-start", gap: "8px" }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                style={{ marginTop: "3px" }}
              />
              <span style={{ fontSize: "12px", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                I agree to the <a href="/terms.html" target="_blank" rel="noopener">Terms of Service</a> and{" "}
                <a href="/privacy.html" target="_blank" rel="noopener">Privacy Policy</a>.
              </span>
            </label>
          )}

          {error && <div className={styles.error}>{error}</div>}

          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? "AUTHENTICATING..." : isRegister ? "CREATE ACCOUNT" : "ACCESS ARCHIVE"}
          </button>
        </form>

        <button
          className={styles.toggle}
          onClick={() => { setIsRegister(!isRegister); setError(""); }}
        >
          {isRegister
            ? "Already have clearance? Sign in"
            : "New operative? Create account"}
        </button>

        <div className={styles.scanline} />
      </div>

      <div className={styles.footer}>
        Unofficial fan project, not affiliated with 20th Century Studios. ALIEN™ &amp; © 20th Century Studios.{" "}
        <a href="/privacy.html" target="_blank" rel="noopener">Privacy</a> &middot; <a href="/terms.html" target="_blank" rel="noopener">Terms</a>
      </div>
    </div>
  );
}
