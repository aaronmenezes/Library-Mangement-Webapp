import React from 'react';
import PropTypes from 'prop-types';  
import { useTheme } from '@material-ui/core/styles'; 
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Link from '@material-ui/core/Link';
 

function preventDefault(event) {
  event.preventDefault();
}


export default function DashTileBooks(props) {
  const { categorySwitch ,hideLink} = props;
  const theme = useTheme();
  const [chartdata, setChartData] = React.useState([]);

  React.useEffect(() => { getTopBooks ()}, []);
  
  const getTopBooks = ()=>{
    fetch(process.env.REACT_APP_API_URL+'getTopBooks')
    .then(results => results.json())
    .then(data => { 
      let tmpdata = []
      chartdata.splice(0,chartdata.length) 
        data["rank_list"].forEach((item) => {   
          tmpdata.push({ name:item.book_item.title, issued : item.item_count,
            inventory_count : item.inventory_count,
            checkout_count : item.checkout_count  });  
         });
         setChartData(tmpdata)
    });    
  } 

  
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) { 
    return (
      <div className="custom-tooltip" style={{ background:"rgba(238, 245, 246, 0.79)",padding:"10"}}> 
        <p className="label">{`${label} `}</p>
        <p className="label">{`Issued: ${payload[0].payload.issued} `}</p>
        <p className="label">{`Available: ${payload[0].payload.inventory_count- payload[0].payload.checkout_count  }`}</p>
        <p className="label">{`TotalCount: ${payload[0].payload.inventory_count}`}</p> 
      </div>
    );
  }

  return null;
};


  return (
    <React.Fragment>
      <Title>Top Issued Books</Title>
      <ResponsiveContainer width="100%" height="100%"> 
      <BarChart  
          data={chartdata}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }} 
        > 
          <XAxis dataKey="name" /> 
          <Tooltip content={<CustomTooltip/>}/> 
          <Bar dataKey="issued" label fill="#8884d8"  /> 
        </BarChart>
      </ResponsiveContainer> 
      <div hidden={hideLink}>
        <Link color="primary" href="#" onClick={(event ) => {preventDefault(event); categorySwitch("reports")}}>
          View All Reports
        </Link>
      </div>    
    </React.Fragment>
  );
}

DashTileBooks.propTypes = {
  categorySwitch: PropTypes.func.isRequired,
  hideLink :PropTypes.bool,
};