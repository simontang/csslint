(function(){

  /*global YUITest, CSSLint*/
  var Assert = YUITest.Assert;

  YUITest.TestRunner.add(new YUITest.TestCase({

    name: "Non-semantic Selector Errors",

    "Using a DIV type selector in a multi-selector rule should result in one warning": function(){
      var result = CSSLint.verify(".foo div { }", { "non-semantic-selectors": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("Don't use non-semantic type selectors (DIV or SPAN) in any multi-part rule.", result.messages[0].message);
    },
    
    "Using a DIV type selector in a single-part rule should not result in a warning": function(){
      var result = CSSLint.verify("div { }", { "non-semantic-selectors": 1 });
      Assert.areEqual(0, result.messages.length);
    },

    "Using a SPAN type selector in a multi-selector rule should result in one warning": function(){
      var result = CSSLint.verify(".foo span .bar[name] { }", { "non-semantic-selectors": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("Don't use non-semantic type selectors (DIV or SPAN) in any multi-part rule.", result.messages[0].message);
    },
    
    "Using a SPAN type selector in a single-part rule should not result in a warning": function(){
      var result = CSSLint.verify("span { }", { "non-semantic-selectors": 1 });
      Assert.areEqual(0, result.messages.length);
    },

  }));

})();
