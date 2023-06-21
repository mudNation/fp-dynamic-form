import { form, validationType, FormData } from "../utils/types"
import { DateInput, DateTime, Email, LongText, NumberInput, ShortText, Time, Phone, CheckBox, Radio, DropDown, Upload, Audio, Video, Image, getMinMaxTime } from './fields';
import { useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { confirmAlert } from 'react-confirm-alert';


interface ContentType{
    content: form | undefined,
    setShowData: React.Dispatch<React.SetStateAction<boolean>>, 
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>,
}



const Render = ({ content, setShowData, formData, setFormData } : ContentType) => {
    const [pageNumber, setPageNumber] = useState(0); 
  

    const checkIsPageValid = (type:string): boolean => {
        if(formData === undefined){
            return false; 
        }

        let invalid = false; 

        const tempFormData = formData; 
        for(let data in tempFormData){
          const keyArray = data.split("*"); 
          if(parseInt(keyArray[0]) === pageNumber){
            switch(tempFormData[data].type){
              case 'short_text': 
              case 'long_text': 
                tempFormData[data].error = checkShortTextValid(formData[data]?.validation, formData[data].value); 
                if(!invalid) invalid = tempFormData[data].error
                break; 
              case 'date':
                tempFormData[data].error = checkRequired(formData[data]?.validation, formData[data].value);
                if(!invalid) invalid = tempFormData[data].error 
                break;
              case 'time':
                tempFormData[data].error = checkTimeValid(formData[data]?.validation, formData[data].value); 
                if(!invalid) invalid = tempFormData[data].error
                break; 
              case 'dateTime': 
                tempFormData[data].error = checkRequired(formData[data]?.validation, formData[data].value); 
                if(!invalid) invalid = tempFormData[data].error
                break; 
              case 'number': 
              case 'integer':
                tempFormData[data].error = checkNumberValid(formData[data]?.validation, formData[data].value); 
                if(!invalid) invalid = tempFormData[data].error
                break
              case 'phone':
                tempFormData[data].error = checkRequired(formData[data]?.validation, formData[data].value); 
                if(!invalid) invalid = tempFormData[data].error
                break; 
              case 'email':
                tempFormData[data].error = checkEmailValid(formData[data]?.validation, formData[data].value); 
                if(!invalid) invalid = tempFormData[data].error
                break; 
              case 'checkbox': 
                tempFormData[data].error = checkCheckboxValid(formData[data]?.validation, formData[data].value); 
                if(!invalid) invalid = tempFormData[data].error
                break; 
              case 'radio': 
                tempFormData[data].error = checkRequired(formData[data]?.validation, formData[data].value);
                if(!invalid) invalid = formData[data].error 
                break;
              case 'label': 
                tempFormData[data].error = checkRequired(formData[data]?.validation, formData[data].value);
                if(!invalid) invalid = formData[data].error 
                break;
              case 'upload':
                tempFormData[data].error = checkValidUpload(formData[data]?.validation, formData[data].sizes);
                if(!invalid) invalid = formData[data].error 
                break;
              case 'audio': 
              case 'video':
              case 'image': 

                tempFormData[data].error = checkRequired(formData[data]?.validation, formData[data].value);
                if(!invalid) invalid = formData[data].error; 
                
                break;
            }
          }
        }

        setFormData({...tempFormData})

        if(!invalid){
          if(type==='continue'){
            setPageNumber(prevNumber => prevNumber+1); 
          }else{
            setShowData(true); 
          }
        }
        

        return invalid; 
    }

    const handleContinueClick = () =>{
        checkIsPageValid('continue'); 
    }

    const handleSubmitClick = () => {
      checkIsPageValid('submit'); 
    }

    const checkValidUpload = (validation: validationType | undefined, sizes: []): boolean =>{
      if(validation === undefined || (validation.required === false && (sizes?.length === 0 || sizes === undefined))){
        return false; 
      }

      // alert(sizes?.length); 

      if(sizes?.length > 0){
        for(let i = 0; i < sizes.length; i++){

          let maxSize = validation.maximum; 
          if(maxSize !== undefined){
            const numb = maxSize.match(/\d/g);
            maxSize = numb?.join("");
            
            const fileSizeBytes = sizes[i]; // bytes
            let fileSizeMB = fileSizeBytes / (1024 ** 2); 
            
            if(fileSizeMB > parseInt(maxSize || '')){
              return true; 
            }
          }
        }
      }else{
        return true; 
      }

      return false; 
    }



    const checkCheckboxValid = (validation: validationType | undefined, input: string): boolean =>{
      if(validation === undefined || (validation.required === false && input === '')){
        return false; 
      }

      if(validation.minimum_select !== undefined){
        const checkBoxArray = input.split(' ');
        if(checkBoxArray.length <= validation.minimum_select){
          return true;
        }
      }

      return false; 
    }

    const checkShortTextValid = (validation: validationType | undefined, input: string): boolean =>{
      if(validation === undefined){
        return true; 
      }

      if(input.length < parseInt(validation?.minimum || '') || input.length > parseInt(validation.maximum || '')){
        return true; 
      }

      return false; 
    }

    const checkTimeValid = (validation: validationType | undefined, input: string): boolean =>{
      if(validation === undefined || (validation.required === false && input === '')){
        return false; 
      }

      const timeArray = input.split(":"); 
      const hour = parseInt(timeArray[0]); 
      const minute = parseInt(timeArray[1]); 


      const minString = getMinMaxTime(validation?.minimum?.split(" ") || []).split(":"); 
      const minHour = parseInt(minString[0]); 
      const minMinute = parseInt(minString[1]); 



      const maxString = getMinMaxTime(validation?.maximum?.split(" ") || []).split(":"); 
      const maxHour = parseInt(maxString[0]); 
      const maxMinute = parseInt(maxString[1]); 

      if((hour > minHour) || (hour === minHour && minute >= minMinute)){
        if((hour < maxHour) || (hour === maxHour && minute <= maxMinute)){
          return false; 
        } 
      }

      return true; 
    }

    const checkEmailValid = (validation: validationType | undefined, input: string):boolean =>{
      if(validation === undefined || (validation.required === false && input === '')){
        return false; 
      }

      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (input.match(validRegex)){
        return false; 
      }

      return true; 
    }

    const checkNumberValid = (validation: validationType | undefined, input: string):boolean =>{
      if(validation === undefined || (validation.required === false && input === '')){
        return false; 
      }

      if(parseInt(input) >= parseInt(validation.minimum || '') && parseInt(input) <= parseInt(validation.maximum || '')){
        return false; 
      }

      return true; 
    }

    const checkRequired =  (validation: validationType | undefined, input: string): boolean =>{
      if(validation === undefined){
        return false; 
      }else if((input==='' || input===undefined) && validation.required){

        return true; 
      }

      return false; 
    }

    const handleValueChange = (id: string, value: string) => {
      if(formData === undefined){
        return; 
      }

      const tempFormData = formData[id]; 
      tempFormData.value = value; 
      setFormData({...formData, [id]: tempFormData})

    }

    const handleFileChange = (id: string, value: {sizes: [], fileString: string, files: FileList}) => {
      if(formData === undefined){
        return; 
      }

      const tempFormData = formData[id]; 
      tempFormData.sizes = value.sizes; 
      tempFormData.value = value.fileString; 
      tempFormData.files = value.files; 

      setFormData({...formData, [id]: tempFormData})
    }

    const handleCancel = (message: string) => {
      confirmAlert({
        title: 'Confirm to cancel',
        message: message,
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteFields()
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      });

      
    }

    const deleteFields = () => {
      const tempFormData = formData; 
      for(let data in tempFormData){
        const keyArray = data.split("*"); 
        if(parseInt(keyArray[0]) === pageNumber){
          tempFormData[data].value = ''; 
          tempFormData[data].error = false; 
          tempFormData[data].fileList = null; 
          tempFormData[data].sizes = null; 
        }
      }

      setFormData({...tempFormData}); 
    }

    return(
        <div className='formBody'>
        <div className='leftBody'>
          {
            content?.pages.map((p, index) => {
                if(index === pageNumber){
                    return <div className='page active' key={p.name}>{p.name}</div>
                }else{
                    return <div className='page inActive' key={p.name}>{p.name}</div>
                }
            }
              
            )
          }
        </div>

        <div className='rightBody'>
          <h1>{content?.pages[pageNumber].name}</h1>
          <h2>{content?.pages[pageNumber].description}</h2>

          {
            content?.pages[pageNumber].sections.map((section, sectionIndex) => (
              <section key={section.name}>
                <h3>{section.name}</h3>
                <h4>{section.description}</h4>

                {
                  section.fields.map((field, index) => {
                    if(formData === undefined || Object.keys(formData).length === 0){
                      return ''; 
                    }

                    const stringIndex = pageNumber+"*"+sectionIndex+"*"+index; 

                    switch(field.type){
                      case "short_text": 
                        // alert(formData !== null + ":::" + JSON.stringify(formData))
                        return <ShortText field={field} 
                                error={formData[stringIndex].error} 
                                value={formData[stringIndex].value}
                                onChange={(value) => handleValueChange(stringIndex, value)}/>

                      case "long_text": 
                      case "label":
                        return <LongText field={field} 
                                  error={formData[stringIndex].error}
                                  value={formData[stringIndex].value}
                                  onChange={(value) => handleValueChange(stringIndex, value)}/>
                      case "date": 
                        return <DateInput field={field} 
                                value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)} error={formData[stringIndex].error} />
                      case "time": 
                        return <Time field={field} error={formData[stringIndex].error}
                                value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)}/>
                      case "date_time": 
                        return <DateTime field={field} error={formData[stringIndex].error}
                        value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)}/>
                      case "number": 
                      case "integer": 
                        return <NumberInput field={field} error={formData[stringIndex].error}
                        value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)}/>
                      case "phone": 
                        return <Phone field={field} 
                                error={formData[stringIndex].error}
                                value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)}/>
                      case "email": 
                        return <Email field={field} error={formData[stringIndex].error}
                                value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)}/>
                      case "checkbox": 
                        return <CheckBox field={field} error={formData[stringIndex].error}
                        value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)}/>
                      case "radio":
                        return <Radio field={field} error={formData[stringIndex].error}
                        value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)}/>
                      case "dropdown": 
                        return <DropDown field={field}  error={formData[stringIndex].error}
                        value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)}/>
                      case "upload": 
                        return <Upload field={field} error={formData[stringIndex].error} value={formData[stringIndex].value}
                          fileList={formData[stringIndex].fileList} onChange={(value) => handleFileChange(stringIndex, value)} />
                      case "audio":
                        return <Audio field={field} error={formData[stringIndex].error}
                        value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)}/>
                      case "video": 
                        return <Video field={field} error={formData[stringIndex].error}
                        value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)}/>
                      case "image":
                        return <Image field={field} error={formData[stringIndex].error}
                        value={formData[stringIndex].value} onChange={(value) => handleValueChange(stringIndex, value)}/>
                    }

                    return ''; 
                  })
                }
              </section>
            ))
          }

          <div className='actionHolder'>
            {
                content?.pages[pageNumber].actions?.map((action) => {
                    if(action.type === 'continue'){
                        return <button className='actionButton' onClick={handleContinueClick}>{action.label}</button>; 
                    }else if(action.type === 'submit'){
                        return <button className='actionButton' onClick={handleSubmitClick}>{action.label}</button>; 
                    }else if(action.type === 'cancel'){
                        return <button className='actionButton' onClick={() => handleCancel(action.message || "You will lose all data")}>{action.label}</button>; 
                    }

                    return ''; 
                })
            }
          </div>
          
        </div>
      </div>
    )
}

export default Render; 