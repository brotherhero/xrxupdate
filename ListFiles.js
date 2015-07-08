/* 
 * ListFiles.js
 *
 * This file encapsulates the functions to Xerox webservices.
 *
 * @revision 09/15/2012
 */
 
/****************************  GLOBALS  *******************************/


/****************************  FUNCTIONS  *****************************/

function listFiles() {
    var urlStr = document.getElementById("url").value;
    var useridStr = document.getElementById("userid").value;
    var passwordStr = document.getElementById("password").value;
 
    if (urlStr !== "") {
        xrxCallAjax(urlStr, null, "GET", null, listFiles_callback_success, listFiles_callback_failure, null, useridStr, passwordStr);
    }
    else {
        alert("Please enter a url, then select the ListFiles button.");
    }
}

function listFiles_callback_success(envelope, response) 
{
    // The response is the HTML page of the URL in string format 
    // Parse the HTML string and extract the filenames
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = response; 

    var fileList = tempDiv.getElementsByTagName('A');

    var number = fileList.length;

    var url = document.getElementById('url').value;
    var urlStr = new String(url);

    var urlLen = urlStr.length;

    if (urlStr.charAt(urlLen - 1) != "/") {
        urlStr += "/";
    }

    var optionStr = '';

    for (var i = 0; i < number; i++) {
        var fileStr = new String(fileList[i]);

        // Only display the printable files
        if ((fileStr.indexOf(".pdf") != -1) ||
		    (fileStr.indexOf(".pcl") != -1) ||
		    (fileStr.indexOf(".ps") != -1) ||
		    (fileStr.indexOf(".prn") != -1) ||
		    (fileStr.indexOf(".xps") != -1) ||
		    (fileStr.indexOf(".txt") != -1)) 
        {

            var from = fileStr.lastIndexOf("/");

            var to = fileStr.length;

            var filename = fileStr.substring(from + 1, to);

            optionStr += "<option ";
            if (i == 0) {
                optionStr += "selected ";
            }

            optionStr += "value=\"" + urlStr + filename + "\">";
            optionStr += filename;
            optionStr += "</option>";
        }
    }

    document.getElementById("fileList").innerHTML = optionStr;
}

function listFiles_callback_failure(envelope, response, status) 
{
    var errMsg = "Status:" + status + " There was a problem accessing the server.";

    if (status == 404)
        errMsg = "404 Not Found: The requested resource could not be found.";
    else if (status == 401)
        errMsg = "401 Unauthorized: Authentication failed";
    else if (status == 400)
        errMsg = "400 Bad Request: The request cannot be fulfilled due to bad syntax.";

	writeSR3(errMsg, false);
    setTimeout("writeSR3('', false)", 10000);
}
    
