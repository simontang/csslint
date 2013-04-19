(function(){

  /*global YUITest, CSSLint*/
  var Assert = YUITest.Assert;

  YUITest.TestRunner.add(new YUITest.TestCase({

    name: "Descendant Combinator Errors",

    "Using a descendant combinator between two type selectors should result in a warning": function(){
      var result = CSSLint.verify("p p { }", { "descendant-combinator": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("Only use a descendant combinator if it's between two non-type selectors.", result.messages[0].message);
    },

    "Using a descendant combinator before a type selector should result in a warning": function(){
      var result = CSSLint.verify(".foo p > input[type='text'] { }", { "descendant-combinator": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("Only use a descendant combinator if it's between two non-type selectors.", result.messages[0].message);
    },
    
    "Using a descendant combinator after a type selector should result in a warning": function(){
      var result = CSSLint.verify("label .bar { }", { "descendant-combinator": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("Only use a descendant combinator if it's between two non-type selectors.", result.messages[0].message);
    },
    
    "Using a descendant combinator between non-type selectors should not result in a warning": function(){
      var result = CSSLint.verify(".foo .bar ul.class { }", { "descendant-combinator": 1 });
      Assert.areEqual(0, result.messages.length);
    }

  }));

})();
