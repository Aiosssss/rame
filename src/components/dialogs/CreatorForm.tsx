import { useState } from "react";
import { readDraft, saveDraft } from "@/lib/data/draft";
export function CreatorForm() {
  const [draft, setDraft] = useState(readDraft);
  const [status, setStatus] = useState("");
  return (
    <>
      <h2 id="dialog-title">
        Punya ide seru?
        <br />
        Bikin rame.
      </h2>
      <form
        id="creator-form"
        onSubmit={(event) => {
          event.preventDefault();
          setStatus(saveDraft(draft));
        }}
      >
        <label htmlFor="draft-name">Nama event</label>
        <input
          id="draft-name"
          name="name"
          required
          maxLength={100}
          autoComplete="off"
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
        />
        <label htmlFor="draft-city">Kota</label>
        <input
          id="draft-city"
          name="city"
          required
          maxLength={80}
          autoComplete="address-level2"
          value={draft.city}
          onChange={(event) => setDraft({ ...draft, city: event.target.value })}
        />
        <label htmlFor="draft-description">Ceritakan idemu</label>
        <textarea
          id="draft-description"
          name="description"
          required
          maxLength={2000}
          value={draft.description}
          onChange={(event) =>
            setDraft({ ...draft, description: event.target.value })
          }
        />
        <p className="form-note">Draf disimpan di perangkat ini.</p>
        <button className="dialog-button" type="submit">
          Simpan Draf
        </button>
        <p className="saved-draft" id="draft-status" role="status">
          {status}
        </p>
      </form>
    </>
  );
}
