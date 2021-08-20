import React from 'react';
import PropTypes from 'prop-types';  
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles'; 
import Title from './Title';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function DashTileCustomers(props) {
  const { categorySwitch,hideLink } = props;
  const classes = useStyles();
  const [chartdata, setChartData] = React.useState([]);

  React.useEffect(() => { getCustomerRanking ()}, []);
  
  const getCustomerRanking = ()=>{
    fetch(process.env.REACT_APP_API_URL+'getCustomerRanking')
    .then(results => results.json())
    .then(data => { 
      let tmpdata = []
      chartdata.splice(0,chartdata.length) 
        data["rank_list"].forEach((item) => {   
          tmpdata.push({ name:item.member_item.first_name+" "+item.member_item.last_name, amount : item.item_count });  
         });
         setChartData(tmpdata)
    });    
  } 
  return (
    <React.Fragment>
      <Title>Highest Paying Customers</Title>
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
            <Tooltip /> 
            <Bar dataKey="amount" label fill="#8884d8"  /> 
          </BarChart>
      </ResponsiveContainer>
      <div hidden={hideLink}> 
        <Link color="primary" href="#"  onClick={(event ) => {preventDefault(event); categorySwitch("members")}}>
          See All Member Info
        </Link>
      </div>
    </React.Fragment>
  );
}

DashTileCustomers.propTypes = {
  categorySwitch: PropTypes.func.isRequired ,
  hideLink :PropTypes.bool,
};