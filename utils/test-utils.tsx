// test-utils.js
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../store/slices/authSlice';
// Import other context providers as needed

const customRender = (ui: any, { ...renderOptions } = {}) => {
  const store = configureStore({
    reducer: { auth: authSlice.reducer },
  });

  const Wrapper = ({ children }: any) => (
    <Provider store={store}>
      {/* Wrap with other context providers as necessary */}
      {children}
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
