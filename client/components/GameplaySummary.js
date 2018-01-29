import React from 'react'
import { Graph } from 'react-d3-graph';


 export const GameplaySummary = () => {


// graph payload (with minimalist structure)
let dataObject = [ { word: 'water', dist: 1.0000000000000002 },
{ word: 'groundwater', dist: 0.6804581810209754 },
{ word: 'seawater', dist: 0.6647755474782806 },
{ word: 'rainwater', dist: 0.6503263996917127 },
{ word: 'aquifer', dist: 0.6218830931089436 },
{ word: 'sewage', dist: 0.6024014324395611 },
{ word: 'lake', dist: 0.5988407588502644 },
{ word: 'irrigation', dist: 0.5868683040931674 },
{ word: 'slurry', dist: 0.5855387498363018 },
{ word: 'aquifers', dist: 0.5839637942255227 },
{ word: 'reservoir', dist: 0.5825549121802733 },
{ word: 'brine', dist: 0.581693098062579 },
{ word: 'sediment', dist: 0.5771541950047395 },
{ word: 'saline', dist: 0.5766930540592432 },
{ word: 'ponds', dist: 0.5756197581636069 },
{ word: 'moisture', dist: 0.5690028664630451 },
{ word: 'filtration', dist: 0.5621381441104499 },
{ word: 'waters', dist: 0.5618672657908563 },
{ word: 'wells', dist: 0.5616654189087197 },
{ word: 'drainage', dist: 0.5616110027924677 } ]
let nodes = dataObject.map(data => {
  return {
    id: data.word
  }
})
let links = dataObject.map(data => {
  return {
    source: dataObject[0].word,
    target: data.word
  }
})
links = links.slice(1)
console.log(nodes)
const data = {
    nodes,
    links
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: 'lightgreen',
        size: 120,
        highlightStrokeColor: 'blue'
    },
    link: {
        highlightColor: 'lightblue'
    }
};

// graph event callbacks
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
   <div>
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
     <Graph
          id='graph-id-2' // id is mandatory, if no id is defined rd3g will throw an error
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
