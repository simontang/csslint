/*
 * Rule: Don't use non-semantic type selectors in any multi-part rule.
 */
/*global CSSLint*/
CSSLint.addRule({

  //rule information
  id: "non-semantic-selectors",
  name: "Don't use non-semantic type selectors in any multi-part rule.",
  desc: "Creating rules with non-semantic type selectors (DIV or SPAN) usually ends up applying to more element than you can easily manage.",
  browsers: "All",

  //initialization
  init: function(parser, reporter){
    var rule = this;
    
    parser.addListener("startrule", function(event){
          
      var selectors = event.selectors,
        selector,
        part,
        combinator,
        i, j, k;
              
      for (i = 0; i < selectors.length; i++) {
        selector = selectors[i];
        
        // ignore rules with only 1 selector
        if (selector.parts.length > 1) {
          
          for (j = 0; j < selector.parts.length; j++) {
            
            part = selector.parts[j];
            if (part.type === parser.SELECTOR_PART_TYPE) {

              // if this is just a type selector
              if (part.modifiers.length === 0) {
                
                if (part.elementName && (part.elementName.text.toLowerCase() === 'div' || part.elementName.text.toLowerCase() === 'span')) {
                  reporter.report("Don't use non-semantic type selectors (DIV or SPAN) in any multi-part rule.", part.elementName.line, part.elementName.col, rule);
                }
              }
            }
          }
        }
      }
    });
  }
});