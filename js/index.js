const body = document.body;
const footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();
const copyright = document.createElement("p");

copyright.innerHTML = `Frida Calvo Huerta ${thisYear} \u00A9`;
footer.append(copyright);

let skills = [
  "JavaScript",
  "HTML",
  "CSS",
  "Java",
  "Python",
  "Figma",
  "Photoshop",
  "Lightroom",
  "Procreate",
  "Audacity",
];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  let skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}
