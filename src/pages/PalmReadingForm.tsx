import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
} from '@mui/material';

interface UserFormData {
  name: string;
  gender: 'male' | 'female';
}

export default function PalmReadingForm() {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    gender: 'male',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Xem Chỉ Tay Online
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Xin chào! xemchitay.com.vn là ứng dụng giúp bạn xem chỉ tay để hiểu rõ về bản thân mình,
        tính cách, sự mệnh mục tiêu và các khía cạnh khác.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Tên của bạn"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          margin="normal"
          required
        />
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel>Chọn giới tính của bạn</FormLabel>
          <RadioGroup
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Nam" />
            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
          </RadioGroup>
        </FormControl>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="outlined" fullWidth>
            Hủy
          </Button>
          <Button type="submit" variant="contained" fullWidth>
            Tiếp tục
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}