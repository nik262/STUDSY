import * as fs from "fs";
import { FileService, operandClient, uploadFile, OperandService, IndexingStatus } from "@operandinc/sdk";

import React from "react";

  
const Drop = () => {

    (async () => {
        const fileService = operandClient(
            FileService,
            process.env.REACT_APP_API_KEY,
            "https://mcp.operand.ai"
        );
    
        const operandService = operandClient(
            OperandService,
            process.env.REACT_APP_API_KEY,
            "https://mcp.operand.ai"
        );
    
        const file = fs.readFileSync("wave_3_HCI.pdf");
        const response = await uploadFile(process.env.REACT_APP_API_KEY, "wave_3_HCI.pdf", "", file.buffer);
        console.log(response);
    
    
    
        // code here
    })();
    
  return (
<>      </>
  );
};
  
export default Drop;

// (async () => {
//     const fileService = operandClient(
//         FileService,
//         process.env.REACT_APP_API_KEY,
//         "https://mcp.operand.ai"
//     );

//     const operandService = operandClient(
//         OperandService,
//         process.env.REACT_APP_API_KEY,
//         "https://mcp.operand.ai"
//     );

//     const file = fs.readFileSync("wave_3_HCI.pdf");
//     const response = await uploadFile(process.env.REACT_APP_API_KEY, "wave_3_HCI.pdf", "", file.buffer);
//     console.log(response);



//     // code here
// })();