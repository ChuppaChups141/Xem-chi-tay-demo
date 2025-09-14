import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  styled,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  Radio,
  FormControlLabel,
  Alert,
} from '@mui/material';
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  '&.selected': {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
    borderStyle: 'solid',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
}));

interface InstructionStepProps {
  onPrevious: () => void;
  onNext: () => void;
  userData: {
    name: string;
    gender: string;
    age: string;
  };
}

interface PalmLine {
  id: string;
  title: string;
  description: string;
  options: {
    value: string;
    label: string;
    description: string;
  }[];
}

const palmLines: PalmLine[] = [
  {
    id: 'tam-dao',
    title: 'Đường Tâm Đạo',
    description: 'Đường chỉ về tình cảm và mối quan hệ',
    options: [
      {
        value: 'straight',
        label: 'Thẳng và rõ ràng',
        description: 'Tình cảm ổn định, chung thủy'
      },
      {
        value: 'curved',
        label: 'Cong và mềm mại',
        description: 'Tình cảm phong phú, đa dạng'
      },
      {
        value: 'broken',
        label: 'Đứt đoạn',
        description: 'Tình cảm có nhiều thăng trầm'
      },
      {
        value: 'branched',
        label: 'Có nhánh phụ',
        description: 'Có nhiều mối quan hệ quan trọng'
      }
    ]
  },
  {
    id: 'tri-dao',
    title: 'Đường Trí Đạo',
    description: 'Đường chỉ về trí tuệ và suy nghĩ',
    options: [
      {
        value: 'long',
        label: 'Dài và rõ nét',
        description: 'Tư duy logic, sắc bén'
      },
      {
        value: 'curved',
        label: 'Cong nhẹ',
        description: 'Tư duy sáng tạo, linh hoạt'
      },
      {
        value: 'short',
        label: 'Ngắn',
        description: 'Tư duy thực tế, cụ thể'
      },
      {
        value: 'forked',
        label: 'Phân nhánh',
        description: 'Đa dạng trong suy nghĩ'
      }
    ]
  },
  {
    id: 'sinh-dao',
    title: 'Đường Sinh Đạo',
    description: 'Đường chỉ về sức khỏe và tuổi thọ',
    options: [
      {
        value: 'long',
        label: 'Dài và sâu',
        description: 'Sức khỏe tốt, tuổi thọ cao'
      },
      {
        value: 'medium',
        label: 'Trung bình',
        description: 'Sức khỏe ổn định'
      },
      {
        value: 'chain',
        label: 'Dạng chuỗi',
        description: 'Sức khỏe có thăng trầm'
      },
      {
        value: 'island',
        label: 'Có đảo',
        description: 'Cần chú ý sức khỏe ở một số thời điểm'
      }
    ]
  },
  {
    id: 'cong-danh',
    title: 'Đường Công Danh',
    description: 'Đường chỉ về danh vọng và địa vị',
    options: [
      {
        value: 'clear',
        label: 'Rõ ràng và thẳng',
        description: 'Công danh thuận lợi'
      },
      {
        value: 'multiple',
        label: 'Nhiều nhánh',
        description: 'Có nhiều cơ hội thăng tiến'
      },
      {
        value: 'faint',
        label: 'Mờ nhạt',
        description: 'Công danh khiêm tốn'
      },
      {
        value: 'irregular',
        label: 'Không đều',
        description: 'Công danh thăng trầm'
      }
    ]
  },
  {
    id: 'su-nghiep',
    title: 'Đường Sự Nghiệp',
    description: 'Đường chỉ về công việc và sự nghiệp',
    options: [
      {
        value: 'deep',
        label: 'Sâu và rõ',
        description: 'Sự nghiệp vững chắc'
      },
      {
        value: 'branched',
        label: 'Phân nhánh',
        description: 'Có nhiều hướng phát triển'
      },
      {
        value: 'broken',
        label: 'Đứt đoạn',
        description: 'Có thay đổi trong sự nghiệp'
      },
      {
        value: 'star',
        label: 'Có sao',
        description: 'Có cơ hội đột phá'
      }
    ]
  },
  {
    id: 'suc-khoe',
    title: 'Đường Sức Khỏe',
    description: 'Đường chỉ về thể chất và tinh thần',
    options: [
      {
        value: 'strong',
        label: 'Mạnh và rõ',
        description: 'Sức khỏe dồi dào'
      },
      {
        value: 'thin',
        label: 'Mảnh và nhạt',
        description: 'Cần chú ý giữ gìn sức khỏe'
      },
      {
        value: 'mixed',
        label: 'Không đều',
        description: 'Sức khỏe thăng trầm'
      },
      {
        value: 'cross',
        label: 'Có vết cắt',
        description: 'Có thể gặp vấn đề sức khỏe'
      }
    ]
  }
];

