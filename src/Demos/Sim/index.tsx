import React from 'react'
import { Button } from 'react-bootstrap'
import { client } from '../../data/grpc'
import { chembl_10k } from '../../data/chembl'
import JsmeEditor from '../../Components/JsmeEditor'
import Slider from 'rc-slider'
import "rc-slider/assets/index.css";
import Molecule from '../../Components/Molecule'
import { Container, Row, Col } from "react-bootstrap"


const DemoSim: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [smiles, setSmiles] = React.useState('');
    const [results, setResults] = React.useState([])
    const [cutoff, setCutoff] = React.useState(25)

    return (
        <div>
            <div>
                <JsmeEditor onChangeSmiles={setSmiles} loading={loading}/>
                <div style={{ marginTop: 30, width: 400 }}>
                    <p>Similarity Coefficient Minimum</p>
                    <Slider
                        min={0}
                        max={100}
                        value={cutoff}
                        onChange={(v: any) => setCutoff(v)}
                        railStyle={{
                            height: 4
                        }}
                        handleStyle={{
                            height: 28,
                            width: 28,
                            marginLeft: -14,
                            marginTop: -14,
                            backgroundColor: "blue",
                            border: 0
                        }}
                        trackStyle={{
                            background: "grey"
                        }}
                 />
                 </div>
                {/* Button */}
                <div> 
                    <p>Search {smiles} with cutoff {cutoff / 100.0}</p>
                    <Button onClick={() => {
                        setLoading(true);
                        client.query_similarity('ChEMBL', smiles, cutoff/100.0)
                        .then((reply) => {
                            const results_in_array = reply.getResultsMap().toArray().sort((a: any, b: any) => { return a[1] < b[1] })
                            setResults(results_in_array)
                            setLoading(false)
                        })
                    }}>Search</Button>
                </div>
                {/* Result  */}
                <Container>
                    <Row xs={1} md={2} lg={4}>
                        {results.map((s) => {
                            return (<Col><Molecule smiles={chembl_10k[s[0]]} size={200} text={s[0] + ' - ' + String(s[1]).slice(0, 4)} /></Col>)
                        })}
                    </Row>
                </Container>
            </div>
      </div>
    )
}

export default DemoSim;