// Query the Document

// We store the p-tag element as a JavaScript Object
// <p id="my-name">Angel</p>
let p_tag_with_id_of_my_name = document.querySelector("#my-name");

// We can now look at the object
console.log(p_tag_with_id_of_my_name);
console.log(p_tag_with_id_of_my_name.textContent);

// Again let's query the document
// let's mix it up and use another method to query the document
// <button id="button">Print Name to console</button>
let button_with_id_of_button = document.getElementById("button");

button_with_id_of_button.onclick = () => {
  alert("You have pressed the button");
};

// now let's make a HTML tag from javascript
// it will look like <h2 id="header2">hi</h2>
let newHeader2 = document.createElement("h2");
newHeader2.id = "header-2";
newHeader2.textContent = "hi";

// let's now add this to our body tag as a child of it!
document.body.appendChild(newHeader2);
