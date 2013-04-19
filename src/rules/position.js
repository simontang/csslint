/*
 * Rule: Certain properties don't play well with certain display values. 
 * - float should not be used with inline-block
 * - height, width, margin-top, margin-bottom, float should not be used with inline
 * - vertical-align should not be used with block
 * - margin, float should not be used with table-*
 */
/*global CSSLint*/
CSSLint.addRule({

  //rule information
  id: "position",
  name: "Disallow properties inappropriate for unpositioned elements",
  desc: "Top, bottom, right, and left shouldn't be used with unpositioned elements.",
  browsers: "All",

  //initialization
  init: function(parser, reporter){
    var rule = this,
      reportRule,
      startRule,
      endRule,
      properties,
      propertiesToCheck = {
        position: true,
        top: true,
        bottom: true,
        right: true,
        left: true,
      };
      
    reportRule = function(name) {
      reporter.report("The '" + name + "' property cannot be used on unpositioned elements.", properties[name].line, properties[name].col, rule);          
      
    }
    
    startRule = function () {
      properties = {};
    };

    endRule = function () {
   
      // Is this rule un positioned or position static
      if (!properties.position || (properties.position && properties.position.value.toLowerCase() === 'static') ) {
        
        if (properties.top) {
          reportRule('top');
        }
        
        if (properties.bottom) {
          reportRule('bottom');
        }
        
        if (properties.left) {
          reportRule('left');
        }
        
        if (properties.right) {
          reportRule('right');
        }
      }
    };

    parser.addListener("startrule", startRule);
    parser.addListener("startfontface", startRule);
    parser.addListener("startkeyframerule", startRule);
    parser.addListener("startpagemargin", startRule);
    parser.addListener("startpage", startRule);

    parser.addListener("property", function(event){
      var name = event.property.text.toLowerCase();

      if (propertiesToCheck[name] === true){
        properties[name] = { value: event.value.text, line: event.property.line, col: event.property.col };            
      }
    });

    parser.addListener("endrule", endRule);
    parser.addListener("endfontface", endRule);
    parser.addListener("endkeyframerule", endRule);
    parser.addListener("endpagemargin", endRule);
    parser.addListener("endpage", endRule);

  }
});