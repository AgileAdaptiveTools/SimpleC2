//GLOBAL VARIABLES
var LOCAL_8443_URL = "https://localhost:8443/";
var LOCAL_8080_URL = "http://localhost:8080/";
var TAILOR_URL = LOCAL_8443_URL+"SeamlessC2/S2Commander/data/";// "https://tinker.mitre.org:8443/";  URL to the TAILOR service
var TAILOR_RECOMMENDATIONS_URL = TAILOR_URL+"tailorcore/recommendations.json";
//uses proxy webapp from https://github.com/mitre/HTTP-Proxy-Servlet
var SMARTCOW_URL = "https://localhost:8443/proxy_http/ProxyServlet?http://scout2.mitre.org:8080/cow-server/"; //http://scout2.mitre.org:8080/cow-server/";
var SMARTCOW_PROC_INSTANCES = SMARTCOW_URL + "processInstances";
var SMARTCOW_TASKS = SMARTCOW_URL + "tasks/";
var SMARTCOW_USER_PROC_INSTANCES = SMARTCOW_PROC_INSTANCES +"/tasks.json?assignee=";

var DASHBOARDMAKER_WIDGET= "DashboardMaker"; // the dashboard maker namespace registered in OWF widgets
var DATA_SELECTOR_WIDGET= "DataSelector"; // the dataselector namespace registered in OWF widgets
var S2COMMANDER_WIDGET="SeamlessC2";
var S2HEADER_WIDGET="S2Header";
var SHOW_SYSTEM_WIDGETS = true;
var WIDGET_FILTER = ["MITRE.CIV","Google Maps"]; //[]   filters the widget list and only shows these
var OWF_NAMESPACE = "MITRESeamlessC2"; // for the user preferences that are stored in OWF
var OWF_EVENT_PREFIX = "org.mitre.seamlessc2.";

var SYSTEM_WIDGET_DIR= "../../owf/";//where are the system widgets

var DEBUG_LOCAL = true;
var LOGGER_ENABLED = false;
var CONSOLE_ENABLED = true;

Ext.Ajax.useDefaultXhrHeader = false; //for cross side scripting xxs http://stackoverflow.com/questions/10830334/ext-ajax-request-sending-options-request-cross-domain-when-jquery-ajax-sends-get
Ext.Loader.setConfig({
                enabled:true,
                disableCaching: false //debugging
            });

//OWF SETUP
var owf_running = OWF.Util.isRunningInOWF(); //https://github.com/ozoneplatform/owf/wiki/OWF-7-Developer-Creating-a-Widget                    
//The location is assumed to be at /<context>/js/eventing/rpc_relay.uncompressed.html if it is not set
OWF.relayFile = 'https://localhost:8443/owf/js/eventing/rpc_relay.uncompressed.html';
OWF.relayFile = 'owf/js/eventing/rpc_relay.uncompressed.html';

//LOGGING
if(LOGGER_ENABLED){
    var logger = OWF.Log.getDefaultLogger(); //popup window
    var appender = logger.getEffectiveAppenders()[0];
    // Enable logging 
    appender.setThreshold(log4javascript.Level.DEBUG);
    OWF.Log.setEnabled(LOG_ENABLED);
}

//Logger used through app
function log(str,obj){  
    str = "[S2Commander]:"+str;
    if(CONSOLE_ENABLED){
        if(typeof(console) !== 'undefined'){
            if(typeof(obj) !== 'undefined'){
                console.log(str,obj);
            }else{
                console.log(str);
            }
        }
    }
    if(LOGGER_ENABLED){
        logger.debug(str);
    }
}

function error(str,obj){  
    str = "[S2Commander](ERROR):"+str;
    if(CONSOLE_ENABLED){
        if(typeof(console) !== 'undefined'){
            if(typeof(obj) !== 'undefined'){
                console.log(str,obj);
            }else{
                console.log(str);
            }
        }
    }
    if(LOGGER_ENABLED){
        logger.error(str);
    }
    Ext.MessageBox.alert(str);
    throw(str);
}