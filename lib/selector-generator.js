define('selector-generator', [], function() {
	function childNodeIndexOf(parentNode, childNode) {
		var childNodes = parentNode.childNodes;
		for (var i = 0, l = childNodes.length; i < l; i++) {
			if (childNodes[i] === childNode) { return i; }
		}
	}

	function computedNthIndex(childElement) {
		var childNodes = childElement.parentNode.childNodes,
			tagName = childElement.tagName,
			elementsWithSameTag = 0;

		for (var i = 0, l = childNodes.length; i < l; i++) {
			if (childNodes[i] === childElement) { return elementsWithSameTag + 1; }
			if (childNodes[i].tagName === tagName) { elementsWithSameTag++; }
		}
	}

	function generate(node) {
		var textNodeIndex = childNodeIndexOf(node.parentNode, node),
			currentNode = node,
			tagNames = [];

		while (currentNode) {
			var tagName = currentNode.tagName;

			if (tagName) {
				var nthIndex = computedNthIndex(currentNode);
				var selector = tagName;

				if (nthIndex > 1) {
					selector += ":nth-of-type(" + nthIndex + ")";
				}

				tagNames.push(selector);
			}

			currentNode = currentNode.parentNode;
		}

		return {selector: tagNames.reverse().join(" > ").toLowerCase(), childNodeIndex: textNodeIndex};
	}

	function find(result) {
		var element = document.querySelector(result.selector);
		if (!element) { throw new Error('Unable to find element with selector: ' + result.selector); }
		return element.childNodes[result.childNodeIndex];
	}

	return {generate: generate, find: find};
});