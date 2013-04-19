/*
 * Rule: Class names should begin with a letter and should only contain lowercase letters and hyphens.
 */
/*global CSSLint*/
CSSLint.addRule({

  //rule information
  id: "class-names",
  name: "Class names should begin with a letter and should only contain lowercase letters and hyphens.",
  desc: "Class names should begin with a letter and should only contain lowercase letters and hyphens.",
  browsers: "All",

  //initialization
  init: function(parser, reporter){
	  var rule = this;
	  parser.addListener("startrule", function(event){
		  var selectors = event.selectors,
			  selector,
			  part,
			  modifier,
			  i, j, k;

		  for (i = 0; i < selectors.length; i++){
		    
			  selector = selectors[i];
			  idCount = 0;

			  for (j = 0; j < selector.parts.length; j++){
				  
				  part = selector.parts[j];
				  if (part.type === parser.SELECTOR_PART_TYPE){
					  
					  for (k = 0; k < part.modifiers.length; k++){
						  
						  modifier = part.modifiers[k];
						  if (modifier.type === "class") {
						    
						    // don't use underscores
						    if (modifier.text.indexOf('_') !== -1) {
						      reporter.report("Don't use underscores in class names.", modifier.line, modifier.col, rule);
						    }
						    
						    // don't use uppercase letters
						    if (/[A-Z]/.test(modifier.text) === true) {
						      reporter.report("Don't use capital letters in class names.", modifier.line, modifier.col, rule);
						    }
						    
						    // don't being a class name with anything other than a lowercase letter
						    if (/^\.[^a-z]/i.test(modifier.text) === true) {
						      reporter.report("Class names should begin with a letter.", modifier.line, modifier.col, rule);
						    }
						  }
					  }
				  }
			  }
		  }
	  });
  }
});