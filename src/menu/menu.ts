import { saveUser } from "../users/user";
import { showInformationsRepos } from "../users/repo";
import { imprimeUsers } from "../users/user";
import { sumPublicRepos } from "../users/repo";
import { topFiveUsers } from "../users/user";

async function iniatializeMenu() {
  const menu = `Menu Principal\n
  1 - Salvar um usuário\n
  2 - Exibir informações de repositórios públicos\n
  3 - Imprimir usuários\n
  4 - Exibir total de repositórios públicos\n
  5 - Top 5 usuários com maior número de repositórios públicos\n
  6 - Encerrar`;
  let option: string = "";

  while (option !== "6") {
    option = prompt(menu);

    switch (option) {
      case "1":
        await saveUser();
        break;
      case "2":
        await showInformationsRepos();
        break;
      case "3":
        imprimeUsers();
        break;
      case "4":
        sumPublicRepos();
        break;
      case "5":
        topFiveUsers();
        break;
      case "6":
        alert("Encerrando...");
        break;
      default:
        alert("Opção inválida!");
        break;
    }
  }
}

iniatializeMenu();
