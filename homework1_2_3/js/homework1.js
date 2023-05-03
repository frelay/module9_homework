// Задание 1
const parser = new DOMParser();
const xmlString = `
<list>
    <student>
        <name lang="en">
            <first>Ivan</first>
            <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Петр</first>
            <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
</list>`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const students = xmlDOM.querySelectorAll("student");

const list = [];

students.forEach((student) => {
    const studentNameNode = student.querySelector("name");
    const studentFirstName = student.querySelector("first");
    const studentSecondName = student.querySelector("second");
    const studentAge = student.querySelector("age");
    const studentProf = student.querySelector("prof");
    const studentLang = studentNameNode.getAttribute("lang");

    const studentObj = {
        name:
            studentFirstName.textContent + " " + studentSecondName.textContent,
        age: studentAge.textContent,
        prof: studentProf.textContent,
        lang: studentLang,
    };

    list.push(studentObj);
});

const result = { list };

console.log(result);
