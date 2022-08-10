import React from "react";
import { client } from "../../data/grpc";

const DemoDesc: React.FC = () => {
    const [desc, setDesc]  = React.useState(["Server Description Unknown!"]);

    client.get_description()
    .then((reply) => {
        setDesc(reply.getDesc().split('\n'));
    });

    return (
        <div> 
            <p>Data from ChiralDB Demo Service</p>
            <p style={{fontSize: "14px"}}>
            {desc.map((d) => {
                return (<p style={{textAlign: "left"}}>{d}</p>)
            })}
            </p>
      </div>
    )
}

export default DemoDesc