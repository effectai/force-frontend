import { Client } from "@effectai/effect-js";

const effectClient = reactive(new Client("jungle4"));

export const useEffectClient = () => ({ effectClient })
