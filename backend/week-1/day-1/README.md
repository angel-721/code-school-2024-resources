### Declare a Variable
<table>
<tr>
<th>Python</th>
<th>JavaScript</th>
</tr>
<tr>
<td>

```python
# print Hello World
print("Hello World")
nums = [1,2,3]
```
</td>
<td>

```JavaScript
// declare a variable in JavaScript using the let keyword
let name = "Angel";
let nums = [1,2,3];
```
</td>
</table>

### Print Hello World
<table>
<tr>
<th>Python</th>
<th>JavaScript</th>
</tr>
<tr>
<td>

```python
# print Hello World
print("Hello World")
```
</td>
<td>

```JavaScript
// in JavaScript we console.log("Hello World")
console.log("Hello World");
```
</td>
</table>

### For Loop
<table>
<tr>
<th>Python</th>
<th>JavaScript</th>
</tr>
<tr>
<td>

```python
# loop through 0 up to 9 and print the number
for i in range(0, 10):
    print("Number:", i)
```
</td>
<td>

```JavaScript
// loop through 0 up to 9 and print the number
for (let i = 0; i < 10; i++) {
  console.log("Number:", i);
}
// notice that JavaScript needs {} to make blocks for scopes
```
</td>
</table>

### if-statements
<table>
<tr>
<th>Python</th>
<th>JavaScript</th>
</tr>
<tr>
<td>

```python
if 1 > 2:
    print("one is greater than 2")
```
</td>
<td>

```JavaScript
// notice that the case needs to be inside () and the following
// code should be in {} block
if (1 > 2) {
  console.log("1 is greater than two");
}
// notice that JavaScript needs {} to make blocks for scopes
```
</td>
</table>

### Boolean-logic
<table>
<tr>
<th>Python</th>
<th>JavaScript</th>
</tr>
<tr>
<td>

```python
true_and_false = True and False
true_or_false = True and False
```
</td>
<td>

```JavaScript
let true_and_false = true && false;
let true_or_false = true || false;
```
</td>
</table>


### If-else logic
<table>
<tr>
<th>Python</th>
<th>JavaScript</th>
</tr>
<tr>
<td>

```python
# if else
num = "1"
if 1 == num:
  print("Num is equal to 1")
else: 
  print("Num is not equal to 1")e
```
</td>
<td>

```JavaScript
let num = "1";
if (1 == num) {
  console.log("Num is equal to 1");
} else {
  console.log("Num is not equal to 1");
}
```
<small> What does the above code print?</small>
</td>
</table>

### Functions
<table>
<tr>
<th>Python</th>
<th>JavaScript</th>
</tr>
<tr>
<td>

```python
def addTwoNumbers(x,y):
    return x + y
```
</td>
<td>

```JavaScript
function addTwoNumbers(x, y) {
  return x + y;
}
```
<small> we will use another way to declare functions in JavaScript</small>
</td>
</table>

### JSON - JavaScript Object Notation
<table>
<tr>
<th>Python</th>
<th>JavaScript</th>
</tr>
<tr>
<td>

```python
# dictionaries
student = {
    "name": "Angel",
    "age": 21
}

print(student["name"])
```
</td>
<td>

```JavaScript
let student = {
  name: "Angel",
  age: 21,
};

console.log(student.name);
```
</td>
</table>


### JavaScript Arrow Functions
<table>
<tr>
<th>Function Key Word</th>
<th>Arrow Function</th>
</tr>
<tr>
<td>

```JavaScript
function addTwoNumbers(x, y) {
  return x + y;
}
```
❌ 🤮
</td>
<td>

```JavaScript
let addTwoNumbers = (x, y) => {
  return x + y;
};
```
