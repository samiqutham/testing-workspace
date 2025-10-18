"use client";
import MInplay from "@exchange_s/components/m-view/m-inplay";
import MFootballInplay from "@exchange_s/components/m-view/m-inplay-football";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const params = useParams();
  const status = (params?.status as string) || "inplay";
  return (
    <div>
      {params?.id === "inplay" && status === "football" ? (
        <MFootballInplay />
      ) : (
        <MInplay status={status} />
      )}
    </div>
  );
}
