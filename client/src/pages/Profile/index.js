import React from 'react';
import PageTitle from '../../components/PageTitle';
import { useSelector } from 'react-redux';

const Profile = () => {
const {user} = useSelector(state => state.users);
  return (
    <div>
      <PageTitle title="Profile" className="mt-2"></PageTitle>
      <div className='card p-2 mt-2 w-50 br-3'>
         <div className='flex justify-between'>
          <h1 className='text-md'>First Name</h1>
          <h1 className='text-md'>{user.firstName}</h1>
         </div>
         <div className='flex justify-between'>
          <h1 className='text-md'>Last Name</h1>
          <h1 className='text-md'>{user.lastName}</h1>
         </div>
         <div className='flex justify-between'>
          <h1 className='text-md'>Email</h1>
          <h1 className='text-md'>{user.email}</h1>
         </div>
         <div className='flex justify-between'>
          <h1 className='text-md'>Mobile</h1>
          <h1 className='text-md'>{user.phoneNumber}</h1>
         </div>
         <div className='flex justify-between'>
          <h1 className='text-md'>Identification Type</h1>
          <h1 className='text-md'>{user.identificationType}</h1>
         </div>
         <div className='flex justify-between'>
          <h1 className='text-md'>Identification Number</h1>
          <h1 className='text-md'>{user.identificationNumber}</h1>
         </div>
         <div className='flex justify-between'>
          <h1 className='text-md'>Address</h1>
          <h1 className='text-md'>{user.address}</h1>
         </div>
         <div className='flex justify-between'>
          <h1 className='text-md'>Account Verified</h1>
          <h1 className='text-md'>{user.isVerified ? "Yes" : "No"}</h1>
         </div>
         <div className='flex justify-between'>
          <h1 className='text-md'>Admin</h1>
          <h1 className='text-md'>{user.isAdmin ? "Yes" : "No"}</h1>
         </div>
        
      </div>
    </div>
  )
}

export default Profile
