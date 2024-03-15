import React, { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

import { BarChart } from 'recharts';
function DataCountManagerPosts ({data_posts}) {
    let data = [];
    const monthofYear = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    data_posts.forEach(element => {
      data.push({
        name: monthofYear[element.month_create - 1],
        'Num of Posts': element.numPosts
      })
    });

    const colorfilter = ['#51FF9D', '#612EFF']

    return (
<BarChart width={730} height={250} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="Num of Posts" fill={colorfilter[1]} />
</BarChart>
    );
}


export default DataCountManagerPosts;