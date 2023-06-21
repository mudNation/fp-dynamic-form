import { useState } from 'react';
import './App.css';
import "./style/index.scss"; 
import { form, FormData } from './utils/types';
import { payload } from './utils/utils';
import Render from './components/Render';
import ShowData from './components/ShowData';



function App() {
  const [content, setContent] = useState<form>()
  const [formUrl, setFormUrl] = useState(''); 
  const [showData, setShowData] = useState(false); 
  const [formData, setFormData] = useState<FormData>({}); 


  const handleSearch = () => {
     for(let load of payload){
        if(load.meta.url === formUrl){
          setContent(load); 
          setFormDatafunc(load); 
          setShowData(false)
          return; 
        }
     }

     alert("Url does not exist please try again"); 
  }

  const setFormDatafunc = (content: form) => {
    const tempFormData:FormData = {}; 
    if(content !== undefined){
        for(let pageNumber = 0; pageNumber < content.pages.length; pageNumber++){
            const page = content.pages[pageNumber]; 

            for(let i = 0; i < page.sections.length; i++){
                for(let j = 0; j < page.sections[i].fields.length; j++){
                    const field = page.sections[i].fields[j]; 
                    const obj = {
                        value: '',
                        name: field.name,
                        type: field.type,
                        error: false,
                        validation: field.validation,
                        sizes: null,
                        files: null,
                        length: 0,
                    }

                    
                    tempFormData[(pageNumber+'*'+i+'*'+j) as keyof typeof tempFormData] = obj ; 
                }
            }
        }
    } 

    setFormData({...tempFormData});
  }
  


  return (
    <div className='content'>
      <div className='urlContainer'>
        <label>Enter url of form</label>
        <input className='formUrl' value={formUrl} onChange={(e) => setFormUrl(e.target.value)}/>
        <button onClick={handleSearch}>Search</button>
      </div>

      {
        !showData ? <Render content={content} setShowData={setShowData} formData={formData} setFormData={setFormData} /> : <ShowData formData={formData} setShowData={setShowData} />
      }
      
    </div>
  );
}

export default App;
