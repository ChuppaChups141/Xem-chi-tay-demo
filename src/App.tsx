import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layouts/MainLayout';
import PalmReadingForm from './pages/PalmReadingForm';
import PalmAnalysisForm from './pages/PalmAnalysisForm';
import { CssBaseline } from '@mui/material';

const queryClient = new QueryClient();

interface UserData {
  name: string;
  gender: 'male' | 'female';
}

function App() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({ name: '', gender: 'male' });

  const handleFirstStepComplete = (data: UserData) => {
    setUserData(data);
    setStep(2);
  };

  const handleBackToFirstStep = () => {
    setStep(1);
  };

  const handleAnalysisComplete = () => {
    // TODO: Navigate to results page
    setStep(3);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <MainLayout>
        {step === 1 && (
          <PalmReadingForm onSubmit={handleFirstStepComplete} initialData={userData} />
        )}
        {step === 2 && (
          <PalmAnalysisForm
            onPrevious={handleBackToFirstStep}
            onNext={handleAnalysisComplete}
            userData={userData}
          />
        )}
      </MainLayout>
    </QueryClientProvider>
  )
}

export default App
