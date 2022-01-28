import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import App from "./app";

beforeEach(() => {
});

afterEach(() => {
    cleanup();
});

it("loads the header", async () => {
    render(<App />);
  
    await screen.findByRole("heading");
  
    expect(screen.getByRole("heading")).toHaveTextContent("Workspace One Finder");
});
