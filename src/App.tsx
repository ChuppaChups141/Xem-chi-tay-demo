import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layouts/MainLayout';
import PalmReadingForm from './pages/PalmReadingForm';
import { CssBaseline } from '@mui/material';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <MainLayout>
        <PalmReadingForm />
      </MainLayout>
    </QueryClientProvider>
  )
}

export default App
