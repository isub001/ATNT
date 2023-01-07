const ul = document.querySelector("ul"),
absentCount = document.querySelector("#absent");
tagNumb = document.querySelector(".details span");
const link = document.getElementById('link');
const form = document.querySelector('form');

tags = ["65", "111"];
let formData = {};

countTags();
createTag();

function countTags(){
    //absentCount.focus();
    tagNumb.innerText = tags.length;
}

function createTag(){
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag =>{
        let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
    countTags();
    update();
}

function remove(element, tag){
    let index  = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
    countTags();
    update();
}

function addTag(e){
    if(e.key == "Enter"){
        let tag = e.target.value.replace(/\s+/g, '');
        if(tag.length >= 1 && !tags.includes(tag)){
            tag.split(',').forEach(tag => {
                tags.push(tag);
                createTag();
                update();
            });
        }
        e.target.value = "";
    }
}

function updateDataToObject(prop, value){
    if (formData.hasOwnProperty(prop)) {
        formData[prop] = value;
    } else {
        formData[prop] = value;
    }
}

function objToString(obj){
    let formText1 = "";
    let formText2 = "";
    for (const key in obj) {
        if (key === "Name" && key === "Hour-date") {
            formText1 += `${key}: ${obj[key]} `
        } else {
            formText2 += ` ${key}: ${obj[key]}`
        }
    }
    //console.log(`${formText1}\n${formText2}`);

    return [formText1,formText2];

}

function update(){
    let absentees = "";
    let encodedText = "";
    let finalText = "";
    let finalFormText1 = "";
    let finalFormText2 = "";
    absentees = tags.join(" - ");
    [finalFormText1, finalFormText2] = objToString(formData);
    //console.log(finalFormText);

    finalText = `${finalFormText1}\r\n${finalFormText2}\n${absentees}\n[Total:${tags.length}]`;
    encodedText = encodeURIComponent(finalText);
    link.href = `http://api.callmebot.com/text.php?source=web&user=@math_jr10&text=${encodedText}`;
}


const removeBtn = document.querySelector(".details button");
removeBtn.addEventListener("click", () =>{
    tags.length = 0;
    ul.querySelectorAll("li").forEach(li => li.remove());
    countTags();
});

form.addEventListener('change', (event) => {
    const element = event.target;
    const name = element.name;
    const value = element.value;
    updateDataToObject(name, value);
    //console.log(formData);
    //console.log(`${name}: ${value}`);


  });   

  