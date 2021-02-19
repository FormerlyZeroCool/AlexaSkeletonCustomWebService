const responder = require("./alexa-responder");


const alexaIntentMapper = {
    "HelloWorld": helloWorld,
    "AMAZON.FallbackIntent":fallBackIntent,
    "AMAZON.HelpIntent":helpIntent,
    "AMAZON.StopIntent":stopIntent,
    "AMAZON.CancelIntent":cancelIntent
}
function helloWorld(req, res)
{
    res.send(responder.speak("Hello, world!"));
}
function alexaMapper(req,res)
{
    if(req.body.request.type ==="LaunchRequest")
	    launchRequest(req,res);
    else if(req.body.request.type === "IntentRequest")
        alexaIntentMapper[req.body.request.intent.name](req,res);
    else
        endSession(res);
}
function fallBackIntent(req,res)
{
    res.send(responder.speak("I didn't get that","",""));
}
function helpIntent(req,res)
{
    const response = "You can say where hello world or whatever else you add a handler for like the hello world function!"
    res.send(responder.speak(response,"Help (replace Bursar with your office)",false));
}
function cancelIntent(res)
{
    endSession(res);
}
function stopIntent(req,res)
{
    endSession(res);
}
function endSession(res)
{
    res.send("{response:{'outputSpeech':{'type': 'PlainText', 'text': 'hope i helped out. have a nice day!'}, 'shouldSessionEnd':true}}");
}
function launchRequest(req,res)
{
   res.send(responder.speak("Welcome to the Alexa demo app. How can i help?","Welcome to the Alexa demo app!",true,""));
}
exports.handler = alexaMapper;
