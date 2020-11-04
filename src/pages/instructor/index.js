import React from 'react';
import Layout from '../../components/Layout';

import Student from './user';

const Component = () => {
  const students = [...new Array(12)];
  return (
    <Layout>
      <div className="p-6">
        <h3 className="text-3xl mb-3">Students</h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {students.map((_, i) => {
            return <Student key={i} id={i} />;
          })}
        </div>
      </div>
    </Layout>
  );
};
export default Component;
