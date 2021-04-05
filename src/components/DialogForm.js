import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from './../state/actions/tasksActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function FormDialog(props) {

  const dispatch = useDispatch();
  const classes = useStyles();
  const initalState = {
    _id: '',
    name: '',
    description: ''
  }
  const [task, setTask] = useState(initalState);
  const [error, setError] = useState({});

  useEffect(() => {
    props.editing === true ? setTask(props.task) : setTask(initalState)
  }, [props]);

  function handleChange(event) {
    setTask({ ...task, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (task.name.length === 0 || task.description.length === 0) {
      setError({ ...error, message: "All inputs required" });
      console.log(error)
    } else {
      props.editing === true ? dispatch(updateTask(task)) : dispatch(createTask(task))
      props.handleClose()
    }
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
        {  props.editing === true ? 'Update Task' : 'Create Task'  }
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className={classes.root}>
            <div>
              <TextField
                id="name"
                name="name"
                label="Enter name"
                type="text"
                value={task.name}
                onChange={handleChange}
                fullWidth
              />
             </div>
            <div>
              <TextField
                id="description"
                name="description"
                label="Enter description"
                type="text"
                value={task.description}
                onChange={handleChange}
                fullWidth
              />
            </div>
            <Grid container justify="center" alignItems="center">
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button onClick={props.handleClose} color="primary">
                Cancel
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
