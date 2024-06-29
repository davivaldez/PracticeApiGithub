import { PublicRepo } from "../models/interfacePublicRepo";
import { promptValidateUser } from "./user";
import { findUserByLogin } from "./user";
import { users } from "./user";

async function getRepos(reposUrl: string) {
  try {
    const response = await fetch(reposUrl);

    if (!response.ok) {
      throw new Error("Not Found!");
    }

    return await response.json();
  } catch (err) {
    return { message: err.message };
  }
}

async function showInformationsRepos() {
  let reposInformations: string = "";

  const userLogin = promptValidateUser();

  if (!userLogin) {
    return;
  }

  const userExists = findUserByLogin(userLogin);

  if (!userExists) {
    alert("Usuário ainda não foi salvo!");
    return;
  }

  if (userExists.public_repos === 0) {
    alert("O usuário não tem nenhum repositório para ser visualizado.");
    return;
  }

  const publicRepos: PublicRepo[] = await getRepos(userExists.repos_url);

  publicRepos.forEach((repo) => {
    reposInformations += `
    Dono: ${userExists.login}
    Repositório: ${repo.name}
    Descrição: ${repo.description}
    Fork: ${repo.fork ? "Sim" : "Não"}
    Estrelas: ${repo.stargazers_count}
    `;
  });

  console.log(reposInformations);
}

function sumPublicRepos() {
  let totalRepos: number = 0;
  if (users.length === 0) {
    alert("Sem repositórios para exibir");
    return;
  }

  users.forEach((user) => (totalRepos += user.public_repos));
  alert(totalRepos);
}

export { sumPublicRepos, showInformationsRepos };
