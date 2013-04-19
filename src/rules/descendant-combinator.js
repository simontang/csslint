/*
 * Rule: Don't use non-semantic type selectors in any multi-part rule.
 */
/*global CSSLint*/
CSSLint.addRule({

  //rule information
  id: "descendant-combinator",
  name: "Don't use non-semantic type selectors in any multi-part rule.",
  desc: "Creating rules with non-semantic type selectors (DIV or SPAN) usually ends up applying to more element than you can easily manage.",
  browsers: "All",

  //initialization
  init: function(parser, reporter){
    var rule = this;
    
    parser.addListener("startrule", function(event){
          
      var selectors = event.selectors,
        selector,
        combinator,
        prevSelector,
        nextSelector,
        i, j;
              
      for (i = 0; i < selectors.length; i++) {
        selector = selectors[i];
        
        // ignore rules with only 1 selector
        if (selector.parts.length > 1) {
          
          for (j = 0; j < selector.parts.length; j++) {
            
            if (selector.parts[j].type === 'descendant') {
              
              combinator = selector.parts[j];
              prevSelector = selector.parts[j-1];
              nextSelector = selector.parts[j+1];
              
              // if the selector before or after the combinator is a type selector with no modifiers
              if ( (prevSelector.elementName && prevSelector.modifiers.length === 0) || (nextSelector.elementName && nextSelector.modifiers.length === 0) ) {
                reporter.report("Only use a descendant combinator if it's between two non-type selectors.", combinator.line, combinator.col, rule);
              }
            }
          }
        }
      }
    });
  }
});