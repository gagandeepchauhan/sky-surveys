const { Schema, model } = require('mongoose')

const AnswerSchema = new Schema(
	{
		category:{
			type: String,
			enum: ['FILLUP','MCQ'],
			required:true
		},
		answer:{ // in FILLUP CASE answer is a string else it will be a-d option
			type: String,
			required:true
		}
	}
)

const SubmissionSchema    = new Schema(
    {
    	respondent:{
    		type: Schema.Types.ObjectId,
            ref:'User',
    		required:true
    	},
    	survey:{
    		type: Schema.Types.ObjectId,
    		ref:'Survey'
    	},
        answers:{
        	type:[AnswerSchema],
        	required:true
        }
    },
    {
        timestamps: true
    } 
)

model("Submission",SubmissionSchema)