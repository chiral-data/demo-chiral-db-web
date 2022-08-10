import React  from 'react'
import { Jsme } from 'jsme-react'

interface Props {
    loading: boolean;
    onChangeSmiles: (e: string) => void;
}

const JsmeEditor: React.FC<Props> = ({ loading, onChangeSmiles }) => {
    return (
        <div>
             <Jsme
                height="300px"
                width="400px"
                options="oldlook,star"
                disabled={loading}
                onChange={(s: string) => {
                    onChangeSmiles(s)
                }}
            />
        </div>
    )
}

export default JsmeEditor