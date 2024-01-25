export default function Search({children, keyid, inputRef, onChange}) {
   return (
       <>
            <div className="search-wrapp">
                <div className="search">
                    <input onChange={() => onChange(this)} ref={inputRef} type="text" id={`search_${keyid}`} name={`search_${keyid}`} />
                    <div className="searchresult">
                        {children}
                    </div>
                </div>
            </div>
       </>
   )
}