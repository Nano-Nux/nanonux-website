import React from "react";
import mm from "../../translations/mm.json";
import HomeContent from "../components/HomeContent";

export default function Page() {
  return <HomeContent translations={mm} locale="mm" />;
}
