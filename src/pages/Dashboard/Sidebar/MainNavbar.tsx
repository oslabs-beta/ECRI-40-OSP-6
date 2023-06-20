// import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PageContext } from '../../../contexts/dashboardContexts';
import { v4 as uuidv4 } from 'uuid';
import PageTab from './PageTab';

function MainNavBar({ overviewData }) {
  //TODO: replace with useContext
  const pagesList = overviewData.pages;

  return (
    <div className='flex h-screen flex-1 flex-col items-center bg-slate-600 text-white'>
      <Link
        to='/dashboard'
        className='mb-5 mt-10 rounded-lg px-8 py-2 font-sans text-lg font-semibold visited:text-white hover:bg-slate-500 hover:no-underline'
      >
        Overview
      </Link>
      {pagesList.map((page) => (
        <PageTab key={uuidv4()} page={page} />
      ))}
    </div>
  );
}

export default MainNavBar;
