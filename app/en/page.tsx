import React from "react";
import HomeContent from "../components/HomeContent";
import en from "../../translations/en.json";

export default function Page() {
  return <HomeContent translations={en} locale="en" />;
}
