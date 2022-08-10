import React from 'react'
import SmilesDrawer from 'smiles-drawer-fork-continue'

interface Props {
    smiles: string
    size: number
    text?: string
    numbering?: number[]
    numbering_directions?: number[]
    highlights?: {} 
    theme?: string
}

class Molecule extends React.Component<Props> {
    updateDrawer() {
        const { theme, size } = this.props
        let options = { width: size, height: size, explicitHydrogens: false }
        SmilesDrawer.apply(
            options,
            'canvas[data-smiles]',
            theme ? theme : 'light'
        );
    }

    componentDidUpdate() {
        this.updateDrawer()
    }

    componentDidMount() {
        this.updateDrawer()
    }

    render() {
        const {
            smiles,
            text,
            numbering,
            numbering_directions,
            highlights
          } = this.props;
        return (
            <div> 
              <canvas
                id="example-canvas"
                data-smiles={smiles}
                data-numbering={JSON.stringify(numbering)}
                data-numbering-directions={JSON.stringify(
                  numbering_directions
                )}
                data-vertex-highlights={JSON.stringify(highlights)}
              ></canvas>
              <p>{text ? text : smiles}</p>
            </div>
        )
    }
}

export default Molecule