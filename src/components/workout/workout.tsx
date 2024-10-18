import React, { useState, useEffect  } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {workoutService} from '../../service/WorkoutService';
import { WorkoutModel } from '../../models/Workoutmodel';

// Define the Workout interface
interface Workout {
  id: number;
  type: string;
  duration: string;
  calories: string;
  date: string;
  userId?: number;
}

const Workout = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newWorkout, setNewWorkout] = useState<Workout>({
    id: 0,
    type: '',
    duration: '',
    calories: '',
    date: '',
    userId: 0
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewWorkout({ ...newWorkout, [name]: value });
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await workoutService.getWorkouts(newWorkout.date, newWorkout.type);
        setWorkouts(response);
      } catch (err) {
        setError('Failed to fetch workouts');
      }
    };

    fetchWorkouts();
  }, []);

  const workout: WorkoutModel = {
    userId: 0,
    type: '',
    duration: '',
    calories: '',
    date: ''
  }

  const fetchWorkouts = async () => {
    try {
      const response = await workoutService.getWorkouts(newWorkout.date, newWorkout.type);
      setWorkouts(response);
    } catch (err) {
      setError('Failed to fetch workouts');
    }
  };

  const validateInputs = (): boolean => {
    // Reset error
    setError(null);

    if (!newWorkout.type || !newWorkout.duration) {
      setError('Type and Duration are required.');
      return false;
    }
    
    if (!newWorkout.calories || Number(newWorkout.calories) <= 0) {
      setError('Calories must be a positive number.');
      return false;
    }

    const inputDate = new Date(newWorkout.date);
    const today = new Date();
    if (inputDate > today) {
      setError('Date cannot be in the future.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return; // Stop if validation fails
    }

    if (editIndex !== null) {
      // Update existing workout
      const updatedWorkouts = await Promise.all(workouts.map(async (workout, index) => {
        if (index === editIndex) {
          const updatedWorkout = {
            ...workout,
            type: newWorkout.type,
            duration: newWorkout.duration,
            calories: newWorkout.calories,
            date: newWorkout.date,
            userId: parseInt(localStorage.getItem('userId') || '0')
          };
          await workoutService.updateWorkout(updatedWorkout, workouts[index].id);
          return updatedWorkout;
        }
        return workout;
      }));

      setWorkouts(updatedWorkouts);
      setEditIndex(null);
    } else {
      // Add new workout
      setWorkouts([...workouts, newWorkout]);
      try{
        console.log("workOuts",newWorkout);

        workout.type=newWorkout.type;
        workout.duration=newWorkout.duration;
        workout.calories=newWorkout.calories;
        workout.date=newWorkout.date;
        console.log("userId",localStorage.getItem('userId'));
        workout.userId=parseInt(localStorage.getItem('userId') || '0');

        let workOutModelPromise=await workoutService.saveWorkout(workout);
        if (!workOutModelPromise) {
          throw new Error('Failed to save workout');
        }
        console.log(workOutModelPromise);
      }catch(error){
        console.error('Failed to save user:', error);
      }
    }
    
    setNewWorkout({ id: 0, type: '', duration: '', calories: '', date: '' });
    setIsFormVisible(false);
  };

  const handleEdit = async (index: number) => {
    setNewWorkout(workouts[index]);
    setEditIndex(index);
    setIsFormVisible(true);
  };

  const handleDelete = async (id: number) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== id);
    setWorkouts(updatedWorkouts);
    await workoutService.deleteWorkout(id);
    fetchWorkouts();
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Workout</h2>
        
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-primaryColor hover:bg-hoverColor text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      <table className="min-w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Duration</th>
            <th className="border border-gray-300 px-4 py-2">Calories</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{workout.type}</td>
              <td className="border border-gray-300 px-4 py-2">{workout.duration}</td>
              <td className="border border-gray-300 px-4 py-2">{workout.calories}</td>
              <td className="border border-gray-300 px-4 py-2">{workout.date}</td>
              <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                <button onClick={() => handleEdit(index)}>
                  <FaEdit className="text-primaryColor hover:text-hoverColor" />
                </button>
                <button onClick={() => handleDelete(index)}>
                  <FaTrash className="text-primaryColor hover:text-hoverColor" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Centered Form for Adding or Editing Workout */}
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="border rounded p-4 bg-white shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{editIndex !== null ? 'Edit Workout' : 'Add New Workout'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="type">Type</label>
                <input
                  type="text"
                  name="type"
                  value={newWorkout.type}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="duration">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={newWorkout.duration}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="calories">Calories</label>
                <input
                  type="number"
                  name="calories"
                  value={newWorkout.calories}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newWorkout.date}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-primaryColor hover:bg-hoverColor text-white px-4 py-2 rounded">
                  {editIndex !== null ? 'Update Workout' : 'Add Workout'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="ml-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workout;