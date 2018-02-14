import React from 'react'
import { Graph } from 'react-d3-graph';
import {Container, Row, Col} from 'react-grid-system'

 export const GameplaySummary = () => {

// graph payload (with minimalist structure)
  let dataObject = [
    { word: 'water', dist: 1.0000000000000002, group:1 },
    { word: 'groundwater', dist: 0.6804581810209754, group:1 },
    { word: 'seawater', dist: 0.6647755474782806, group:1 },
    { word: 'rainwater', dist: 0.6503263996917127, group:1  },
    { word: 'aquifer', dist: 0.6218830931089436, group:1  },
    { word: 'sewage', dist: 0.6024014324395611, group:1  },
    { word: 'lake', dist: 0.5988407588502644, group:1  },
    { word: 'irrigation', dist: 0.5868683040931674, group:1  },
    { word: 'slurry', dist: 0.5855387498363018, group:1  },
    { word: 'aquifers', dist: 0.5839637942255227, group:1  },
    { word: 'reservoir', dist: 0.5825549121802733, group:1  },
    { word: 'brine', dist: 0.581693098062579, group:1  },
    { word: 'sediment', dist: 0.5771541950047395, group:1  },
    { word: 'saline', dist: 0.5766930540592432, group:1  },
    { word: 'ponds', dist: 0.5756197581636069, group:1  },
    { word: 'moisture', dist: 0.5690028664630451, group:1  },
    { word: 'filtration', dist: 0.5621381441104499, group:1  },
    { word: 'waters', dist: 0.5618672657908563, group:1  },
    { word: 'wells', dist: 0.5616654189087197, group:1  },
    { word: 'drainage', dist: 0.5616110027924677, group:1 },
    { word: 'table', dist: 1.0000000000000002, group:2  },
    { word: 'tables', dist: 0.7185113243096308, group:2 },
    { word: 'Mendeleevs', dist: 0.4926511764799961, group:2 },
    { word: 'rows', dist: 0.4729091976717507, group:2 },
    { word: 'napkin', dist: 0.4692143564276406, group:2 },
    { word: 'platter', dist: 0.4521108541039627, group:2 },
    { word: 'lookup', dist: 0.4496551857118417, group:2 },
    { word: 'list', dist: 0.4477119829158194, group:2 },
    { word: 'tray', dist: 0.44647323009488327, group:2 },
    { word: 'spoons', dist: 0.44235623300775917, group:2 },
    { word: 'cup', dist: 0.4341408737435272, group:2 },
    { word: 'chopsticks', dist: 0.4311323994561369, group:2 },
    { word: 'trays', dist: 0.4291506421769089, group:2 },
    { word: 'sofa', dist: 0.42887490402881373, group:2 },
    { word: 'chairs', dist: 0.42775612351929454, group:2 },
    { word: 'gussiedup', dist: 0.420660603125199, group:2 },
    { word: 'folddown', dist: 0.41891328747792744, group:2 },
    { word: 'stack', dist: 0.41541943080169896, group:2 },
    { word: 'room', dist: 0.41541380683850326, group:2 }
  ]
  let commonObject = [
    { word: 'table', dist: 0.7692683831245235 },
    { word: 'water', dist: 0.7692683831245228 },
    { word: 'tables', dist: 0.5533556889767247 },
    { word: 'buckets', dist: 0.5257434547193277 },
    { word: 'brine', dist: 0.5178426785432341 },
    { word: 'trays', dist: 0.5022660256474897 },
    { word: 'suction', dist: 0.5016273089966282 },
    { word: 'seawater', dist: 0.5005417256813588 },
    { word: 'surface', dist: 0.4967089624459405 },
    { word: 'slurry', dist: 0.4960386677918648 },
    { word: 'lake', dist: 0.49279055183843035 },
    { word: 'groundwater', dist: 0.48984596439003414 },
    { word: 'reservoir', dist: 0.48653746516539864 },
    { word: 'faucet', dist: 0.48426677412488073 },
    { word: 'container', dist: 0.4837255026143488 },
    { word: 'salt', dist: 0.4798786210012819 },
    { word: 'aquifer', dist: 0.47715462422174443 },
    { word: 'filtration', dist: 0.4771198441687351 },
    { word: 'percolation', dist: 0.4753089207139849 },
    { word: 'tub', dist: 0.4740796058932266 }
  ]
  let nodes = dataObject.map(data => {
  if (data.word === 'water'){
    return {
      id: data.word,
      color: 'red',
      fontSize: 18,
      symbolType: 'star',
      fontWeight: 'bold'
    }
  }
  else if (data.word === 'table'){
    return {
      id: data.word,
      color: 'red',
      fontSize: 18,
      symbolType: 'star',
      fontWeight: 'bold'
    }
  }
  else {
    return {
      id: data.word,
      fontSize: 18
    }
  }
})
  let links = dataObject.map(data => {
    if (data.group === 1){
      return {
        source: dataObject[0].word,
        target: data.word
      }
    }
    else {
      return {
        source: dataObject[20].word,
        target: data.word
      }
    }
  })
  links = links.slice(1)
  const data = {
      nodes,
      links
  };
  const myConfig = {
      nodeHighlightBehavior: true,
      node: {
          color: 'lightgreen',
          size: 220,
          highlightStrokeColor: 'blue'
      },
      link: {
          highlightColor: 'lightblue'
      },
      height : 800,
      width : 1150
  };

const onClickNode = function(nodeId) {
    //  window.alert('Clicked node ${nodeId}');
};

const onMouseOverNode = function(nodeId) {
    //  window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function(nodeId) {
    //  window.alert(`Mouse out node ${nodeId}`);
};

const onClickLink = function(source, target) {
    //  window.alert(`Clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function(source, target) {
    //  window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function(source, target) {
    //  window.alert(`Mouse out link between ${source} and ${target}`);
};
 return (
    <div className='overlay'>
      <Graph
           id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
           data={data}
           config={myConfig}
           onClickNode={onClickNode}
           onClickLink={onClickLink}
           onMouseOverNode={onMouseOverNode}
           onMouseOutNode={onMouseOutNode}
           onMouseOverLink={onMouseOverLink}
           onMouseOutLink={onMouseOutLink}
         />
    </div>
 )
}
