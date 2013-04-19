(function(){

  /*global YUITest, CSSLint*/
  var Assert = YUITest.Assert;

  YUITest.TestRunner.add(new YUITest.TestCase({

    name: "Selector Length Errors",

    "Using more than 2 combinators should result in a warning": function(){
      var result = CSSLint.verify(".foo p > input[type='text'] span { }", { "selector-length": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("Don't use more than 2 combinators in a selector, doing so is most likely for specificity purposes rather than styling necessity.", result.messages[0].message);
    },
        
    "Using 2 combinators should not result in a warning": function(){
      var result = CSSLint.verify(".foo .bar ul.class { }", { "selector-length": 1 });
      Assert.areEqual(0, result.messages.length);
    },

    "Using fewer than 2 combinators should not result in a warning": function(){
      var result = CSSLint.verify("div { }", { "selector-length": 1 });
      Assert.areEqual(0, result.messages.length);
    }

  }));

})();
