import { persisted } from "svelte-persisted-store";

export const loggedInUser = persisted<string | null>("loggedInUser", null);
