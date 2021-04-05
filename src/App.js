import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from './state/actions/tasksActions';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DialogForm from './components/DialogForm';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10),
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    marginBottom: theme.spacing(3),
  },
}));

function App() {

  const data = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getTasks())
  }, []);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleCreateTask = () => {
    setOpen(true);
    setEditing(false);
  };

  const handleCloseDialogForm = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" gutterBottom>
              List Tasks
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8} container justify="center" alignItems="center">
        <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={() => handleCreateTask()}
          >
            Create Task
          </Button>
          <Table tasks={data.tasks} />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <DialogForm
        editing={editing} 
        open={open}
        handleClose={handleCloseDialogForm}
      />
    </div>
  );
}

export default App;
