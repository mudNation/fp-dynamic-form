import { field } from "../utils/types"
import React, { useEffect, useRef, useState, useCallback } from "react"
import { useReactMediaRecorder } from "react-media-recorder-2";
import Webcam from 'react-webcam'
import profile from "../assets/profile.png"; 

interface PropType{
    field: field,
    error?: boolean,
    value?: string,
    onChange?: React.Dispatch<React.SetStateAction<any>>, 
    fileList?: FileList,
}

interface InputType{
    label: string,
    required: boolean,
    description: string,
    id?: string,
    error?: boolean,
    children: JSX.Element
}

const InputHolder = ({ label, required, description, children, id } : InputType) => {
    return(
        <div className='inputHolder'>
            <label htmlFor={id}>{label}  <span>{required ? '*' : ''}</span></label>
            <span>{description}</span>
            {children}
        </div>
    )
}

export const ShortText = ({ field, error, value, onChange }: PropType) => {
    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description} id={field.id}>
            <>
                <input type='text'value={value} minLength={parseInt(field.validation?.minimum || '')} 
                maxLength={parseInt(field.validation?.maximum || '')} id={field.id} className={ error?'inputError' : ''}
                onChange={(e) => onChange!==undefined ? onChange(e.target.value) : ''}/>
                {error ? <p className="error">Text should be between {field.validation?.minimum} and {field.validation?.maximum} characters</p> : '' }
            </>
        </InputHolder>
    )
}


export const LongText = ({ field, error, value, onChange }: PropType) => {
    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description} id={field.id}>
            <>
                <textarea value={value} 
                    rows={field.validation?.number_of_lines} 
                    maxLength={parseInt(field.validation?.maximum || '')} 
                    id={field.id} className={ error?'inputError' : ''}
                    onChange={(e) => onChange!==undefined ? onChange(e.target.value) : ''}></textarea>
                    {error ? <p className="error">Text should be between {field.validation?.minimum} and {field.validation?.maximum} characters</p> : '' }
            </>
             
        </InputHolder>
    )
}

export const DateInput = ({ field, value, onChange, error } : PropType) => {
    const min = field?.validation?.minimum?.split(" "); 
    const max = field?.validation?.maximum?.split(" "); 

    let maxString = getMinMaxDate(max || []); 
    let minString = getMinMaxDate(min || []); 


    return (
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description} id={field.id}>
            <>
            <input type='date'
                value={value} min={minString} max={maxString} id={field.id} onChange={(e) => onChange!==undefined ? onChange(e.target.value) : ''}
                className={ error?'inputError' : ''} />

                {error ? <p className="error">Please enter a date</p> : '' }
            </>
             
        </InputHolder>
    )
}



const getMinMaxDate = (dateArray: string[]) => {
    const date = new Date(); 

    if(dateArray[1]==='day'){
        let newDay = 0; 
        if(dateArray[2] === 'before'){
            newDay = date.getDate() - parseInt(dateArray[0]); 
        }else{
            newDay = date.getDate() + parseInt(dateArray[0])
        }

        date.setDate(newDay); 
    }else if(dateArray[1]==='month'){
        let newMonth = 0; 
        if(dateArray[2] === 'before'){
            newMonth = date.getMonth() - parseInt(dateArray[0]); 
        }else{
            newMonth = date.getMonth() + parseInt(dateArray[0])
        }

        date.setMonth(newMonth)
    }else{
        let newYear = 0; 
        if(dateArray[2] === 'before'){
            newYear = date.getFullYear() - parseInt(dateArray[0]); 
        }else{
            newYear = date.getFullYear() + parseInt(dateArray[0])
        }

        date.setFullYear(newYear)
    }

    const day = date.getDate().toString().length === 1 ? "0" + date.getDate() : date.getDate(); 
    const month = date.getMonth().toString().length === 1 ? "0" + date.getMonth() : date.getMonth(); 

    return `${date.getFullYear()}-${month}-${day}`; 
}

