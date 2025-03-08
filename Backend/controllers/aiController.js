import { generateContent } from "../services/aiServices.js";


export const GetResponse = async(req,res)=>{
    const { code } = req.body;
  if(!code){
    return res.send("data may not be empty!")
  }
  const response = await generateContent(code);
  res.send(response);
}