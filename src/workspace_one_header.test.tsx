import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import WorkspaceOneHeader from "./workspace_one_header";

jest.mock("./services/browser");

afterEach(() => {
    cleanup();
});

it("renders the item", async () => {
    render(<WorkspaceOneHeader />);
    await screen.findByRole("heading");
  
    expect(screen.getByRole("link")).toHaveTextContent("Workspace One Finder");
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://finder.example.com");
});