export const Time = ( { field, value, onChange, error } : PropType) => {
    const min = field?.validation?.minimum?.split(" "); 
    const max = field?.validation?.maximum?.split(" "); 

    let maxString = getMinMaxTime(max || []); 
    let minString = getMinMaxTime(min || []); 

    return (
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description} id={field.id}>
            <>
                <input type='time' value={value} min={minString} max={maxString} id={field.id} 
                onChange={(e) => onChange!==undefined ? onChange(e.target.value) : ''} className={ error?'inputError' : ''} />

                {error ? <p className="error">Please enter a time between {minString} and {maxString} </p> : '' }
            </>
             
        </InputHolder>
    )
}

export const DateTime = ( { field, value, onChange, error } : PropType) => {
    const min = field?.validation?.minimum?.split(" "); 
    const max = field?.validation?.maximum?.split(" "); 

    let maxString = getMinMaxDate(max || []); 
    let minString = getMinMaxDate(min || []); 

    return (
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description} id={field.id}>
            <>
                <input type='datetime-local'  value={value}
                min={minString+"T23:00:00"} max={maxString+"T23:00:00"} id={field.id} 
                onChange={(e) => onChange!==undefined ? onChange(e.target.value) : ''} className={ error?'inputError' : ''}/>

                {error ? <p className="error">Please enter a date </p> : '' }
            </>
            
        </InputHolder>
    )
}

export const NumberInput = ({ field, value, onChange, error } : PropType) => {
    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description} id={field.id}>
            <>
                <input type='number' value={value} 
                min={field.validation?.minimum} max={field.validation?.maximum} id={field.id}
                onChange={(e) => onChange!==undefined ? onChange(e.target.value) : ''} className={ error?'inputError' : ''}/>

                {error ? <p className="error">Please enter a number between {field.validation?.minimum} and {field.validation?.maximum} </p> : '' }
            </>

        </InputHolder>
    )
}

export const Phone = ({ field, value, onChange, error } : PropType) => {
    const handleChange = (value:string) => {
        if(/^\d+$/.test(value) || value===''){
            if(onChange!==undefined){
                onChange(value); 
            } 
        }
    }

    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description} id={field.id}>
            <>
                <input type='tel' value={value} id={field.id} className={ error?'inputError' : ''}
                onChange={(e)=>handleChange(e.target.value)}/>

                {error ? <p className="error">Please enter a valid phone number </p> : '' }
            </>
            
        </InputHolder>
    )
}

export const Email = ( { field, value, onChange, error } : PropType) => {
    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description} id={field.id}>
            <>
                <input type='email' value={value} id={field.id} onChange={(e) => onChange!==undefined ? onChange(e.target.value) : ''} className={ error?'inputError' : ''}/>
                {error ? <p className="error">Please enter a valid email address </p> : '' }
            </>
            
        </InputHolder>
    )
}

export const CheckBox = ( { field, onChange, error, value } : PropType) => {
    const [checkedFields, setCheckedField] = useState(Array(field?.options?.length).fill(false))

    useEffect(() => {
        const valueArray = value?.split(" "); 
        const tempCheckedFields = checkedFields; 

        

        for(let i = 0; i < field.options!.length; i++){
            
            if(valueArray?.indexOf(field.options![i].id) !== -1){
                tempCheckedFields[i] = true; 
            }else{
                tempCheckedFields[i] = false; 
            }
        }

        setCheckedField([...tempCheckedFields]); 
    }, [value, checkedFields, field.options])

    const handleChange = (index:number) => {
        if(field === undefined){
            return; 
        }

        let selected = ''; 
        for(let i = 0; i < field?.options!.length; i++){
            if(i === index){
                if(!checkedFields[i]){
                    selected += field?.options![i].id + " "
                }
            }else if(checkedFields[i]){
                selected += field?.options![i].id + " "
            }
        }

        const tempCheckedFields = checkedFields; 
        tempCheckedFields[index] = !tempCheckedFields[index];

        setCheckedField([...tempCheckedFields]); 

        if(onChange!==undefined){
            onChange(selected)
        }   
    }


    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description}>
            <>
                <div className={error ? 'option inputError' : 'option'}>
                    {
                        field.options?.map((option, index) => (
                            <>
                                <input type="checkbox" id={option.id + "checkbox"} name={option.id} value={option.value} checked={checkedFields[index]} onChange={() => handleChange(index)} className={ error?'inputError' : ''}/>
                                <label htmlFor={option.id + "checkbox"}> {option.label}</label><br></br>
                            </>
                        ))
                    }

                    
                </div>
                {error ? <p className="error">Please select at least {field.validation?.minimum_select} option(s) </p> : '' }
            </>
            
        </InputHolder>
    )
}

