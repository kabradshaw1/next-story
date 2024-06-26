const IS_BROWSER = typeof window !== 'undefined';

export const setupMocks = async (): Promise<void> => {
  if (IS_BROWSER) {
    const { worker } = await import('./worker');
    void worker.start();
  } else {
    const { server } = await import('./server');
    server.listen();
  }
};
