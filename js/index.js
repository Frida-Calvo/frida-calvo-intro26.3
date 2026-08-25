const body = document.body;
const footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();
const copyright = document.createElement("p");

copyright.innerHTML = `\u00A9 Frida Calvo Huerta ${thisYear}`;
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

const messageForm = document.querySelector('form[name="leave_message"]');

const messageSection = document.getElementById("messages");
const messageList = messageSection.querySelector("ul");

function checkMessageListCount() {
  if (messageList.childElementCount > 0) {
    console.log(messageList.childElementCount);
    messageSection.hidden = false;
  } else {
    messageSection.hidden = true;
    console.log(messageSection.hidden);
  }
}

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const userName = event.target.usersName.value;
  const userEmail = event.target.usersEmail.value;
  const userMessage = event.target.usersMessage.value;
  console.log(userName, userEmail, userMessage);

  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:${userEmail}">${userName}</a><span>${userMessage}</span>`;

  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.classList.toggle("remove");
  removeButton.setAttribute("type", "button");

  removeButton.addEventListener("click", () => {
    const entry = removeButton.parentNode;
    entry.remove();
    checkMessageListCount();
  });
  newMessage.append(removeButton);

  messageList.append(newMessage);

  checkMessageListCount();

  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.classList.toggle("edit");
  editButton.setAttribute("type", "button");

  editButton.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const editContent = button.parentNode;

    // console.log(button.textContent);

    if (button.textContent === "edit") {
      const span = editContent.querySelector("span");
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      editContent.replaceChild(input, span);
      // console.log(button.textContent);

      // change edit button to save button
      button.textContent = "save";
      // editButton.classList.toggle("save");
      editButton.classList.remove("edit");
      editButton.classList.add("save");
    } else if (button.textContent === "save") {
      const input = editContent.querySelector("input");
      const span = document.createElement("span");
      span.textContent = input.value;
      editContent.replaceChild(span, input);
      // console.log(button.textContent);

      //change save button back to edit button
      button.textContent = "edit";
      // editButton.classList.toggle("edit");
      editButton.classList.remove("save");
      editButton.classList.add("edit");
    }
  });

  newMessage.append(editButton);

  event.currentTarget.reset();
});
