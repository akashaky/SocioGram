Please review my approach for implementing assessment.
# Schemas
I will be using 3 collections/tables for this purpose:-

## 1. collection/table name:- landingSurvey:
     * This is to containerize the set of questions which are actually going to live for the user. 
     * This will act as parent for all questions which are going to live.  Also at a time there can be only one landing survey can be active at a time.
     * This collection will contain following attribute:-
     * 1->id : autoincremnt integer/id provided by mongodb
     * 2->surveyName: varchar
     * 3->isActive: short integer (which will be 0 which signifies the surevy is inactive or 1 which signify that the survey is active)
     * 4->isDeleted: short integer (if admin user want want to delete the draft survey we can use this flag)
     * 5->createdById: integer/mongoid (will be referencing to user table (assumed) who have created the survey)
     * 6->startDateTime: dateTime (in case we want to control the status of surevy via cron jobs)
     * 7->endDateTime: dateTime (in case we want to control the status of surevy via cron jobs)
     * 8->completedCount: integer (number of users who have gone thorugh last question and we have shown assessment result to them)

## 2. collection/table name: questions:
     * This collection will contain following attribute:-
     * 1->id : autoincremnt integer/id provided by mongodb
     * 2->surveyId : will be referencing to landingSurvey table/collection
     * 3->questionStatement: varchar
     * 4->questionType: short integer (which tells what is the format of the question i.e MCQ multple answer, short, MCQ single answer etc)
     * 5->questionOrder: integer (the order in which we have to send the question to the frontend)
     * 5->options: string/json (jsonified value which will contains options)
     * 6->createdById: integer/mongoid (will be referencing to user table (assumed) who have created the survey/question)

## 3. collection/table name: answers:
     * This collection will contain following attribute:-
     * 1->id : autoincremnt integer/id provided by mongodb
     * 2->surveyId : will be referencing to landingSurvey table/collection
     * 3->questionId : will be referencing to questions table/collection
     * 4->answer: string (contains stringified json in case the question is MCQ multiple answer)
     
# Request format

## Creating surevy
   Please have a look at the request format for creating landing surevy
```   
{
    "id": 1,
    "surveyName": "This is task survey",
    "startDateTime": 837363636288282,
    "endDateTime": 72783393988332,
    "question": [
        {
            "id": 1,
            "surevyId": 1,
            "questionOrder": 3,
            "questionStatement": "How many hours do you sleep",
            "options": null,
            "questionType": 1 //short answer
        },
        {
            "id": 2,
            "surevyId": 1,
            "questionOrder": 2,
            "questionStatement": "How many hours do you sleep111",
            "options": [
                {
                    "optionOrder": 2, //order in which we have to show options
                    "lablel": "sample label"
                },
                {
                    "optionOrder": 1,
                    "lablel": "sample label"
                }
                {
                    "optionOrder": 3,
                    "lablel": "sample label"
                }
            ],
            "questionType": 2 //MCQ multiple answers
        },
        {
            "id": 3,
            "surevyId": 1,
            "questionOrder": 2,
            "questionStatement": "How many hours do you sleep2",
            "options": [
                {
                    "optionOrder": 2,
                    "lablel": "sample label"
                },
                {
                    "optionOrder": 1,
                    "lablel": "sample label"
                }
                {
                    "optionOrder": 3,
                    "lablel": "sample label"
                }
            ],
            "questionType": 3 //MCQ single answer
        }
    ]
}

```
* Note that we may set isActive, isDeleted value as default value at time of creating the survey so I have not taken it in request.

## Accepting answers
```
For short/one word answer
{
    "id": 1,
    "questionId": 1,
    "answer": "8" ,//  //note that this value will be stringified json. For short answerType we might parse it to integer if required 
    "surevyId": 1,
}

For MCQ having single answer
{
    "id": 1,
    "questionId": 1,
    "answer": [{   //note that this value will be stringified json
        "optionOrder": 2,
        "lablel": "sample label"
    }],
    "surevyId": 1,
}
For MCQ having multiple answers
{
    "id": 1,
    "questionId": 1,
    "answer": [{   //note that this value will be stringified json
        "optionOrder": 2,
        "lablel": "sample label"
    },
    {
        "optionOrder": 3,
        "lablel": "sample label"
    }],
    "surevyId": 1,
}

```
#Bonus question answer for part 1 only

* We can create a get request that would be accepting encrypted surveyId and will be returing analytics for this
* For this we can apply group by clause(based on surevyId and questionId) on answer table having join on questions table to obtain the data and may transform it to desirable response.
* Alternatively, we can loop over questions table based on surveyId and for each questions we can obtain all the answers from the answer table.