const randomMessages = [
  "Bạn sẽ gặp nhiều may mắn trong công việc sắp tới.",
  "Một cơ hội tốt đang đến với bạn trong thời gian gần đây.",
  "Hãy cẩn thận trong các mối quan hệ mới.",
  "Sức khỏe của bạn sẽ được cải thiện rõ rệt.",
  "Tài chính của bạn sẽ có những thay đổi tích cực.",
  "Bạn sẽ được quý nhân phù trợ trong sự nghiệp."
];

export default function InstructionStep({ onPrevious, onNext, userData }: InstructionStepProps) {
  const [selectedLines, setSelectedLines] = useState<Set<string>>(new Set());
  const [currentLine, setCurrentLine] = useState<PalmLine | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [randomMessage, setRandomMessage] = useState('');

  const handleLineClick = (line: PalmLine) => {
    setCurrentLine(line);
  };

  const handleLineAnalysisComplete = (value: string) => {
    if (currentLine) {
      const newAnswers = { ...answers, [currentLine.id]: value };
      setAnswers(newAnswers);
      setSelectedLines(new Set([...selectedLines, currentLine.id]));
      setCurrentLine(null);

      // If 3 lines have been analyzed, show result
      if (Object.keys(newAnswers).length === 3) {
        const randomIndex = Math.floor(Math.random() * randomMessages.length);
        setRandomMessage(randomMessages[randomIndex]);
        setShowResult(true);
      }
    }
  };

  const handleCloseDialog = () => {
    setCurrentLine(null);
  };

  const handleFinish = () => {
    onNext();
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Phân Tích Chỉ Tay
      </Typography>

      <Typography variant="subtitle1" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
        Xin chào {userData.name}! Hãy chọn 3 đường chỉ tay bất kỳ để phân tích.
      </Typography>

      <Grid container spacing={3}>
        {palmLines.map((line) => (
          <Grid item xs={12} sm={6} md={4} key={line.id}>
            <StyledCard 
              className={selectedLines.has(line.id) ? 'selected' : ''}
              sx={{ opacity: selectedLines.size === 3 && !selectedLines.has(line.id) ? 0.5 : 1 }}
            >
              <CardActionArea 
                onClick={() => handleLineClick(line)}
                disabled={selectedLines.size === 3 && !selectedLines.has(line.id)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {line.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {line.description}
                  </Typography>
                  {selectedLines.has(line.id) && (
                    <Alert severity="success" sx={{ mt: 1 }}>
                      Đã phân tích
                    </Alert>
                  )}
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!currentLine} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {currentLine && (
          <>
            <DialogTitle>{currentLine.title}</DialogTitle>
            <DialogContent>
              <RadioGroup
                value={answers[currentLine.id] || ''}
                onChange={(e) => handleLineAnalysisComplete(e.target.value)}
              >
                {currentLine.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1">{option.label}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {option.description}
                        </Typography>
                      </Box>
                    }
                    sx={{ mb: 2 }}
                  />
                ))}
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Đóng</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog open={showResult} maxWidth="sm" fullWidth>
        <DialogTitle>Kết Quả Phân Tích</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom align="center" sx={{ my: 3 }}>
            {randomMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFinish} variant="contained" color="primary">
            Tiếp tục
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={onPrevious} fullWidth>
          Quay lại
        </Button>
        <Button 
          variant="contained" 
          onClick={onNext} 
          fullWidth
          disabled={selectedLines.size < 3}
        >
          Tiếp tục
        </Button>
      </Box>
    </StyledPaper>
  );
}