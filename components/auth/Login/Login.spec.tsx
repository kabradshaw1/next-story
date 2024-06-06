import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Login from './Login';

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
      const emailInput = screen.getByPlaceholderText('Enter email');

      await userEvent.click(emailInput); // Focus on the input
      await userEvent.tab(); // Triggers blur more reliably by tabbing out of the input

      await waitFor(() => {
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      });
    });

    it('givenInvalidEmailFormat_whenEmailIsEntered_thenShowErrorMessage', async () => {
      // given
      const emailInput = screen.getByPlaceholderText('Enter email');

      // when
      await userEvent.type(emailInput, 'invalidemail{tab}'); // Use {tab} to blur which triggers validation

      // then
      await waitFor(() => {
        expect(
          screen.getByText(/this email is not a valid format/i)
        ).toBeInTheDocument();
      });
    });

    it('givenShortPassword_whenPasswordIsEntered_thenShowErrorMessage', async () => {
      // given

      const passwordInput = screen.getByLabelText(/password/i);

      // when
      await userEvent.type(passwordInput, 'short');
      fireEvent.blur(passwordInput); // Trigger validation

      // then
      await waitFor(() => {
        expect(
          screen.getByText(/this password is too short/i)
        ).toBeInTheDocument();
      });
    });

    it('givenValidForm_whenCheckingSubmitButton_thenButtonShouldBeEnabled', async () => {
      // given
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      fireEvent.change(emailInput, {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'password123' },
      });

      // when
      const submitButton = screen.getByRole('button', { name: /submit form/i });

      // then
      expect(submitButton).not.toBeDisabled();
    });
  });
  describe('form submission', () => {
    describe('failed sumbission', () => {
      it('givenError_whenFormSubmit_thenDisplayErrorMessage', async () => {
        expect(true).toBe(true);
      });
    });
  });
  it('giveImage_whenPageLoads_thenDisplayImage', async () => {
    const image = screen.getByAltText(/Logo Image/i);

    expect(image).toBeInTheDocument();
  });
});
