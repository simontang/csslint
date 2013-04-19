/*
 * Rule: Don't use more than 2 combinators in a selector, doing so is most likely for specificity purposes rather than styling necessity.
 */
/*global CSSLint*/
CSSLint.addRule({

  //rule information
  id: "selector-length",
  name: "Don't use more than 2 combinators in a selector.",
  desc: "Don't use more than 2 combinators in a selector, doing so is most likely for specificity purposes rather than styling necessity.",
  browsers: "All",

  //initialization
  init: function(parser, reporter){
    var rule = this;
    
    parser.addListener("startrule", function(event){
          
      var selectors = event.selectors,
        selector,
        i;
              
      for (i = 0; i < selectors.length; i++) {
        selector = selectors[i];  
        if (selector.parts.length > 5) {
          reporter.report("Don't use more than 2 combinators in a selector, doing so is most likely for specificity purposes rather than styling necessity.", selector.line, selector.col, rule);
        }
      }
    });
  }
});