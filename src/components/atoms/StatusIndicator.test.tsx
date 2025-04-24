import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StatusIndicator } from "./StatusIndicator";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

jest.mock('react-i18next', () => ({
  // This mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe("StatusIndicator", () => {
  test("renders status indicator with correct colors for 'Alive' status", () => {
    render(<StatusIndicator status="Alive" />);
    
    const statusElement = screen.getByText(/character.status.alive/i);
    expect(statusElement).toBeInTheDocument();
    
    const indicatorDot = document.querySelector('.bg-green-500');
    expect(indicatorDot).toBeInTheDocument();
  });
  
  test("renders status indicator with correct colors for 'Dead' status", () => {
    render(<StatusIndicator status="Dead" />);
    
    const statusElement = screen.getByText(/character.status.dead/i);
    expect(statusElement).toBeInTheDocument();
    
    const indicatorDot = document.querySelector('.bg-red-500');
    expect(indicatorDot).toBeInTheDocument();
  });
  
  test("renders status indicator with correct colors for 'unknown' status", () => {
    render(<StatusIndicator status="unknown" />);
    
    const statusElement = screen.getByText(/character.status.unknown/i);
    expect(statusElement).toBeInTheDocument();
    
    const indicatorDot = document.querySelector('.bg-gray-500');
    expect(indicatorDot).toBeInTheDocument();
  });
  
  test("includes proper aria-label for accessibility", () => {
    render(<StatusIndicator status="Alive" />);
    
    const statusElement = screen.getByLabelText(/character.statusLabel: character.status.alive/i);
    expect(statusElement).toBeInTheDocument();
  });
});
