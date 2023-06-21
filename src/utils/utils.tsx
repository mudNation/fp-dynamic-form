import { form } from "./types"; 

export const payload:form[] = [{
    "meta": {

        "name": "Lendsqr sample education loan form",

        "Description": "Education loan for secondary schools",

        "version": "1.0",

        "url": "https://lendsqr.com/education.html",

        "status": "active | inactive"
    },

    "pages": [
        {
            "name": "School information",

            "title": "School information",

            "description": "Please provide the information for the school you are paying for",

            "actions": [

                {

                    "type": "continue",

                    "label": "Next page"

                },

                {

                    "type": "cancel",

                    "label": "Cancel",

                    "message": "If you cancel this, all your breads would be buttered. Are you sure you want to do this?"

                }

            ],

            "sections": [

                {

                    "name": "Student details",

                    "description": "Provide the details of the student for which this loan is being taken.",

                    "fields": [

                        {

                            "id": "name_of_student",

                            "name": "Name of student",

                            "type": "short_text",

                            "label": "Student name",

                            "description": "Provide the name of the student as registered in the school or the birth certificate",

                            "validation": {

                                "required": true,

                                "minimum": "10",

                                "maximum": "256"
                            }


                        },

                        {

                            "id": "reason_for_loan",

                            "name": "Reason for loan",

                            "type": "long_text",

                            "label": "Why do you need this loan",

                            "description": "Kindly provide a justification for why this loan is required",

                            "validation": {

                                "required": true,

                                "minimum": "10",

                                "maximum": "1000",

                                "number_of_lines": 3
                            }

                        },

                        {

                            "id": "date_of_birth",

                            "name": "Date of birth",

                            "type": "date",

                            "label": "Date of birth",

                            "description": "Provide the date of birth of the student as contained in an ID or birth certificate",

                            "validation": {

                                "required": true,

                                "minimum": "100 years before",

                                "maximum": "12 years before"

                            }

                        },

                        {

                            "id": "time_of_day",

                            "name": "Time of day",

                            "type": "time",

                            "label": "Wake up time",

                            "description": "What time in the day does your child wake up?",

                            "validation": {

                                "required": false,

                                "minimum": "5 minutes before",

                                "maximum": "12 hours after"

                            }

                        },

                        {

                            "id": "resumption_date",

                            "name": "Resumption date",

                            "type": "date_time",

                            "label": "Resumption date",

                            "description": "What specific date and time would your child be delivered to the school?",

                            "validation": {

                                "required": false,

                                "minimum": "100 years before",

                                "maximum": "12 years before"

                            }

                        },

                        {

                            "id": "number_of_siblins",

                            "name": "Number of siblings",

                            "type": "integer",

                            "label": "Number of siblings",

                            "description": "How many siblings does the grand-father of your mother's uncle have?",

                            "validation": {

                                "required": true,

                                "minimum": "0",

                                "maximum": "10"

                            }

                        },

                        {

                            "id": "salary_of_dad",

                            "name": "Salary of parents",

                            "type": "number",

                            "label": "Salary of parents",

                            "description": "Provide, to the exact amount, the amount that your dad earned last month",

                            "validation": {

                                "required": true,

                                "minimum": "0",

                                "maximum": "999999999",

                                "decimal_points": 2
                            }

                        },

                        {

                            "id": "phone_number",

                            "name": "Phone",

                            "type": "phone",

                            "label": "Mobile",

                            "description": "",

                            "validation": {

                                "required": true

                            }

                        },

                        {

                            "id": "email",

                            "name": "Email of parents",

                            "type": "email",

                            "label": "Email of neigbors",

                            "description": "What's the email of your neighbor that sits across the pond?",

                            "validation": {

                                "required": true
                            }

                        },

                        {

                            "id": "food_options",

                            "name": "Food options",

                            "type": "checkbox",

                            "label": "What food options do you want",

                            "description": "Select all the options that come to your mind",

                            "options": [

                                {

                                    "id": "afro",

                                    "label": "Afolabi",

                                    "value": "123"

                                },

                                {

                                    "id": "afrolab",

                                    "label": "Afolabi",

                                    "value": "123"

                                }

                            ],

                            "validation": {

                                "required": true,

                                "minimum_select": 1

                            }

                        },

                        {

                            "id": "drink_options",

                            "name": "Drink options",

                            "type": "radio",

                            "label": "What drink options do you want",

                            "description": "Select all the options that you want to take but your mum won't allow",

                            "options": [

                                {

                                    "id": "afro",

                                    "label": "Afolabi",

                                    "value": "123"

                                },

                                {

                                    "id": "afrolab",

                                    "label": "Afolabi",

                                    "value": "123"

                                }

                            ],

                            "validation": {

                                "required": false

                            }

                        }

                    ]

                }

            ]

        },

        {

            "name": "Multi-media content",

            "title": "Multimedia information",

            "description": "You would need to record and upload videos and documents",

            "actions": [
                {
                    "type": "submit",

                    "label": "Submit Loan",

                    "message": "You are about to ask for a loan and if you don't pay back, your dog would be eaten. Do you want to go ahead?"

                },

                {

                    "type": "cancel",

                    "label": "Cancel",

                    "message": "If you cancel this, all your breads would be buttered. Are you sure you want to do this?"

                }

            ],

            "sections": [

                {

                    "name": "Student details",

                    "description": "Provide the details of the student for which this loan is being taken.",

                    "fields": [

                        {

                            "id": "name_of_student",

                            "name": "Name of student",

                            "type": "label",

                            "label": "Student name",

                            "description": "This is a type of form field for creating different document types"
                        },

                        {

                            "id": "document_options",

                            "name": "Document options",

                            "type": "dropdown",

                            "label": "What type of IDs do you have",

                            "description": "Select all the types of ID that your fada has",

                            "options": [

                                {

                                    "id": "id1",

                                    "label": "International Passport",

                                    "value": "passport"

                                },

                                {

                                    "id": "id2",

                                    "label": "National ID",

                                    "value": "NIN"

                                }

                            ],

                            "validation": {

                                "required": false,

                                "multi_select": true
                            }
                        }
                    ]

                },

                {

                    "name": "Upload details",

                    "description": "This is where you will upload different details. This section is used to show how different sections work.",

                    "fields": [

                        {

                            "id": "identity_document",

                            "name": "Identification document",

                            "type": "upload",

                            "label": "Upload your ID",

                            "description": "Kindly upload an ID document that is valid and issued by a government",

                            "validation": {

                                "required": true,

                                "allowed": "doc,docx,png,pdf,jpg,tiff",

                                "maximum": "5mb"
                            }
                        },

                        {

                            "id": "document_options",

                            "name": "Document options",

                            "type": "dropdown",

                            "label": "What type of IDs do you have",

                            "description": "Select all the types of ID that your fada has",

                            "options": [

                                {

                                    "id": "id1",

                                    "label": "International Passport",

                                    "value": "passport"

                                },

                                {

                                    "id": "id2",

                                    "label": "National ID",

                                    "value": "NIN"

                                }

                            ],

                            "validation": {

                                "required": false,

                                "multi_select": true

                            }

                        },

                        {

                            "id": "audio_attestation",

                            "name": "Audio attestation",

                            "type": "audio",

                            "label": "Record your voice",

                            "description": "Please record the audio of your voice so we know you can sing",

                            "validation": {

                                "required": true,

                                "minimum": "10secs",

                                "maximum": "30secs"

                            }

                        },

                        {

                            "id": "video_attestation",

                            "name": "Video attestation",

                            "type": "video",

                            "label": "Record your video",

                            "description": "Please record the video of you asking for money",

                            "validation": {

                                "required": true,

                                "minimum": "10secs",

                                "maximum": "30secs"

                            }

                        },

                        {

                            "id": "student_selfie",

                            "name": "Studend selfie",

                            "type": "image",

                            "label": "Take your selfie",

                            "description": "Please take your selfie against a pure white background",

                            "validation": {

                                "required": true

                            }

                        }

                    ]

                }

            ]

        }

    ]
}]


