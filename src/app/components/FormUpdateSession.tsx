"use client";

import { readSessionAction } from "@/utils/session/crud/session-read-action";
import {
  updateSessionAction,
  UpdateSessionActionState,
} from "@/utils/session/crud/session-update-action";
import { useActionState, useEffect, useState } from "react";

const initialState: UpdateSessionActionState = { status: "idle" };

export const FormUpdateSession = () => {
  const [state, action, isPending] = useActionState(
    updateSessionAction,
    initialState
  );

  const [country, setCountry] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState<{
    status: "success";
    data: Record<string, string>;
  }>();

  useEffect(() => {
    const sessionData = async () => {
      const sessionData = await readSessionAction();

      if (sessionData.status === "success" && "data" in sessionData) {
        setDefaultValue(sessionData);

        if (sessionData.data.country) setCountry(sessionData.data.country);
      }
    };

    sessionData();
  }, [state]);

  console.log("Default value:", defaultValue);

  return (
    <form
      action={action}
      className="flex flex-col items-center gap-3 w-full max-w-xs border border-gray-800 rounded-md p-4"
    >
      <p className="text-lg font-semibold">Update session</p>

      <input
        type="text"
        name="username"
        placeholder="Username (optional)"
        className="border border-gray-800 rounded-md p-2 w-full"
        pattern="^[a-zA-Z0-9_]{3,16}$"
        disabled={isPending}
        defaultValue={defaultValue?.data.username || ""}
      />

      <input
        type="number"
        name="age"
        placeholder="Age (optional)"
        min={18}
        max={100}
        className="border border-gray-800 rounded-md p-2 w-full"
        disabled={isPending}
        defaultValue={defaultValue?.data.age || ""}
      />

      {/* Country */}
      <select
        name="country"
        id="country"
        className="border border-gray-800 rounded-md p-2 mb-4 w-full disabled:opacity-80"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        disabled={isPending}
      >
        <option value="">{`Select a country (optional)`}</option>
        <option value="Belgium">Belgium</option>
        <option value="Netherlands">Netherlands</option>
        <option value="Finland">Finland</option>
        {/* Add more countries as needed */}
      </select>

      {/* Preferences checkboxes group */}
      <div className="flex flex-col mb-4 w-full">
        <label className="mb-2 font-medium">Preferences:</label>
        <div className="flex flex-col space-y-2">
          <label>
            <input
              type="checkbox"
              name="preferences"
              value="newsletters"
              className="mr-2"
              disabled={isPending}
              defaultChecked={defaultValue?.data.preferences?.includes(
                "newsletters"
              )}
            />
            Newsletters
          </label>
          <label>
            <input
              type="checkbox"
              name="preferences"
              value="updates"
              className="mr-2"
              disabled={isPending}
              defaultChecked={defaultValue?.data.preferences?.includes(
                "updates"
              )}
            />
            Product Updates
          </label>
          <label>
            <input
              type="checkbox"
              name="preferences"
              value="offers"
              className="mr-2"
              disabled={isPending}
              defaultChecked={defaultValue?.data.preferences?.includes(
                "offers"
              )}
            />
            Special Offers
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-gray-800 px-4 py-2 text-white disabled:opacity-60 w-full"
      >
        {isPending ? "Updating..." : "Update"}
      </button>

      {state.status === "success" && <p className="text-green-700">Updated.</p>}
      {state.status === "error" && (
        <p className="text-red-700">{state.message}</p>
      )}
    </form>
  );
};
