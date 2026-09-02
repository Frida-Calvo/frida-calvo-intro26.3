// Insert the copyright logo, current year, and name in the footer

const body = document.body;
const footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();
const copyright = document.createElement("p");

copyright.innerHTML = `\u00A9 Frida Calvo Huerta ${thisYear}`;
footer.append(copyright);

//  Using an array, insert the array items as a list of skills in the skills section

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

// Message form section
const messageForm = document.querySelector('form[name="leave_message"]');
const messageSection = document.getElementById("messages");
const messageList = messageSection.querySelector("ul");

//  Conditionally render the messages header and section of index.html (show it if there are messages, hide it if none)
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

  // Handle the event listener on the message form to convert form inputs into the author's name as a clickable link & display message
  newMessage.innerHTML = `<a href="mailto:${userEmail}">${userName}</a><span>${userMessage}</span>`;

  // Provide a remove button to delete the message
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

  // Provide an edit button to change message form field
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

// Using API fetch, insert the names of your GitHub repositories in the projects section of index.html

//using async-await version
async function getGithubRepos() {
  try {
    const response = await fetch(
      " https://api.github.com/users/Frida-Calvo/repos",
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    const repositories = await response.json();
    console.log(repositories);
    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");
    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li");
      project.innerText = repositories[i].name;
      projectList.append(project);
    }
  } catch (error) {
    console.error(error);
  }
}

// getGithubRepos();

//using fetch & then version
fetch(" https://api.github.com/users/Frida-Calvo/repos")
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then((repo) => {
    const repositories = repo;
    console.log(repositories);

    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");
    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li");
      project.innerText = repositories[i].name;
      projectList.append(project);
    }
  })
  .catch((error) => console.error(error));

// (OPTIONAL) Provide additional information about each repository

// (OPTIONAL) Make the repository names clickable links that redirect the user to that repository page
