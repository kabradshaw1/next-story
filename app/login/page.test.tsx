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

    it('givenValidForm_whenCheckingSubmitButton_thenButtonShouldBeEnabled', async () => {
      // given
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      await fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      await fireEvent.change(passwordInput, { target: { value: 'password123' } });

      // when
      const submitButton = screen.getByRole('button', { name: /submit form/i });

      // then
      expect(submitButton).not.toBeDisabled();
    });
  });
  describe('form submission', () => {
    describe('failed sumbission', () => {
      it('givenError_whenFormSubmit_thenDisplayErrorMessage', async () => {});
      
    });
    

  });
  it('giveImage_whenPageLoads_thenDisplayImage', async () => {
    // given
    const image = screen.getByAltText(/Logo Image/i);
    
    // then
    expect(image).toBeInTheDocument();
  });
});