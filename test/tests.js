require(['selector-generator'], function(sg) {

	test("it works", function() {
		var testDiv = document.createElement('div');
		testDiv.setAttribute('id', 'qunit-fixture');

		testDiv.innerHTML = "<p>zomg</p>";

		document.body.appendChild(testDiv);

		var textNode = testDiv.childNodes[0].childNodes[0];

		equal(textNode.nodeType, 3, "Precond: We have found the textNode");
		
		var result = sg.generate(textNode);
		equal(result.selector, "html > body > div:nth-of-type(2) > p", "The selector is properly generated");
		equal(document.querySelector(result.selector), textNode.parentNode, "The selector located the proper element");
		equal(sg.find(result), textNode, "The text node was properly located");
	});

});