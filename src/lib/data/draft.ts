export interface EventDraft {
  name: string;
  city: string;
  description: string;
}
const emptyDraft: EventDraft = { name: "", city: "", description: "" };
export function readDraft(): EventDraft {
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem("rame-event-draft") || "null",
    );
    if (!saved || typeof saved !== "object") return { ...emptyDraft };
    const draft = saved as Record<string, unknown>;
    return {
      name: typeof draft.name === "string" ? draft.name : "",
      city: typeof draft.city === "string" ? draft.city : "",
      description:
        typeof draft.description === "string" ? draft.description : "",
    };
  } catch {
    return { ...emptyDraft };
  }
}
export function saveDraft(draft: EventDraft) {
  try {
    localStorage.setItem("rame-event-draft", JSON.stringify(draft));
    return "Draf event berhasil disimpan.";
  } catch {
    return "Browser tidak mengizinkan penyimpanan. Salin idemu sebelum menutup.";
  }
}
