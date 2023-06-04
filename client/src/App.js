import React, { useState, useEffect } from "react"
import "./App.css"
import APIHelper from "./APIHelper.js"
import { 
  TextField , 
  Button, 
  Typography, 
  Box,
  Divider, 
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container
 } from '@mui/material';

const styles = {
  root:{
    marginTop: "40px",
  },
  inputBox:{
    marginTop: "30px",
  },
   input:{
    width: " 100%",
    marginBottom: "10px"
  },
  button: {
    float: "right",
  },
};
const App = () => { 
// function App() {

  const [records, setRecords] = useState([])
  useEffect(() => {
    const fetchItemsAndSetItems = async () => {
      const recordsList = await APIHelper.getAllItems()
      setRecords(recordsList)
    }
    fetchItemsAndSetItems()
  }, [])

  const createItem = async (name, comment, date, time, createdAt) => {
    try {
      const newRecord = await APIHelper.createItem(name, comment, date, time, createdAt);
      setRecords(prevRecords => [...prevRecords, newRecord]);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Extract the name and comment from the form inputs
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const comment = formData.get('comment');
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
    const createdAt = new Date();
    if ((name) || (e.key === "Enter" && name )) {
      await createItem(name, comment, currentDate, currentTime, createdAt);
      // Clear the form inputs after successful item creation
      e.target.reset();
    }
  };
  const deleteItem = async (e, id) => {
    try {
      e.stopPropagation()
      await APIHelper.deleteItem(id)
      setRecords(records.filter(({ _id: i }) => id !== i))
    } catch (err) {}
  }

  // const updateItem = async (e, id) => {
  //   e.stopPropagation()
  //   const payload = {
  //     completed: !records.find(singleRecord => singleRecord._id === id).completed,
  //   }
  //   const updatedTodo = await APIHelper.updateItem(id, payload)
  //   setRecords(records.map(singleRecord => (singleRecord._id === id ? updatedTodo : singleRecord)))
  // }
  
  return (
    <Container maxWidth="md" sx={styles.root} >
        <Typography variant="h4">Trädgårdsföreningen vattning</Typography>
      <Box style={styles.inputBox}>
      <form onSubmit={handleSubmit}>

        <TextField id="name-input" 
          label="Ditt namn *" 
          variant="outlined"           
          name="name"
          sx={styles.input}
        />
        <TextField id="comment-input" 
          label="Kommentarer" 
          variant="outlined"   
          placeholder="Skriv ditt kommentar. Frivillit "      
          name="comment"   
          multiline
          sx={styles.input}
        />
        <Button type="submit" variant="contained" sx={styles.button}>Spara</Button>
        </form>

      </Box>
      <Box>
      {records
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(({ _id, name, date, time, comments, createdAt }, i) => (
        <Box key={i}>
          <ListItem 
            alignItems="flex-start"
            secondaryAction={
            <Button 
            color="error"
            onClick={e => deleteItem(e, _id)}>
              Ta bort
            </Button>
          }>
            <ListItemAvatar>
              <Avatar alt="name" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`${date} - ${time}`}
                  </Typography>
                  <Typography variat="body3">
                    {comments}
                  </Typography>                 
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" />
        </Box>
      ))}
      </Box>
    </Container>
  )
}
export default App