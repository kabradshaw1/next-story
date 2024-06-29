import { render } from '@testing-library/react';

import StoreProvider from '@/lib/StoreProvider';

import Header from './Header';

describe('Header', () => {
  // jest.mock('next/navigation', () => {
  //   usePathname: () => '/login';
  // });

  beforeEach(() => {
    render(
      <StoreProvider>
        <Header />
      </StoreProvider>
    );
  });
  describe('Contents', () => {
    describe('Drop Downs', () => {
      describe('Account Dropdown', () => {
        it('given_whenLoggedIn_thenShowUsernameInDropdown', () => {
          // given

          // when

          // then
          expect(true).toBe(true);
        });
        it('given_whenMouseOver_thenShowAccount', () => {
          // given

          // when

          // then
          expect(true).toBe(true);
        });
        it('given_when_then', () => {
          // given

          // when

          // then
          expect(true).toBe(true);
        });
      });
    });
  });
});
