
 import {
   Box,
   Button,
   Checkbox,
   FormControlLabel,
   Slider,
   Typography,
 } from "@mui/material";
 import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css"
 
 export default function App() {
   const [password, setPassword] = useState("");
   const [numberAllowed, setNumberAllowed] = useState(false);
   const [charAllowed, setCharAllowed] = useState(false);
   const [length, setLength] = useState(8);
 
   // useRef
   const passwordRef = useRef(null);
 
   // useCallback
   const generatePassword = useCallback(() => {
     let pass = "";
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
 
     if (numberAllowed) str += "0123456789";
     if (charAllowed) str += "!@#$%^&*()_+";
 
     for (let i = 1; i < length; i++) {
       const char = Math.floor(Math.random() * str.length + 1);
       pass += str.charAt(char);
     }
 
     setPassword(pass);
   }, [length, numberAllowed, charAllowed]);
 
   // useEffect
   useEffect(() => {
     generatePassword();
   });
 
   const copyPasswordToClipboard = () => {
     window.navigator.clipboard.writeText(password);
     passwordRef.current?.select();
     passwordRef.current?.setSelectionRange(0, 15);
   };
 
   return (
     <>
       <Box
         sx={{
           display: "flex",
           justifyContent: "center",
           flexDirection: "column",
           alignItems: "center",
           padding: "50px",
           boxSizing: "border-box",
           height: "100vh", // This centers the content vertically

         }}
       >
         <Typography  className="text-color-bold" variant="h4">Password Generator</Typography>
 
         {/* input field and button */}
         <Box sx={{ padding: "20px", boxSizing: "border-box", display: "flex" }}>
           <input
             type="text"
             value={password}
             placeholder="password"
             readOnly
             ref={passwordRef}
           />
           <Button onClick={copyPasswordToClipboard} variant="contained">
             Copy
           </Button>
         </Box>
 
         {/* slider and checkbox */}
         <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
           <Slider
             value={length}
             onChange={(e, newValue) => setLength(newValue)}
             min={8}
             max={15}
             step={1}
             valueLabelDisplay="auto"
             sx={{ width: 200 }}
           />
           <Typography className="text-color" gutterButtom>Length: {length}</Typography>
           <Box>
             <FormControlLabel
               control={
                 <Checkbox
                   checked={numberAllowed}
                   onChange={() => {
                     setNumberAllowed((prev) => !prev);
                   }}
                  
                 />
               }
               className="text-color"
               label="Number"
             />
             <FormControlLabel
               control={
                 <Checkbox
                   checked={charAllowed}
                   onChange={() => {
                     setCharAllowed((prev) => !prev);
                   }}
                 />
               }
               className="text-color"
               label="character"
             />
           </Box>
         </Box>
       </Box>
     </>
   );
 }
