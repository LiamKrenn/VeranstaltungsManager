import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {
    return {
      event_id: params.id
    };
}) satisfies PageServerLoad;