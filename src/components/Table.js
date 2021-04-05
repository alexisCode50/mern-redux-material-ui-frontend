import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DialogForm from './DialogForm';
import DialogConfirm from './DialogConfirm';

const useStyles = makeStyles({
  margin: {
    margin: 1,
  },
  table: {
    minWidth: 650,
    marginTop: 10
  },
});

export default function TasksTable(props) {

  const classes = useStyles();
  const initalState = {
    _id: '',
    name: '',
    description: ''
  }

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState(initalState);

  const handleUpdateTask = (item) => {
    setTask({
      ...task,
      _id: item._id,
      name: item.name,
      description: item.description,
    })
    setOpenForm(true);
    setEditing(true);
  };

  const handleDeleteTask = (item) => {
    setTask({
      ...task,
      _id: item._id,
      name: item.name,
      description: item.description,
    })
    setOpenConfirm(true);
  };

  const handleCloseDialogForm = () => {
    setOpenForm(false);
  };

  const handleCloseDialogConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tasks.map((task) => (
              <TableRow key={task.name}>
                <TableCell component="th" scope="row" align="center">
                  {task.name}
                </TableCell>
                <TableCell align="center">
                  {task.description}
                  </TableCell>
                <TableCell align="center">
                  {task.fat}
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    aria-label="update" 
                    className={classes.margin} 
                    onClick={() => handleUpdateTask(task)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    aria-label="delete" 
                    className={classes.margin}
                    onClick={() => handleDeleteTask(task)} 
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogForm
        task={task}
        editing={editing} 
        open={openForm}
        handleClose={handleCloseDialogForm}
      />
      <DialogConfirm
        task={task} 
        open={openConfirm}
        handleClose={handleCloseDialogConfirm}
      />
    </Fragment>
  );
}
