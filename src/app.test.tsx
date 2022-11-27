import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import App from "./app";
import browserService from "./services/browser";    
import * as useSearch from "./use_search";

jest.mock("./services/browser");
jest.useFakeTimers();

const mockResults = [
    {
        icon: "icon1.png",
        isFavorite: false,
        key: "app-1",
        name: "App 1",
        target: "https://example.com/1"
    },
    {
        icon: "icon2.png",
        isFavorite: false,
        key: "app-2",
        name: "App 2",
        target: "https://example.com/2"
    }
];

beforeEach(() => {
    browserService.createTab = jest.fn();
});

afterEach(() => {
    cleanup();
});

it("loads the header", async () => {
    jest.spyOn(useSearch, "default").mockReturnValue({
        data: mockResults, isLoading: false  
    });

    render(<App />);
  
    await screen.findByRole("heading");
  
    expect(screen.getByRole("heading")).toHaveTextContent("Workspace One Finder");
    expect(screen.getByRole("list")).toHaveTextContent("App 1");
});

describe("updates from custom hook", () => {
    describe("when the data changes", () => {
        it("updates the list", async () => {
            jest.spyOn(useSearch, "default").mockReturnValue({
                data: mockResults, isLoading: false  
            });

            const { rerender } = render(<App />);
            await screen.findByRole("heading");
 
            expect(screen.getByRole("list")).toHaveTextContent("App 1");
            expect(screen.getByRole("list")).toHaveTextContent("App 2");

            jest.spyOn(useSearch, "default").mockReturnValue({
                data: mockResults.slice(0,1), isLoading: false  
            });

            rerender(<App />);
            await screen.findByRole("heading");
            expect(screen.getByRole("list")).not.toHaveTextContent("App 2");
        });
    });
});

describe("searching for results", () => {
    describe("when typing in the search box", ()=> {
        it("filters the search results", () => {
            jest.spyOn(useSearch, "default").mockReturnValue({
                data: mockResults, isLoading: false  
            });

            render(<App />);

            userEvent.type(screen.getByRole("textbox"), "2");
            
            act(() => {
                jest.runAllTimers();
            });

            expect(useSearch.default).toHaveBeenCalledWith("2");
        });
    });
});

describe("waiting for data to load", () => {

    describe("when the data is loading", () => {
        it("displays an indication", async () => {
            jest.spyOn(useSearch, "default").mockReturnValue({
                data: [], isLoading: true 
            });

            render(<App />);
            await screen.findByRole("heading");

            expect(screen.getByRole("progressbar")).toBeInTheDocument();
        });
    });

    describe("when the data has loaded", () => {
        it("does not display an indication", async () => {
            jest.spyOn(useSearch, "default").mockReturnValue({
                data: [], isLoading: false 
            });

            render(<App />);
            await screen.findByRole("heading");

            expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
        });
    });
});

describe("when there's an error", () => {
    it("displays the erorr", async () => {
        jest.spyOn(useSearch, "default").mockReturnValue({
            data: [], error: new Error("Something went wrong"), isLoading: false 
        });

        render(<App />);
        await screen.findByRole("heading");
  
        expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    });
});

describe("keyboard behaviors", () => {
    describe("when there's data", () => {

        it("launches the first result when enter is hit", async () => {
            jest.spyOn(useSearch, "default").mockReturnValue({
                data: mockResults, isLoading: false  
            });

            render(<App />);

            screen.getByRole("button", { name: /App 1/ });

            const domNode = screen.getByRole("textbox");

            fireEvent.keyDown(domNode, { charCode: 13, code: "Enter", key: "Enter" });

            expect(browserService.createTab).toHaveBeenCalledWith("https://example.com/1");
        });

        describe("when a user tabs through the list and then hits enter", () => {
            it("only launches the focused result", () => {
                jest.spyOn(useSearch, "default").mockReturnValue({
                    data: mockResults, isLoading: false  
                });

                render(<App />);

                screen.getByRole("button", { name: /App 1/ });

                fireEvent.keyDown(
                    screen.getByRole("button", { name: /App 2/ }), 
                    { charCode: 13, code: "Enter", key: "Enter" }
                );

                expect(browserService.createTab).toHaveBeenCalledTimes(1);
                expect(browserService.createTab).toHaveBeenCalledWith("https://example.com/2");
            });
        });
    });


    describe("when there is no data", () => {
        it("does not try and launch anything", async () => {
            jest.spyOn(useSearch, "default").mockReturnValue({
                data: [], isLoading: false  
            });

            render(<App />);
            await screen.findByRole("heading");
  
            const domNode = screen.getByRole("textbox");

            fireEvent.keyDown(domNode, { charCode: 13, code: "Enter", key: "Enter" });

            expect(browserService.createTab).not.toHaveBeenCalled();
        });
    });
});
