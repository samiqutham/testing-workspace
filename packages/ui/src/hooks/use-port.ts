import React, { useState } from "react";

export function usePort() {
  const [hostPort, setHostPort] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string>("");

  React.useEffect(() => {
    const { port, origin } = window.location;
    setHostPort(port);
    setOrigin(origin);
  }, []);

  return { hostPort, origin };
}
