import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Result from "./result";
import ResultItem from "./result_item";
import * as UrlUtilities from "./services/url_launcher";    

jest.mock("./services/url_launcher");

const selected=true;
const mockResult: Result = {
    icon: "icon1.png",
    isFavorite: false,
    key: "app-1",
    name: "App 1",
    target: "https://example.com/1"
};

afterEach(() => {
    cleanup();
});

it("renders the item", async () => {
    render(<ResultItem  selected={ selected } result={ mockResult } />);
  
    await screen.findByRole("button");
  
    expect(screen.getByRole("button")).toHaveTextContent("App 1");
    expect(screen.getByAltText("App 1 icon")).toBeInTheDocument();
});

describe("favorite items", () => {
    describe("when the item is not a favorite", ()=> {
        it("does not render a favorite icon", async () => {
            mockResult.isFavorite = false;
            render(<ResultItem selected={ selected } result={ mockResult } />);
            await screen.findByRole("button");

            expect(screen.queryByTestId("StarIcon")).not.toBeInTheDocument();
        });
    });

    describe("when the item is a favorite", () => {
        it("renders a favorite icon", async () => {
            mockResult.isFavorite = true;
            render(<ResultItem selected={ selected } result={ mockResult } />);
            await screen.findByRole("button");

            expect(screen.getByTestId("StarIcon")).toBeInTheDocument();
        });
    });
    
    describe("result behavior", () => {
        it("launches the result's URL when clicked", () => {
            render(<ResultItem selected={ selected } result={ mockResult } />);

            const button = screen.getByRole("button");
            fireEvent.click(button);

            expect(UrlUtilities.handleLaunchURLAndClose).toHaveBeenCalledWith(mockResult.target);
        });
    });
});

