

const request = require("request-promise");
const reprompt = "Can I help you with anything else?";
const simpleResponseData = {
    "version": "1.0",
    "sessionAttributes": { },
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "(text + reprompt)"
      },
      "card": {
        "type": "Simple",
        "title": "Demo Alexa App",
        "content": "Thank you for using the demo custom Alexa web app",
	"image":{
		    "smallImageUrl":""
		}
      },
      "reprompt": {
        "outputSpeech": {
          "type": "PlainText",
          "text": "What was that?"
        }
      },
      "shouldEndSession": false
    }
  };
function speak(text = "what was that",cardTitle = "Demo Custom Web App",keepSessionAlive = true,repr = reprompt,cardText = text)
{
    let srd = simpleResponseData;
    srd.response.outputSpeech.text = text + '. ' + repr;
    srd.response.card.title = cardTitle;
    srd.response.reprompt.text = reprompt;
    srd.response.card.content = cardText;
    simpleResponseData.shouldEndSession = !keepSessionAlive;
    return simpleResponseData;
}
function isReqTypeIntent(req)
{
    return req.body.request.type === 'IntentRequest';
}
function getSlots(req)
{
    return isReqTypeIntent(req)?req.body.request.intent.slots:false;
}
//Create a slot named testSlot, and add it to your intent.
//Then you can pass this function the request object, and it
function getTestParam(req)
{
    if(isReqTypeIntent(req))
    {
        let slots = getSlots(req);
        if(slots)
        {
            return slots.testSlot;
        }
    }
    return false;
}
const webServiceRequest = {
  uri: process.env.DATASERVICE,
  qs: Object,
  method: "GET",
  json: true
};

function addDelimiter(text,delimiter = " ")
{
   let result = "";
   for(const x of text)  {
	result += x + delimiter;
   };
   return result;
}
function getDayOfWeek()
{
    let weekday = new Array(7);
    weekday[0] = "sunday";
    weekday[1] = "monday";
    weekday[2] = "tuesday";
    weekday[3] = "wednesday";
    weekday[4] = "thursday";
    weekday[5] = "friday";
    weekday[6] = "saturday";

    const d = new Date();
    return weekday[d.getDay()];
}

exports.reprompt = reprompt;
exports.addDelimiter = addDelimiter;
exports.getDayOfWeek = getDayOfWeek;
exports.speak = speak;
exports.isReqTypeIntent = isReqTypeIntent;
exports.getSlots = getSlots;


