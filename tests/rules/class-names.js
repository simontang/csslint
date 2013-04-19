(function(){

  /*global YUITest, CSSLint*/
  var Assert = YUITest.Assert;

  YUITest.TestRunner.add(new YUITest.TestCase({

    name: "Class Name Errors",

    "Using underscores in a class name should result in a warning": function(){
      var result = CSSLint.verify("div.foo_bar[title]:hover  { }", { "class-names": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("Don't use underscores in class names.", result.messages[0].message);
    },
    
    "Using camelCase in a class name should result in a warning": function(){
      var result = CSSLint.verify("p#id.fooBar:hover { }", { "class-names": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("Don't use capital letters in class names.", result.messages[0].message);
    },
    
    "Beginning a class name with a hyphen should result in a warning": function(){
      var result = CSSLint.verify("p#id.-foo:hover { }", { "class-names": 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("Class names should begin with a letter.", result.messages[0].message);
    },
    
    "Using hyphens in a class name should not result in a warning": function(){
      var result = CSSLint.verify("a#id.foo-bar[title]:hover { }", { "class-names": 1 });
      Assert.areEqual(0, result.messages.length);
    }

  }));

})();
