import { CreateCause } from "@app/use-cases/cause/create-cause";
import { GetAllCauses } from "@app/use-cases/cause/get-all-causes";
import { CauseController } from "./cause-controllers";
import { GetCausesByUserId } from "@app/use-cases/cause/get-causes-by-userid";
import { PrismaCauseRepositories } from "@infra/database/prisma/prisma-cause-repositories";
import { GetCauseById } from "@app/use-cases/cause/get-cause-by-id";
import { UpdateCause } from "@app/use-cases/cause/update-cause";
import { DeleteCause } from "@app/use-cases/cause/delete-cause";

// Testar com os repositories originais, sem implementação de nada
const repositories = new PrismaCauseRepositories()

const createCause = new CreateCause(repositories);
const getCauses = new GetCausesByUserId(repositories);
const allCauses = new GetAllCauses(repositories);
const causeById = new GetCauseById(repositories);
const updateCause = new UpdateCause(repositories);
const deleteCause = new DeleteCause(repositories);

const causeController = new CauseController(
  createCause,
  getCauses,
  allCauses,
  causeById,
  updateCause,
  deleteCause,
);

export {
  causeController,
  createCause,
  getCauses,
  allCauses,
  causeById,
  deleteCause,
}