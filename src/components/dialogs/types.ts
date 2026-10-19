import type { RameEvent } from "@/lib/data/events";
import type { InfoKey } from "@/lib/data/info";
export type DialogRequest =
  | { kind: "event"; event: RameEvent }
  | { kind: "info"; key: InfoKey }
  | { kind: "creator" }
  | { kind: "tickets" };
export type DialogView = DialogRequest | { kind: "tickets-mobile" };
