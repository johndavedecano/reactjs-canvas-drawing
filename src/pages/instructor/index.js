import React from 'react';
import Layout from '../../components/Layout';

import Student from './user';

const Component = () => {
  const students = [...new Array(12)];
  return (
    <Layout>
      <div className="p-6">
        <h3 className="text-3xl mb-3">Students</h3>
        <div className="grid grid-flow-col grid-rows-3 gap-4">
          {students.map((_, i) => {
            return <Student key={i} id={i} />;
          })}
        </div>
      </div>
    </Layout>
  );
};
export default Component;
