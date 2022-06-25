import { cleanup,  render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import ResultAvatar from "./result_avatar";

jest.mock("./services/url_launcher");

afterEach(() => {
    cleanup();
});

it("renders the name into the avatar alt text and appends icon", () => {
    render(<ResultAvatar iconURL="https://icon.example.com/icon1.png" name="result name" />);
    expect(screen.getByAltText("result name icon")).toBeInTheDocument();
});
