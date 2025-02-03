const express = require("express")
const authmiddlware = require("../middleware/auth-middleware")
const Task = require("../model/task-model")


const router = express.Router()

//get task
router.get('/', authmiddlware, async (req, res) => {
    try {
      const tasks = await Task.findOne({ user_id: req.user._id});
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

//   //create task

  router.post('/', authmiddlware, async (req, res) => {
    const { title, description, status } = req.body;
  
    try {
      const task = new Task({ title, description, status, user_id: req.user._id });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
//   // Update task
  router.put('/:id', authmiddlware, async (req, res) => {

    try {
      const id  = req.params.id;
      const updatedata = req.body;
      const updateuser = await Task.updateOne({_id:id},{$set:updatedata})
      return res.status(200).json(updateuser)
      
    } catch (error) {
      next(error)
      
    }
    
    
  });
  
  // Delete task
  router.delete('/:id', authmiddlware, async (req, res) => {
    try {
      const id  = req.params.id;
      await Task.deleteOne({_id:id})
      return res.status(200).json({message:"User delete successfully"})

     
    
  
     
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;