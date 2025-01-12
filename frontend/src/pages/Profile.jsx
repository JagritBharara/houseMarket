import React from 'react';
import Layout from '../components/Layout/Layout';
import MyProperty from '../components/MyProperty';
import AddProperty from '../components/AddProperty';

const Profile = () => {
  return (
    <Layout>
      <div className="flex align-center justify-center space-x-6 py-10">
        <div className="w-full md:w-3/4 bg-white p-4 rounded-lg shadow-md">
          <MyProperty />
        </div>
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
          <AddProperty />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
