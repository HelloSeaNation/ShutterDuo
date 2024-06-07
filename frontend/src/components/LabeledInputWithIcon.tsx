import React from "react";
import { Flex, FormLabel, Input, Image } from "@chakra-ui/react";


const LabeledInputWithIcon = ({
 iconSrc,
 iconAlt,
 label,
 inputProps,
 textStyle,
 name,
 value,
 onChange
}: {
 iconSrc: string;
 iconAlt: string;
 label: string;
 inputProps: object;
 textStyle: object;
 name:string;
 value: string;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
 return (
   <Flex direction="column" mb={4}>
     <Flex alignItems="center">
       <Image
         src={iconSrc}
         alt={iconAlt}
         boxSize="30px"
         marginTop="10px"
         marginRight="10px"
       />
       <FormLabel style={{ ...textStyle, marginTop: "15px" }}>
         {label}
       </FormLabel>
     </Flex>
     <Input name={name}
       value={value}
       onChange={onChange}{...inputProps} />
   </Flex>
 );
};


export default LabeledInputWithIcon;

