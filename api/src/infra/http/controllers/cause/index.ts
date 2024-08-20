import { CreateCause } from "@app/use-cases/cause/create-cause";
import { GetAllCauses } from "@app/use-cases/cause/get-all-causes";
import { CauseController } from "./cause-controllers";
import { PrismaCauseRepositories } from "@infra/database/prisma/prisma-cause-repositories";
import { GetCauseById } from "@app/use-cases/cause/get-cause-by-id";
import { UpdateCause } from "@app/use-cases/cause/update-cause";
import { DeleteCause } from "@app/use-cases/cause/delete-cause";
import { PublishCause } from "@app/use-cases/cause/publish-cause";
import { UnPublishCause } from "@app/use-cases/cause/unpublish-cause";

// Testar com os repositories originais, sem implementação de nada
const repositories = new PrismaCauseRepositories()

const createCause = new CreateCause(repositories);
const allCauses = new GetAllCauses(repositories);
const causeById = new GetCauseById(repositories);
const updateCause = new UpdateCause(repositories);
const deleteCause = new DeleteCause(repositories);
const publishCause = new PublishCause(repositories);
const unPublishCause = new UnPublishCause(repositories);

const causeController = new CauseController(
  createCause,
  allCauses,
  causeById,
  updateCause,
  deleteCause,
  publishCause,
  unPublishCause,
);

export {
  causeController,
  createCause,
  allCauses,
  causeById,
  deleteCause,
  publishCause,
  unPublishCause,
}