import { UserRepository } from "../data/repository/UserRepository";

async function initRepositories() {
  await UserRepository.init();
}

export default initRepositories;
