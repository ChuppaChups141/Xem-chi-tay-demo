import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from '@mui/material';

interface PalmLineQuestion {
  id: string;
  title: string;
  description: string;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
}

const palmLineQuestions: PalmLineQuestion[] = [
  {
    id: 'tam-dao',
    title: 'Đường Tâm Đạo (Đường Trái Tim)',
    description: 'Quan sát đường Tâm Đạo trên lòng bàn tay của bạn:',
    options: [
      {
        value: 'straight',
        label: 'Thẳng và rõ ràng',
        description: 'Đường thẳng, sâu và dễ nhìn thấy'
      },
      {
        value: 'curved',
        label: 'Cong và mềm mại',
        description: 'Đường cong nhẹ, có độ mềm mại'
      },
      {
        value: 'broken',
        label: 'Đứt đoạn hoặc không liền mạch',
        description: 'Có những điểm đứt đoạn hoặc không liên tục'
      },
      {
        value: 'unclear',
        label: 'Mờ hoặc khó nhìn thấy',
        description: 'Đường mờ, không rõ ràng'
      }
    ]
  },
  {
    id: 'tri-dao',
    title: 'Đường Trí Đạo (Đường Đầu)',
    description: 'Xem xét đường Trí Đạo của bạn:',
    options: [
      {
        value: 'long',
        label: 'Dài và rõ nét',
        description: 'Kéo dài qua lòng bàn tay, rõ ràng'
      },
      {
        value: 'medium',
        label: 'Độ dài trung bình',
        description: 'Chiều dài vừa phải'
      },
      {
        value: 'short',
        label: 'Ngắn',
        description: 'Đường ngắn hoặc không hoàn chỉnh'
      },
      {
        value: 'branched',
        label: 'Có nhánh phụ',
        description: 'Có những đường nhánh nhỏ'
      }
    ]
  },
  {
    id: 'sinh-dao',
    title: 'Đường Sinh Đạo (Đường Cuộc Sống)',
    description: 'Quan sát đường Sinh Đạo của bạn:',
    options: [
      {
        value: 'deep',
        label: 'Sâu và rõ ràng',
        description: 'Đường sâu và dễ nhận biết'
      },
      {
        value: 'shallow',
        label: 'Nông và mảnh',
        description: 'Đường mỏng, không sâu'
      },
      {
        value: 'chained',
        label: 'Đứt đoạn như chuỗi xích',
        description: 'Có nhiều đoạn ngắn nối tiếp nhau'
      },
      {
        value: 'double',
        label: 'Kép hoặc song song',
        description: 'Có hai đường song song'
      }
    ]
  }
];

interface PalmAnalysisFormProps {
  onPrevious: () => void;
  onNext: () => void;
  userData: {
    name: string;
    gender: string;
  };
}

export default function PalmAnalysisForm({ onPrevious, onNext, userData }: PalmAnalysisFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeStep, setActiveStep] = useState(0);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (activeStep < palmLineQuestions.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      onPrevious();
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  const currentQuestion = palmLineQuestions[activeStep];
  const isStepComplete = answers[currentQuestion.id] !== undefined;

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Phân Tích Chi Tiết Bàn Tay
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom align="center" color="primary">
        Xin chào {userData.name}! Hãy cho chúng tôi biết thêm về các đường chỉ tay của bạn.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={activeStep}>
          {palmLineQuestions.map((question) => (
            <Step key={question.id}>
              <StepLabel>{question.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <FormLabel component="legend" sx={{ mb: 2 }}>
            <Typography variant="h6">{currentQuestion.title}</Typography>
            <Typography variant="body1" color="text.secondary">
              {currentQuestion.description}
            </Typography>
          </FormLabel>
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
          >
            <Grid container spacing={2}>
              {currentQuestion.options.map((option) => (
                <Grid item xs={12} sm={6} key={option.value}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      bgcolor: answers[currentQuestion.id] === option.value ? 'action.selected' : 'background.paper',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <FormControlLabel
                      value={option.value}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="subtitle1">{option.label}</Typography>
                          {option.description && (
                            <Typography variant="body2" color="text.secondary">
                              {option.description}
                            </Typography>
                          )}
                        </Box>
                      }
                      sx={{ m: 0, width: '100%' }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={handleBack} fullWidth>
          {activeStep === 0 ? 'Quay lại' : 'Câu trước'}
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          fullWidth
          disabled={!isStepComplete}
        >
          {activeStep === palmLineQuestions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
        </Button>
      </Box>
    </Paper>
  );
}