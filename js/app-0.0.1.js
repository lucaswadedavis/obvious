$(document).ready(function(){
   app.c.init();
});

///////////////////////////////////////

app={m:{},v:{},c:{} };

///////////////////////////////////////

app.m.app_name="Obvious";

///////////////////////////////////////

app.c.init=function(){
    
    app.v.init();
};

///////////////////////////////////////

app.v.init=function(){
    app.v.LAYOUT();
    app.v.CSS();
    
};

app.v.LAYOUT=function(){
    var d="";
    d+="<h1>"+app.m.app_name+"<h1>";
    $("body").html(d);
    document.title=app.m.app_name;
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
    }
  };
  
  return css;
};