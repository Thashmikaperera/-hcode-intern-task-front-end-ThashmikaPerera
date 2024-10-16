import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Define the Progress interface
interface Progress {
  weight: string;
  date: Date | null;
  goals: string;
}

const ProgressComponent = () => {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newProgress, setNewProgress] = useState<Progress>({
    weight: '',
    date: null,
    goals: ''
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null); // State for error message

  // Handle input changes in form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Special handling for the date field to convert string to Date object
    if (name === 'date') {
      setNewProgress({ ...newProgress, date: value ? new Date(value) : null });
    } else {
      setNewProgress({ ...newProgress, [name]: value });
    }
  };

  // Handle form submission for adding or editing progress
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!validateInputs(newProgress)) {
      return; // Validation failed, error message is already set
    }

    if (editIndex !== null) {
      // Update existing progress
      const updatedProgress = progress.map((item, index) =>
        index === editIndex ? newProgress : item
      );
      setProgress(updatedProgress);
      setEditIndex(null);
    } else {
      // Add new progress
      setProgress([...progress, newProgress]);
    }

    // Reset form
    setNewProgress({ weight: '', date: null, goals: '' });
    setIsFormVisible(false);
    setError(null); // Reset error message
  };

  // Validate inputs function
  const validateInputs = (progress: Progress): boolean => {
    const weight = parseFloat(progress.weight);
    const currentDate = new Date();

    if (isNaN(weight) || weight <= 0) {
      setError('Please enter a valid weight (greater than 0).');
      return false;
    }
    
    if (!progress.date || progress.date > currentDate) {
      setError('Please enter a valid date (not in the future).');
      return false;
    }
    
    if (!progress.goals.trim()) {
      setError('Goals cannot be empty.');
      return false;
    }

    return true; // All validations passed
  };

  // Handle editing a progress entry
  const handleEdit = (index: number) => {
    setNewProgress(progress[index]);
    setEditIndex(index);
    setIsFormVisible(true);
    setError(null); // Reset error message
  };

  // Handle deleting a progress entry
  const handleDelete = (index: number) => {
    const updatedProgress = progress.filter((_, i) => i !== index);
    setProgress(updatedProgress);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Progress</h2>
        
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-primaryColor hover:bg-hoverColor text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Table */}
      <table className="min-w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Weight</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Goals</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{item.weight}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.date ? item.date.toLocaleDateString() : 'N/A'}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.goals}</td>
              <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                <button onClick={() => handleEdit(index)}>
                  <FaEdit className="text-blue-500 hover:text-blue-700" />
                </button>
                <button onClick={() => handleDelete(index)}>
                  <FaTrash className="text-red-500 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Centered Form for Adding or Editing Progress */}
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="border rounded p-4 bg-white shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              {editIndex !== null ? 'Edit Progress' : 'Add New Progress'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={newProgress.weight}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newProgress.date ? newProgress.date.toISOString().substr(0, 10) : ''}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Goals</label>
                <input
                  type="text"
                  name="goals"
                  value={newProgress.goals}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-primaryColor hover:bg-hoverColor text-white px-4 py-2 rounded">
                  {editIndex !== null ? 'Update Progress' : 'Add Progress'}
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

export default ProgressComponent;