import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  TextField, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  AppBar, 
  Toolbar 
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
      fetchFiles(); // Fetch updated list of files
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Failed to upload file");
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/files");
      setFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching files", error);
      alert("Failed to fetch files");
    }
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            File Sharing App
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Upload File
            </Typography>
            <TextField 
              type="file" 
              onChange={handleFileChange} 
              fullWidth 
              style={{ marginBottom: '10px' }} 
            />
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<UploadFileIcon />} 
              onClick={handleUpload}
              fullWidth
            >
              Upload
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography>
            <List>
              {files.map((file, index) => (
                <ListItem key={index} divider>
                  <ListItemText primary={file} />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      href={`http://localhost:5000/download/${file}`} 
                      download
                    >
                      <DownloadIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
