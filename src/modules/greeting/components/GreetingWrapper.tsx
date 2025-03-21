import React from "react";

export default function GreetingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section data-testid="greeting-section">{children}</section>;
}
