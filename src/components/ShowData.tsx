import { FormData } from "../utils/types"
interface ShowDataType{
    formData: FormData,
    setShowData: React.Dispatch<React.SetStateAction<boolean>>, 
}


const ShowData = ({ formData, setShowData } : ShowDataType) => {
    // alert(JSON.stringify(formData)); 

    return(
        <> 
            <div className="showDataButton">
                <button onClick={() => {setShowData(false)}}>Edit Data</button>
                <button onClick={() => {alert("Your form has been submitted. Thank You")}}>Submit</button>
            </div>
            <h1>Your Data</h1>
        
            {
                Object.keys(formData).map((key) => {
                    if(formData[key].value.length !== 0 && formData[key].value !== undefined){

                        if(formData[key].type==="audio"){
                            return(
                                <div className="dataLabel" key={key}>
                                    <h3>{formData[key].name}</h3>
                                    <audio src={formData[key].value} controls />
                                </div>
                            )
                        }else if(formData[key].type==="video"){
                            return(
                                <div className="dataLabel" key={key}>
                                    <h3>{formData[key].name}</h3>
                                    <video src={formData[key].value} controls />
                                </div>
                            )
                        }else if (formData[key].type==="image"){
                            return(
                                <div className="dataLabel" key={key}>
                                    <h3>{formData[key].name}</h3>
                                    <img src={formData[key].value} alt={formData[key].id}/>
                                </div>
                            )
                        }else{
                            return(
                                <div className="dataLabel" key={key}>
                                    <h3>{formData[key].name}</h3>
                                    <p>{formData[key].value}</p>
                                </div>
                            )
                        }
                        
                    }else{
                        return ''; 
                    }
                })
            }
        </>
    )
}

export default ShowData; 