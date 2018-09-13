import React, { Component, Fragment } from "react";
import {Pie} from 'react-chartjs-2';
import { connect } from 'react-redux';

class PieChart extends Component {

  state = {

  }

  componentDidMount() {
        // .then(res => {
        //   const football = res.data;
        //   let playername = [];
        //   let playerscore = [];
        //   football.forEach(element => {
        //     playername.push(element.name);
        //     playerscore.push(element.score);
        //   });
        //   this.setState({
        //     Data: {
        //       labels: playername,
        //       datasets:[
        //          {
        //             label:'Champions League 2017/2018 Top Scorer',
        //             data: playerscore ,
        //             backgroundColor:[
        //              'rgba(255,105,145,0.6)',
        //              'rgba(155,100,210,0.6)',
        //              'rgba(90,178,255,0.6)',
        //              'rgba(240,134,67,0.6)',
        //              'rgba(120,120,120,0.6)',
        //              'rgba(250,55,197,0.6)'
        //           ]
        //          }
        //       ]
        //    }
        //    });
        // })
    }


   render() {
      return(
         <div>
            <Pie
              data={this.state.Data}
              options={{maintainAspectRatio: false}}/>
         </div>
      )
   }
}

export default connect()(PieChart)
