import { User } from "../models/interfaceUser";
import { Err } from "../models/interfaceErr";

const url = "https://api.github.com/users";

const users: User[] = [];

function findUserByLogin(login: string) {
  return users.find((u) => u.login === login) ?? false;
}

async function getUser(username: string) {
  try {
    const response = await fetch(`${url}/${username}`);

    if (!response.ok) {
      throw new Error("Not Found!");
    }

    return await response.json();
  } catch (err) {
    return { message: err.message };
  }
}

function promptValidateUser() {
  try {
    const user = prompt("Insira um usuário do GitHub:");

    if (!user) {
      throw new Error("Campo vazio!");
    }

    return user;
  } catch (err) {
    alert(err.message);
  }
}

function addUser(user: User) {
  const userExists = users.filter((u) => u.login === user.login);

  if (userExists.length !== 0) {
    alert("Usuário já está armazenado na lista!");
    return;
  }

  users.push(user);
  alert("Usuário cadastrado com sucesso!");
}

async function saveUser() {
  const user = promptValidateUser();

  if (!user) {
    return;
  }

  const userDetails: User | Err = await getUser(user);

  if ("message" in userDetails) {
    alert(userDetails.message);
  } else {
    const user = {
      id: userDetails.id,
      login: userDetails.login,
      name: userDetails.name,
      bio: userDetails.bio,
      public_repos: userDetails.public_repos,
      repos_url: userDetails.repos_url,
    };

    addUser(user);
  }
}

function imprimeUsers() {
  let usersInformations: string = "";

  if (users.length === 0) {
    alert("Sem usuários para exibir");
    return;
  }

  users.forEach((user) => {
    usersInformations += `
    Id: ${user.id}
    Login: ${user.login}
    Nome: ${user.name}
    Biografia: ${user.bio}
    Repositórios públicos: ${user.public_repos}
    Link dos repositórios: ${user.repos_url}
    `;
  });

  console.log(usersInformations);
}

function topFiveUsers() {
  let usersInformations: string = "";
  const topUsers: object[] = [];

  if (users.length === 0) {
    alert("Sem usuários para exibir!");
    return;
  }

  let usersList = [...users];

  usersList.sort((a, b) => b.public_repos - a.public_repos);

  usersList.forEach((user: User, index: number) => {
    if (index < 5) {
      topUsers.push(user);
    } else {
      console.log(1);
      return;
    }
  });

  topUsers.forEach((user: User, index: number) => {
    usersInformations += `
    Top ${index + 1}: ${user.login}
    Quantidade de repositórios públicos: ${user.public_repos}
    `;
  });

  console.log(usersInformations);
}

export { topFiveUsers, imprimeUsers, saveUser, promptValidateUser, findUserByLogin, users };
