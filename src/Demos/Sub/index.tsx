import React from 'react'
import { Button } from 'react-bootstrap'
import { client } from '../../data/grpc'
import { chembl_10k } from '../../data/chembl'
import JsmeEditor from '../../Components/JsmeEditor'
import Molecule from '../../Components/Molecule'
import { Container, Row, Col } from "react-bootstrap"

const atom_colors = [
    'rgba(0, 255, 0, 0.5)',
    'rgba(0, 255, 255, 0.5)',
    'rgba(0, 0, 255, 0.5)',
    'rgba(255, 0, 255, 0.5)',
    'rgba(255, 255, 0, 0.5)',
    'rgba(255, 0, 0, 0.5)',
    'rgba(128,0,0,0.5)',
    'rgba(199,21,133,0.5)',
    'rgba(75,0,130,0.5)',
    'rgba(50,205,50,0.5)',
    'rgba(0,0,255,0.5)',
    'rgba(124,252,0,0.5)',
    'rgba(60,179,113,0.5)',
    'rgba(255,235,205,0.5)',
    'rgba(0,128,0,0.5)',
    'rgba(85,107,47,0.5)',
    'rgba(147,112,219,0.5)',
    'rgba(240,128,128,0.5)',
    'rgba(255,192,203,0.5)',
    'rgba(72,61,139,0.5)',
    'rgba(255,182,193,0.5)',
    'rgba(250,235,215,0.5)',
    'rgba(127,255,212,0.5)',
    'rgba(0,0,139,0.5)',
    'rgba(210,105,30,0.5)',
    'rgba(102,205,170,0.5)',
    'rgba(210,180,140,0.5)',
    'rgba(255,127,80,0.5)',
    'rgba(135,206,235,0.5)',
    'rgba(0,128,128,0.5)',
    'rgba(144,238,144,0.5)',
    'rgba(244,164,96,0.5)',
    'rgba(0,100,0,0.5)',
    'rgba(255,140,0,0.5)',
    'rgba(255,69,0,0.5)',
    'rgba(128,0,0,0.5)',
    'rgba(72,209,204,0.5)',
    'rgba(245,222,179,0.5)',
    'rgba(165,42,42,0.5)',
    'rgba(218,165,32,0.5)',
    'rgba(221,160,221,0.5)',
    'rgba(128,128,0,0.5)',
    'rgba(255,165,0,0.5)',
    'rgba(153,50,204,0.5)',
    'rgba(0,206,209,0.5)',
    'rgba(255,0,255,0.5)',
    'rgba(47,79,79,0.5)',
    'rgba(250,250,210,0.5)',
    'rgba(139,0,0,0.5)',
    'rgba(255,99,71,0.5)',
    'rgba(135,206,250,0.5)',
    'rgba(255,255,224,0.5)',
    'rgba(0,0,128,0.5)',
    'rgba(100,149,237,0.5)',
    'rgba(0,191,255,0.5)',
    'rgba(0,250,154,0.5)',
    'rgba(0,139,139,0.5)',
    'rgba(95,158,160,0.5)',
    'rgba(238,130,238,0.5)',
    'rgba(205,92,92,0.5)',
    'rgba(255,20,147,0.5)',
    'rgba(255,228,196,0.5)',
    'rgba(128,0,128,0.5)',
    'rgba(218,112,214,0.5)',
    'rgba(127,255,0,0.5)',
    'rgba(138,43,226,0.5)',
    'rgba(160,82,45,0.5)',
    'rgba(255,215,0,0.5)',
    'rgba(255,255,0,0.5)',
    'rgba(255,250,205,0.5)',
    'rgba(65,105,225,0.5)',
    'rgba(238,232,170,0.5)',
    'rgba(152,251,152,0.5)',
    'rgba(250,128,114,0.5)',
    'rgba(245,245,220,0.5)',
    'rgba(0,255,255,0.5)',
    'rgba(0,255,255,0.5)',
    'rgba(30,144,255,0.5)',
    'rgba(143,188,143,0.5)',
    'rgba(32,178,170,0.5)',
    'rgba(205,133,63,0.5)',
    'rgba(0,255,0,0.5)',
    'rgba(188,143,143,0.5)',
    'rgba(176,224,230,0.5)',
    'rgba(0,255,127,0.5)',
    'rgba(148,0,211,0.5)',
    'rgba(139,69,19,0.5)',
    'rgba(175,238,238,0.5)',
    'rgba(233,150,122,0.5)',
    'rgba(216,191,216,0.5)',
    'rgba(0,0,205,0.5)',
    'rgba(139,0,139,0.5)',
    'rgba(222,184,135,0.5)',
    'rgba(46,139,87,0.5)',
    'rgba(240,230,140,0.5)',
    'rgba(189,183,107,0.5)',
    'rgba(220,20,60,0.5)',
    'rgba(178,34,34,0.5)',
    'rgba(123,104,238,0.5)',
    'rgba(219,112,147,0.5)',
    'rgba(107,142,35,0.5)',
    'rgba(255,248,220,0.5)',
    'rgba(173,255,47,0.5)',
    'rgba(255,160,122,0.5)',
    'rgba(255,105,180,0.5)',
    'rgba(25,25,112,0.5)',
    'rgba(34,139,34,0.5)',
    'rgba(70,130,180,0.5)',
    'rgba(106,90,205,0.5)',
    'rgba(184,134,11,0.5)',
    'rgba(255,0,0,0.5)',
    'rgba(64,224,208,0.5)',
    'rgba(186,85,211,0.5)',
    'rgba(154,205,50,0.5)'
];  

function create_highlights(atom_list: number[]): Map<number, string> {
    const color_idx = atom_list[0] % atom_colors.length
    var highlights = new Map<number, string>() 
    atom_list.map((idx: number) => {
        highlights.set(idx - 1, atom_colors[color_idx])
    });
  
    return highlights;
}

const DemoSub: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [smarts, setSmarts] = React.useState('');
    const [results, setResults] = React.useState([])

    return (
        <div>
            <div>
                <JsmeEditor onChangeSmiles={setSmarts} loading={loading}/>
                {/* Button */}
                <div> 
                    <p>Search {smarts} </p> 
                    <Button onClick={() => {
                        setLoading(true);
                        client.query_substructure('ChEMBL', smarts) 
                        .then((reply) => {
                            const results_in_array = reply.getResultsMap().toArray()
                            setResults(results_in_array)
                            setLoading(false)
                        })
                    }}>Search</Button>
                </div>
                {/* Result  */}
                <Container>
                    {results.length > 0 ?
                        (<Row xs={1} md={2} lg={4}>
                            {results.map((s) => {
                                return (<Col key={s[0]}><Molecule smiles={chembl_10k[s[0]]} size={200} text={s[0] + ' ' + (s[1][0][0] % atom_colors.length)} highlights={Object.fromEntries(create_highlights(s[1][0]))}/></Col>)
                            })}
                        </Row>) :
                        (<p>{loading ? 'Searching ...' : 'No result'}</p>)
                    }
                </Container>
            </div>
      </div>
    )
}

export default DemoSub;