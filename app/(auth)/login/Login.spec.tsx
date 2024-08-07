import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
// eslint-disable-next-line import/no-named-as-default
import userEvent from '@testing-library/user-event'; // Default import
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';

import { axiosAuthInstance } from '@/lib/axios';
import { testStore } from '@/lib/store/store';

import Login from './page';
const mockAxios = new MockAdapter(axiosAuthInstance);

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

describe('Login', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
    render(
      <Provider store={testStore}>
        <Login />
      </Provider>
    );
    mockUseRouter.mockReturnValue({ push: pushMock });
  });

  describe('input validation', () => {
    it('givenBlankEmail_whenEmailIsEntered_thenShowRequiredMessage', async () => {
      const emailInput = screen.getByPlaceholderText('Enter email');

      await act(async () => {
        await userEvent.click(emailInput);
        await userEvent.tab();
      });

      await waitFor(() => {
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      });
    });

    it('givenInvalidEmailFormat_whenEmailIsEntered_thenShowErrorMessage', async () => {
      const emailInput = screen.getByPlaceholderText('Enter email');

      await act(async () => {
        await userEvent.type(emailInput, 'invalidemail{tab}');
      });

      await waitFor(() => {
        expect(
          screen.getByText(/this email is not a valid format/i)
        ).toBeInTheDocument();
      });
    });

    it('givenShortPassword_whenPasswordIsEntered_thenShowErrorMessage', async () => {
      const passwordInput = screen.getByLabelText(/password/i);

      await act(async () => {
        await userEvent.type(passwordInput, 'short');
        fireEvent.blur(passwordInput);
      });

      await waitFor(() => {
        expect(
          screen.getByText(/this password is too short/i)
        ).toBeInTheDocument();
      });
    });

    it('givenValidForm_whenCheckingSubmitButton_thenButtonShouldBeEnabled', async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await act(async () => {
        fireEvent.change(emailInput, {
          target: { value: 'test@example.com' },
        });
        fireEvent.change(passwordInput, {
          target: { value: 'password123' },
        });
      });

      const submitButton = screen.getByRole('button', { name: /Submit/i });

      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('form submission', () => {
    it('givenValidCredentials_whenFormSubmit_thenRedirectToHomePage', async () => {
      mockAxios.onPost('/login').reply(200, { token: 'test-token' });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        await userEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(pushMock).toHaveBeenCalledWith('/');
        expect(testStore.getState().auth.token).toEqual('test-token');
      });
    });

    it('givenInvalidCredentials_whenFormSubmit_thenDisplayErrorMessage', async () => {
      mockAxios
        .onPost('/login')
        .reply(401, { error: 'Invalid username or password' });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        await userEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(
          screen.getByText(/Invalid username or password/i)
        ).toBeInTheDocument();
      });
    });

    it('givenServerError_whenFormSubmit_thenDisplayErrorMessage', async () => {
      mockAxios.onPost('/login').reply(500, { error: 'Internal server error' });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        await userEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText(/Internal server error/i)).toBeInTheDocument();
      });
    });

    it('givenReuqestTimesOut_whenFormSubmit_thenDisplayTimeOutError', async () => {
      mockAxios.onPost('/login').timeout();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        await userEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText(/timeout/i)).toBeInTheDocument();
      });
    });
  });

  describe('ui components', () => {
    it('givenImage_whenPageLoads_thenDisplayImage', async () => {
      const image = screen.getByAltText(/Logo Image/i);
      expect(image).toBeInTheDocument();
    });

    it('givenPasswordInput_whenPageLoads_thenHidePassword', async () => {
      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });
});
