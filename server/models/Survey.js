const { Schema, model } = require('mongoose')

const AgeGroupSchema = new Schema(
	{
		lb: Number,
		ub: Number
	}
)

const OptionSchema = new Schema(
	{
		a: String,
		b: String,
		c: String,
		d: String
	}
)

const QuestionSchema = new Schema(
	{
		category:{
			type: String,
			enum: ['FILLUP','MCQ'],
			required:true
		},
		question:{
			type: String,
			required:true
		},
		options: { // we ignore options in case category is FILLUP
			type: OptionSchema
		}
	}
)

const SurveySchema    = new Schema(
    {
    	coordinator:{
    		type: Schema.Types.ObjectId,
            ref:'User',
    		required:true
    	},
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        genders:{
            type: Array,
            required: true
        },
        questions:{
        	type:[QuestionSchema],
        	required:true
        },
        ageGroup:{
        	type:AgeGroupSchema
        },
        visibleToAllAgeGroup:{
        	type: Boolean,
        	required:true
        },
        submissions:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Submission'
            }
        ],
        closingDate:{
            type: Date,
            required:true
        }
    },
    {
        timestamps: true
    } 
)

model("Survey",SurveySchema)