### 1. DOM Selectors Difference

**What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?**  
**-** getElementById grabs one unique element by ID—fast and simple. getElementsByClassName pulls a live list of all elements with that class, updating as DOM changes. querySelector finds the first match with CSS-like selectors & querySelectorAll gets a static list of all matches, offering more power.

### 2. Creating and Inserting DOM Element

**How do you create and insert a new element into the DOM?**  
**-** Whip up an element with document.createElement('div'), tweak it (like element.innerHTML = 'text'), then slot it in via parent.appendChild(element) or insertAdjacentElement for spot control.

### 3. Event Bubbling

**What is Event Bubbling and how does it work?**  
**-** It's the event's upward climb: a click on a button fires there first, then ripples to parents like form > body. Handlers on ancestors catch it unless you call stopPropagation().

### 4. Event Delegation

**What is Event Delegation in JavaScript? Why is it useful?**  
**-** One listener on a parent snags child events via bubbling, using event.target to ID the source. It's gold for performance fewer listeners, handles added/removed elements seamlessly, perfect for dynamic lists.

### 5. preventDefault vs stopPropagation

**What is the difference between preventDefault() and stopPropagation() methods?**  
**-** preventDefault() nixes browser defaults (no link jump, no form submit). stopPropagation() halts the event's travel up/down the tree, keeping defaults but silencing siblings/parents.
