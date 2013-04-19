(function(){

  /*global YUITest, CSSLint*/
  var Assert = YUITest.Assert;

  YUITest.TestRunner.add(new YUITest.TestCase({

    name: "Position Errors",

    "Using 'top' with an unpositioned element should result in a warning": function(){
      var result = CSSLint.verify(".foo { top:10px; position:static; }", { "position": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("The 'top' property cannot be used on unpositioned elements.", result.messages[0].message);
    },

    "Using 'bottom' with an unpositioned element should result in a warning": function(){
      var result = CSSLint.verify(".foo { bottom:10px; position:STATIC; }", { "position": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("The 'bottom' property cannot be used on unpositioned elements.", result.messages[0].message);
    },
    
    "Using 'right' with an unpositioned element should result in a warning": function(){
      var result = CSSLint.verify(".foo { right:10px; }", { "position": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("The 'right' property cannot be used on unpositioned elements.", result.messages[0].message);
    },
    
    "Using 'left' with an unpositioned element should result in a warning": function(){
      var result = CSSLint.verify(".foo { width:auto; height:auto; left:10px; }", { "position": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("The 'left' property cannot be used on unpositioned elements.", result.messages[0].message);
    },

    "Using 'top' with a positioned element should not result in a warning": function(){
      var result = CSSLint.verify(".foo { top:10px; position:fixed; }", { "position": 1 });
      Assert.areEqual(0, result.messages.length);
    },
    
    "Using 'bottom' with a positioned element should not result in a warning": function(){
      var result = CSSLint.verify(".foo { bottom:10px; position:absolute; }", { "position": 1 });
      Assert.areEqual(0, result.messages.length);
    },
    
    "Using 'right' with a positioned element should not result in a warning": function(){
      var result = CSSLint.verify(".foo { right:10px; position:absolute; }", { "position": 1 });
      Assert.areEqual(0, result.messages.length);
    },
    
    "Using 'left' with a positioned element should not result in a warning": function(){
      var result = CSSLint.verify(".foo { left:10px; position:relative; }", { "position": 1 });
      Assert.areEqual(0, result.messages.length);
    }

  }));

})();
        