export const Radio = ( { field, onChange, error, value} : PropType) => {
    const [checkedFields, setCheckedField] = useState(Array(field?.options?.length).fill(false)); 

    useEffect(() => {
        const valueArray = value?.split(" "); 
        const tempCheckedFields = checkedFields; 

        for(let i = 0; i < field.options!.length; i++){
            if(valueArray?.indexOf(field.options![i].id) !== -1){
                tempCheckedFields[i] = true; 
            }else{
                tempCheckedFields[i] = false; 
            }
        }

        setCheckedField([...tempCheckedFields]); 
    }, [value, checkedFields, field.options])

    const handleChange = (index:number) => {
        if(field === undefined){
            return; 
        }

        let selected = ''; 
        const tempCheckedFields = checkedFields; 
        for(let i = 0; i < field?.options!.length; i++){
            if(i === index){
                tempCheckedFields[i] = true; 
                selected = field?.options![i].id
            }else if(checkedFields[i]){
                tempCheckedFields[i] = false; 
            }
        }

        setCheckedField([...tempCheckedFields]); 

        if(onChange!==undefined){
            onChange(selected)
        }   
    }


    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description}>
            <>
                <div className={error ? 'option inputError' : 'option'}>
                    {
                        field.options?.map((option, index) => (
                            <>
                                <input type="radio" id={option.id + "radio"} name={field.id} value={option.value} checked={checkedFields[index]} onChange={() => handleChange(index)} />
                                <label htmlFor={option.id + "radio"}> {option.label}</label><br></br>
                            </>
                        ))
                    }
                </div>
                {error ? <p className="error">Please select an option </p> : '' }
            </>
            
        </InputHolder>
    )
}


export const DropDown = ( { field, onChange, error, value } : PropType) => {
    const handleChange = (value: string) => {
        if(onChange !== undefined){
            onChange(value)
        }
    }

    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description}>
            <>
                <select  value={value?.split(',')} multiple={field.validation?.multi_select} onChange={(e) => {
                            
                            const options = [...e.target.selectedOptions];
                            const values = options.map(option => option.value); 
                            

                            handleChange(values.toString())

                        }}>
                    {
                        field.options?.map((option) => (
                            <option value={option.value} id={option.id}>{option.label}</option>
                        ))
                    }
                </select>

                {error ? <p className="error">Please select at least {field.validation?.minimum_select} option(s) </p> : '' }
            </>
            
        </InputHolder>
    )
}

export const Upload = ( { field, fileList, onChange, error, value } : PropType) => {
    const fileRef = useRef<HTMLInputElement>(null); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let fileList = e?.target.files;
        const sizes = []; 
        if(fileRef.current !== null){
            let fileString = ''; 
            if(fileList !== null){
                for(var i = 0; i < fileList!.length; i++){
                    fileString += fileList[i].name + ", "
                    sizes.push(fileList[i].size)
                }
            }
            
            if(onChange !== undefined){
                onChange({sizes: sizes, fileString: fileString, files: fileList}); 
            }
        }
    }

    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description}>
            <>
                <div>
                    <input
                        ref={fileRef}
                        accept=".pdf"
                        style={{ display: "none" }}
                        id="raised-button-file"
                        type="file"
                        onChange={(e) => handleChange(e)}
                    />

                    <label htmlFor="raised-button-file">
                        <button onClick={() => fileRef.current?.click()}>
                            <span>{value === '' ? "File" : value}</span>
                        </button>
                    </label>
                </div>
                {error ? <p className="error">Please select a file with any of these extensions {field.validation?.allowed} </p> : '' }
            </>
            
        </InputHolder>
    )
}

