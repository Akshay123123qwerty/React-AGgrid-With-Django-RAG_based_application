import { useState } from "react"

type Row =  {
    inputValue:string,
}

interface saveinterface{
    content:Row[],
}

const Save = ({content}:saveinterface) => {
    const [data,setData] = useState(content);

   const handleDelete = (index:number)=>{
      setData((prev)=>prev.filter((_,i)=>i!= index));
   }

  return (
    <div style={{display:"grid"}}>
      {data.map((row, index) => (
        <>
          <li key={index}>{row.inputValue}
          <button onClick={()=> handleDelete(index)}>delete</button>
          </li>
          
          </>
        ))}
    </div>
  )
}

export default Save
