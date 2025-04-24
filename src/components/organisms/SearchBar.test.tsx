import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchBar } from "./SearchBar";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("SearchBar", () => {
  test("renders input field correctly", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    
    const inputElement = screen.getByRole("searchbox");
    expect(inputElement).toBeInTheDocument();
  });
  
  test("uses provided placeholder", () => {
    const testPlaceholder = "Test placeholder";
    render(<SearchBar value="" onChange={() => {}} placeholder={testPlaceholder} />);
    
    const inputElement = screen.getByPlaceholderText(testPlaceholder);
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onChange after debounce time", async () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const inputElement = screen.getByRole("searchbox");
    fireEvent.change(inputElement, { target: { value: "Rick" } });
    
    expect(mockOnChange).not.toHaveBeenCalled();
    
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("Rick");
    }, { timeout: 600 });
  });
  
  test("updates the input value when changed", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    
    const inputElement = screen.getByRole("searchbox") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Morty" } });
    
    expect(inputElement.value).toBe("Morty");
  });
  
  test("applies the className prop correctly", () => {
    render(<SearchBar value="" onChange={() => {}} className="custom-class" />);
    
    const searchBarContainer = screen.getByRole("search");
    expect(searchBarContainer).toHaveClass("custom-class");
  });
});
