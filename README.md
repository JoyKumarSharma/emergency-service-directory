Ans no 1=
getElementById("id")= it select element by unique ID.always return 1 element.
querySelector("css selector")= it return the first element which is matched.
querySelectorAll("css selector")= returns all matched element.nodelist kore dey.

ans no2=
 to create and insert a new element into the DOM first we need to creat eleent like div,p,li than add content by document.createElement("tagName")- we add text or content in this, then insert them into last of or end of parent, we use this= parent.insertBefore(newEl, existingEl); to add before any existing element. parent.append() / prepend()= to add more than one node or text.
example from chatgpt= <div id="container"></div>

<script>
  // Step 1: Create element
  let newEl = document.createElement("p");

  // Step 2: Add text
  newEl.textContent = "Hello, I am new!";

  // Step 3: Insert into DOM
  let parent = document.getElementById("container");
  parent.appendChild(newEl);  // container div এর ভিতরে ঢুকে যাবে
</script>

answer no 3:
Event Bubbling = when event happen in child element, it first trigger in child then goes up step by step to parent -> grandparent -> document.
In simple, event bubble up from small (child) to big (parent) in DOM tree.

ans no 4:
Event Delegation = instead of adding event listener to every child, we add single event listener to parent and catch events when they bubble up from child.
It is useful because it saves memory,less code and works for dynamically added elements also.
######
demo code from chatgpt= <!DOCTYPE html>
<html>
<head>
  <title>Event Delegation Demo</title>
</head>
<body>

<h2>Button List</h2>
<div id="button-container">
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
</div>

<script>
  // Parent এ click listener add করা হল
  const container = document.getElementById("button-container");

  container.addEventListener("click", function(event) {
    // Check করা হচ্ছে clicked element কি button
    if(event.target.tagName === "BUTTON") {
      alert("আপনি click করেছেন: " + event.target.innerText);
    }
  });

  // নতুন button dynamically add করা
  const newBtn = document.createElement("button");
  newBtn.textContent = "Button 4";
  container.appendChild(newBtn); // Event listener automatically কাজ করবে
</script>

</body>
</html>


Answer no 5:
preventDefault() = browser এর default action stop করে, like link click বা form submit।
stopPropagation() = event bubbling stop করে, child click হলে parent এ event না যায়। means to not refresh or reload the page if user click or creat any event just shift to the another page,previous oage remain same,