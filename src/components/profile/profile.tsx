import React, { useState } from 'react';

const Profile = () => {
  // State to hold the name and email values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Implement sign-up logic here (e.g., call an API)
    console.log('Name:', name, 'Email:', email);

    // Here you can implement any logic for saving the profile, e.g., API call
    // If using navigation, uncomment below:
    // navigate('/dashboard'); 
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-[#007bff]"
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-[#007bff]"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Edit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primaryColor text-white rounded px-4 py-2 hover:bg-hoverColor transition duration-300"
        >
          Edit
        </button>
      </div>
    </form>
  );
};

export default Profile;