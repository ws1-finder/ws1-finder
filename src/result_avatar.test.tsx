import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Result from "./result";
import ResultAvatar from "./result_avatar";
import * as UrlUtilities from "./services/url_launcher";    

jest.mock("./services/url_launcher");

let selected=true;
let mockResult: Result = {
    icon: "icon1.png",
    isFavorite: false,
    key: "app-1",
    name: "App 1",
    target: "https://example.com/1"
};

beforeEach(() => {
});

afterEach(() => {
    cleanup();
});

it("renders the name into the avatar alt text and appends icon", () => {
    render(<ResultAvatar iconURL="https://icon.example.com/icon1.png" name="result name" />);
    expect(screen.getByAltText("result name icon")).toBeInTheDocument();
});
