$(document).ready(function(){
   app.c.init();
});

///////////////////////////////////////

app={m:{},v:{},c:{} };

///////////////////////////////////////

app.m.app_name="Obvious";
app.m.raw_data=false;

///////////////////////////////////////

app.c.init=function(){
    
    app.v.init();
};


app.c.csv_to_array=function( strData, strDelimiter ){
// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
};

///////////////////////////////////////

app.v.init=function(){
    app.v.LAYOUT();
    app.v.CSS();
    app.v.LISTENERS();
};

app.v.LAYOUT=function(){
    var d="";
    d+="<h1>"+app.m.app_name+"</h1>";
    d+="<table id='data-table'></table>";
    d+="<textarea rows='20'></textarea>";
    d+="<input type='button' value='parse' id='parse-button'></input>";

    $("body").html(d);
    document.title=app.m.app_name;
};

app.v.DATA_TABLE=function(data){
    var d={columns:[],data:[]};
    for (var i=0;i<data[0].length;i++){
        d.columns.push({title:data[0][i]});
    }
    for (var i=1;i<data.length;i++){
        if (data[i].length==d.columns.length){
            d.data.push(data[i]);
        }
    }
    
    $("#data-table").dataTable(d);
};

app.v.LISTENERS=function(){
    $("body").on("click","input#parse-button",function(){
       app.v.DATA_TABLE(app.c.csv_to_array($("textarea").val() ) ); 
    });
};

///////////////////////////////////////

app.v.CSS=function(){
    if ($("head style#synthetic").length==0){
        $("head").append("<style type='text/css' id='synthetic'></style>");
    }
    $("style#synthetic").html(app.v.json_to_css(app.v.css_config() ) );
};

app.v.json_to_css=function(x){
    var d="";
    for (var selector in x){
        d+=selector+"{";
        for (var attribute in x[selector]){
            d+=attribute+":"+x[selector][attribute]+";";
        }
        d+="} "
    }
        
    return d;
};

app.v.css_config=function(){
  var css={
    "body":{
        "font-size":"3em"
    },
    "h1":{
        "text-align":"center"
    },
    "table":{
      "width":"100%"  
    },
    "th":{
      "cursor":"pointer"  
    },
    "td":{
      "border":"1px solid #000",
      "padding":"10px"
    },
    ".datatables_filter":{
        "text-align":"right",
        "font-size":"0.5em"
    },
    ".dataTables_length":{
      "font-size":"0.5em"
    },
    ".datatables_info":{
      "font-size":"0.8em",
      "text-align":"right"
    },
    "textarea":{
        "width":"100%"
    }
  };
  
  return css;
};