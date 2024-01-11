import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async function load({
  params
}) {
  let projectId = parseInt(params.projectId);

  if (isNaN(projectId)) {
    throw redirect(307, '/');
  }

  return {
    projectId
  }
}