import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Login from "./page";

describe('login', () => {
  jest.mock('next/router', () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
  }));

  beforeEach(() => {
    render(<Login />);
  });

  describe('input validation', () => {
    it('givenBlankEmail_whenEmailIsEntered_thenShowRequiredMessage', async () => {
      // given 
      const emailInput = screen.getByPlaceholderText('Enter email');
      
      // when
      await userEvent.click(emailInput); // Focus on the input
      fireEvent.blur(emailInput); // Trigger validation by blurring without typing anything

      // then
      expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    });

    it('givenInvalidEmailFormat_whenEmailIsEntered_thenShowErrorMessage', async () => {
      // given
      const emailInput = screen.getByPlaceholderText('Enter email');
      
      // when
      await userEvent.type(emailInput, 'invalidemail{tab}'); // Use {tab} to blur which triggers validation
      
      // then
      await waitFor(() => { 
        expect(screen.getByText(/this email is not a valid format/i)).toBeInTheDocument();
      });
    });

    it('givenBlankPassword_whenPasswordIsEntered_thenShowRequiredMessage', async () => {
      // given

      const passwordInput = screen.getByLabelText(/password/i);
      
      // when
      await userEvent.type(passwordInput, '{tab}');
      
      // then
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    it('givenShortPassword_whenPasswordIsEntered_thenShowErrorMessage', async () => {
      // given

      const passwordInput = screen.getByLabelText(/password/i);
      
      // when
      await userEvent.type(passwordInput, 'short');
      fireEvent.blur(passwordInput); // Trigger validation
      
      // then
      await waitFor(() => {
        expect(screen.getByText(/this password is too short/i)).toBeInTheDocument();
      });
    });
  });
});