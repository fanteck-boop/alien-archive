import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  if (user === undefined) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '11px',
        color: 'var(--text-dim)',
        letterSpacing: '3px',
        textTransform: 'uppercase',
      }}>
        &gt; Authenticating...
      </div>
    );
  }

  return <div className="App"><Home user={user} /></div>;
}

export default App;
