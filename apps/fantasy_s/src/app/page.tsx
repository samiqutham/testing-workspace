"use client";

import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const runPromise = async () => {
      // Fake async work (2 sec)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Jab promise resolve ho jaye
      setReady(true);
    };

    runPromise();
  }, []);

  if (!ready) {
    return <Loading />;
  }

  return <div>hello</div>;
}
