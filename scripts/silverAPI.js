function getGuidelines(){
  var APILink = "https://silvertagapi.azurewebsites.net/api/guidelines";
  fetch(APILink)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    var output = "";
    for (var i in data) {
      output = "";
      var guidelineID = data[i]["guidelineID"];
      var guidelineUniqueName = data[i]["uniqueName"];
      var guidelineShortDesc = data[i]["shortDesc"];
      var guidelinelongDesc = data[i]["longDesc"];
      var guidelineExpectedOutcome = data[i]["expectedOutcome"];

      output += "<div class='card fluid'><h2>" + guidelineUniqueName + "</h2><p><strong>Short Description:</strong> " + guidelineShortDesc + "</p><p><strong>Long Description: </strong>" + guidelinelongDesc + "</p><p><strong>Expected Outcome: </strong>" + guidelineExpectedOutcome + "</p><div id='guideline_methods_"+ guidelineID +"'></div></div>";
      document.getElementById("guidelineContainer").innerHTML += output;
      getGuidelineMethods(guidelineID);
    }

  });

}

function getSingleGuideline(guidelineID){
  var APILink = "https://silvertagapi.azurewebsites.net/api/guidelines/" + guidelineID;
  fetch(APILink)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // console.log(data);

    var output = "";
    for (var i in data) {
      var guidelineUniqueName = data[i]["uniqueName"];
      var guidelineShortDesc = data[i]["shortDesc"];
      var guidelinelongDesc = data[i]["longDesc"];
      var guidelineExpectedOutcome = data[i]["expectedOutcome"];

      output += "<div class='card fluid'><h2>" + guidelineUniqueName + "</h2><p><strong>Short Description:</strong> " + guidelineShortDesc + "</p><p><strong>Long Description: </strong>" + guidelinelongDesc + "</p><p><strong>Expected Outcome: </strong>" + guidelineExpectedOutcome + "</p></div>";
    }
    document.getElementById("guidelineContainer").innerHTML = output;
  });

}

function getMethods(){
  var APILink = "https://silvertagapi.azurewebsites.net/api/methods";
  fetch(APILink)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // console.log(data);

    var output = "";
    for (var i in data) {
      var methodUniqueName = data[i]["uniqueName"];
      var methodShortDesc = data[i]["shortDesc"];
      var methodlongDesc = data[i]["longDesc"];
      var methodExample = data[i]["expectedOutcome"];
      var methodTest = data[i]["test"];

      output += "<div class='card fluid'><h2>" + methodUniqueName + "</h2><p><strong>Short Description:</strong> " + methodShortDesc + "</p><p><strong>Long Description: </strong>" + methodlongDesc + "</p><p><strong>Example: </strong>" + methodExample + "</p><p><strong>Test: </strong>" + methodTest + "</p></div>";
    }
    document.getElementById("methodContainer").innerHTML = output;
  });

}

function getSingleMethod(methodID){
  var APILink = "https://silvertagapi.azurewebsites.net/api/methods" + methodID;
  fetch(APILink)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // console.log(data);

    var output = "";
    for (var i in data) {
      var methodUniqueName = data[i]["uniqueName"];
      var methodShortDesc = data[i]["shortDesc"];
      var methodlongDesc = data[i]["longDesc"];
      var methodExample = data[i]["expectedOutcome"];
      var methodTest = data[i]["test"];

      output += "<div class='card fluid'><h2>" + methodUniqueName + "</h2><p><strong>Short Description:</strong> " + methodShortDesc + "</p><p><strong>Long Description: </strong>" + methodlongDesc + "</p><p><strong>Example: </strong>" + methodExample + "</p><p><strong>Test: </strong>" + methodTest + "</p></div>";
    }
    document.getElementById("methodContainer").innerHTML = output;
      });
}

function getGuidelineMethods(guidelineID){
  var APILink = "https://silvertagapi.azurewebsites.net/api/guidelineMethods/" + guidelineID;
  fetch(APILink)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    var output = "<h3>Related Methods</h3><ul>";
    for (var i in data) {
      var methodUniqueName = data[i]["methodUniqueName"];
      var methodShortDesc = data[i]["methodShortDesc"];

    output += "<li>" + methodUniqueName + "</li>";
    }
    output += "</ul>"
    document.getElementById("guideline_methods_" + guidelineID).innerHTML = output;

  });
}
