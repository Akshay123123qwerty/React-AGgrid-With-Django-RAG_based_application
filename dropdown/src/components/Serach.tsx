import { useRef, useState } from "react"
import { searchDerived } from "../api";

type Group = {
    "category":string,
    "count":number,
    "inputValues":string[],     
}

const Serach = () => {
    const [query,setQuery] = useState<string>("");
    const [groups,setGroups] = useState<Group[]>([]);
    const debounce = useRef<any>(null)


    const handleChange = () => {
        if(debounce.current) clearTimeout(debounce.current);
        debounce.current = setTimeout(async ()=>{
          if(query.trim() == ""){
             setGroups([]);
            return;
          }
          try{
            const res = await searchDerived(query,20);
            console.log(res.data.groups);
            setGroups(res.data.groups);  
          }catch (err) {
        console.error("Error fetching search results:", err);
      }
     },1000)

        

    }

  return (
    <>
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <input
    value={query}
    onChange={(e)=>setQuery(e.target.value)}
    placeholder="Search by Category"
    style={{ padding: 8, width: 320 }}
  />
  <button onClick={handleChange}>Search</button>
</div>

{groups.length > 0 && (
  <div style={{ marginTop: 12 }}>
    {groups.map((g) => (
      <div
        key={g.category}
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 10,
          marginBottom: 8,
        }}
      >
        <div style={{ fontWeight: 1000 }}>
          {g.category} • {g.count}
        </div>
        <div style={{ display: "flex",flexDirection:'column',justifyContent:'center',alignContent:'center', gap: 10, marginTop: 10 }}>
          {g.inputValues.map((iv) => (
            <span
              key={iv}
              style={{
                padding: "4px 10px",
                borderRadius: 12,
                border: "1px solid #ccccccff",
                fontSize: 20,
                cursor: "pointer",
              }}
             
            >
              {iv}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
)}
</>

  )
}

export default Serach
