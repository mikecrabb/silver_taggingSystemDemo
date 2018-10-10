function getGuidelines() {
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

        output += "<div class='card fluid'><h2><a href='singleGuideline.html?" + guidelineID + "'>" + guidelineUniqueName + "</a></h2><p><strong>Short Description:</strong> " + guidelineShortDesc + "</p><p><strong>Long Description: </strong>" + guidelinelongDesc + "</p><p><strong>Expected Outcome: </strong>" + guidelineExpectedOutcome + "</p><div id='guideline_methods_" + guidelineID + "'></div></div>";
        document.getElementById("guidelineContainer").innerHTML += output;
        getGuidelineMethods(guidelineID);
      }

    });

}

function getSingleGuideline(guidelineID) {
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

function getMethods() {
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

function getSingleMethod(methodID) {
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

function getGuidelineMethods(guidelineID) {
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

function getTagCategories() {
  var APILink = "https://silvertagapi.azurewebsites.net/api/categories";
  fetch(APILink)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // console.log(data);

      var output = "";
      for (var i in data) {
        var tagCategoryID = data[i]["tagCategoryID"];
        var tagCategoryName = data[i]["tagCategoryName"];
        output = "<div class='col-sm-4'><div class=card><div class='section dark'><h3>" + tagCategoryName + "</h3></div><div class='section' id='tagCategory_" + tagCategoryID + "'></div></div></div>"
        document.getElementById("tagCategories").innerHTML += output;
        getTagTitles(tagCategoryID)
      }
    });
}

function getTagTitles(categoryID) {
  var APILink = "https://silvertagapi.azurewebsites.net/api/categoryTags/" + categoryID;
  fetch(APILink)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // console.log(data);
      var output = "";
      for (var i in data) {
        var tagName = data[i]["tagName"];
        var tagID = data[i]["tagID"];

        output += "<p><input type='checkbox' id='tag_" + tagID + "' onclick='sortTaggedMethods()'>" + tagName + "</p>";
      }
      document.getElementById("tagCategory_" + categoryID).innerHTML += output;
    });
}


function sortTaggedMethods() {
  var tag = [];
  var methodArray = [];
  var APILink = "https://silvertagapi.azurewebsites.net/api/tags/";
  fetch(APILink)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // console.log(data);

      for (var i in data) {
        tag[i] = document.getElementById("tag_" + data[i]["tagID"]);
        document.getElementById("methodContainer").innerHTML = "";
        if (tag[i] != null) {

        if (tag[i].checked == true) {
          // console.log("tag " + data[i]["tagID"] + " is checked");
          // console.log(data[i]["tagID"]);
          // console.log(getTaggedMethods(data[i]["tagID"]));

          fetch("https://silvertagapi.azurewebsites.net/api/taggedMethods/" + data[i]["tagID"])
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              methodArray = methodArray.concat(data);
              return methodArray;
            })
            .then(function(originalArray) {
                   var newArray = [];
                   var lookupObject  = {};
                   var guidelineArray = [];

                   for (var i in originalArray) {
                     if (originalArray[i]["guidelineID"] == params[1])
                     guidelineArray.push(originalArray[i])
                     }

                   for(var i in guidelineArray) {
                      lookupObject[guidelineArray[i]["methodID"]] = guidelineArray[i];
                   }

                   for(i in lookupObject) {
                       newArray.push(lookupObject[i]);
                   }
                    return newArray;
            })
            .then(function(uniqueArray) {
              console.log(uniqueArray);
               var output = "";
              for (var i in uniqueArray) {
                var uniqueName = uniqueArray[i]["uniqueName"];
                var shortDesc = uniqueArray[i]["shortDesc"];
                var longDesc = uniqueArray[i]["longDesc"];
                var example = uniqueArray[i]["example"];
                var test = uniqueArray[i]["text"]

                output += "<div class='card fluid'><h2>" + uniqueName + "</h2><p><strong>Short Description:</strong> " + shortDesc + "</p><p><strong>Long Description: </strong>" + longDesc + "</p><p><strong>Example: </strong>" + example + "</p><p><strong>Test: "+ test +"</strong></p></div>";
                document.getElementById("methodContainer").innerHTML = output;

              }

              // PRINT OUT UNIQUE ELEMENTS HERE
              // I'm not sure if this is selecting all methods or just the one that relate to a given guideline.
            });
        }
      }
      }
    });
}