export const Audio = ( { field, value, onChange, error } : PropType) => {
    const { startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ audio: true });
    const [isRecording, setIsRecording] = useState(false); 

    const handleStartRecording = () => {
        setIsRecording(true); 
        startRecording(); 
    }

    const handleStopRecording = () => {
        setIsRecording(false); 
        stopRecording(); 
    }

    useEffect(() => {
        if(onChange !== undefined && mediaBlobUrl !== undefined){
            onChange(mediaBlobUrl)
        }
    }, [mediaBlobUrl, onChange])

    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description}>
            <>
                <audio src={value} controls autoPlay />
                
                <div>
                    <p>{isRecording ? 'Recording...' : ''}</p>
                    <button onClick={handleStartRecording} disabled={isRecording}>Start Recording</button>
                    <button onClick={handleStopRecording} disabled={!isRecording}>Stop Recording</button>
                </div>

                {error ? <p className="error">Please record your voice for about {field.validation?.minimum} to {field.validation?.maximum} </p> : '' }
            </>
        </InputHolder>
    )
}


export const Video = ( { field, value, onChange, error } : PropType) => {
    const { startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ video: true });

    const [isRecording, setIsRecording] = useState(false); 

    const handleStartRecording = () => {
        setIsRecording(true); 
        startRecording(); 
    }

    const handleStopRecording = () => {
        setIsRecording(false); 
        stopRecording(); 
    }

    useEffect(() => {
        if(onChange !== undefined && mediaBlobUrl !== undefined){
            onChange(mediaBlobUrl)
        }
    }, [mediaBlobUrl, onChange])


    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description}>
            <>
                {/* <audio src='' ref={audioRef} controls /> */}
                <video src={value} controls autoPlay />

                <div>
                    <p>{isRecording ? <Webcam /> : ''}</p>
                    <button onClick={handleStartRecording} disabled={isRecording}>Start Recording</button>
                    <button onClick={handleStopRecording} disabled={!isRecording}>Stop Recording</button>
                </div>

                {error ? <p className="error">Please video yourself for about {field.validation?.minimum} to {field.validation?.maximum} </p> : '' }
            </>
        </InputHolder>
    )
}

export const Image = ( { field, value, error, onChange } : PropType) => {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const [isOpen, setIsOpen] = useState(false); 

    const webcamRef = useRef<Webcam>(null);
    const imageRef = useRef<HTMLImageElement>(null)
    
    useEffect(() => {
        if(imageRef.current !== null){
            imageRef.current.src = value || profile; 
        }
    })


    const capture = useCallback(
        () => {
            if(webcamRef.current !== null && imageRef.current !== null){
                const imageSrc = webcamRef.current.getScreenshot();
                imageRef.current.src = imageSrc || ''; 
                if(onChange !== undefined){
                    onChange(imageSrc); 
                }
            }
        },
        [webcamRef, onChange]
    );

    return(
        <InputHolder label={field.label} required={field.validation?.required || false} description={field.description}>
            <>
                <div className='imageWeb'>

                    <img ref={imageRef} src={profile} className="img" alt={field.id}/>

                    {
                        isOpen ? 
                        <Webcam
                            audio={false}
                            height={220}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={580}
                            videoConstraints={videoConstraints}
                        /> : ''
                    }
                    

                    <div>
                        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Hide' : 'Show'} Camera</button>
                        <button onClick={capture}>Capture photo</button>
                    </div>
                </div>
                
                {error ? <p className="error">Please take a selfie of yourself </p> : '' }
            </>
        </InputHolder>
    )
}

  




export const getMinMaxTime = (dateArray: string[]) : string => {
    const date = new Date(); 

    if(dateArray[1]==='minutes'){
        
        let newMinute = 0; 
        if(dateArray[2] === 'before'){
            // alert("in here");
            newMinute = date.getMinutes() - parseInt(dateArray[0]); 
        }else{
            newMinute = date.getMinutes() + parseInt(dateArray[0])
        }

        date.setMinutes(newMinute); 
    }else if(dateArray[1]==='hours'){
        let newHour = 0; 
        if(dateArray[2] === 'before'){
            newHour = date.getHours() - parseInt(dateArray[0]); 
        }else{
            newHour = date.getHours() + parseInt(dateArray[0])
        }

        date.setHours(newHour)
    }

    const minute = date.getMinutes().toString().length === 1 ? "0" + date.getMinutes() : date.getMinutes(); 
    const hours = date.getHours().toString().length === 1 ? "0" + date.getHours() : date.getHours(); 

    // alert(minute);

    return `${hours}:${minute}:00`; 
}
