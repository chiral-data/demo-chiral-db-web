import * as React from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { Jsme } from 'jsme-react';
import './App.css';
import client from './api';
import SideBar from './sidebar'

const demoTypes = [
  { name: 'Data Description', value: '1' },
  { name: 'Similarity Search', value: '2' },
  { name: 'Substructure Search', value: '3' }
];

const App = () => {
  const [demoType, setdemoType] = React.useState('1');
  const [desc, setDesc]  = React.useState(["Server Description Unknown!"]);
  const [loadingSim, setLoadingSim] = React.useState(false);
  const [smilesSim, setSmilesSim] = React.useState('');
  const [resultsSim, setResultsSim] = React.useState('');

  client.get_description()
    .then((reply) => {
        setDesc(reply.getDesc().split('\n'));
    });

  return (
    <div className="App">
      <SideBar />
        <div style={{ fontSize: "24px" }}>
          <ButtonGroup size="lg">
            {demoTypes.map((dt, idx) => (
              <ToggleButton
                key={idx}
                id={`dt-${idx}`}
                type="radio"
                variant={'outline-success'}
                name="radio"
                value={dt.value}
                checked={demoType === dt.value}
                onChange={(e) => setdemoType(e.currentTarget.value)}
              >
                {dt.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      <header className="App-header">
        {/* Data Description */}
        <div hidden={demoType !== '1'}>
          <p>Data from ChiralDB Demo Service</p>
          <p style={{fontSize: "14px"}}>
            {desc.map((d) => {
              return (<p style={{textAlign: "left"}}>{d}</p>)
            })}
          </p>
        </div>
        {/* Similarity Query */}
        <div hidden={demoType !== '2'}>
          <div>
            <Jsme
                height="300px"
                width="400px"
                options="oldlook,star"
                disabled={loadingSim}
                onChange={(smiles: string) => {
                  setSmilesSim(smiles);
                }}
              />
              <div hidden={smilesSim.length === 0}>
              <p>{smilesSim}</p>
              <Button onClick={() => {
                setLoadingSim(true);
                client.query_similarity('ChEMBL', smilesSim, 0.25)
                  .then((reply) => {
                    const results_in_string = reply.getResultsMap().toArray().reduce((pv: string, cv: any) => {
                      return pv + cv[0] + ' ' + cv[1] + '<br>';
                    }, 'Similarity Searching in '); 
                    setResultsSim(results_in_string);
                    setLoadingSim(false);
                  })
              }}>Search</Button>
              <p>{resultsSim}</p>
              </div>
          </div>
        </div>
        <a
          className="App-link"
          href="https://www.chiral.one"
          target="_blank"
          rel="noopener noreferrer"
        >
          More about ChiralDB 
        </a>
      </header>
    </div>
  );
}

export default App;
