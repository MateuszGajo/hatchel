import { renderHook, waitFor } from "@testing-library/react";
import useIsMounted from "../useIsMounted";

describe("use is mounted hook", () => {
  it("Should change value during react cycle", async () => {
    let {
      result: { current: isMounted },
      unmount,
    } = renderHook(() => useIsMounted());

    expect(isMounted.current).toBe(true);

    unmount();
    await waitFor(() => expect(isMounted.current).toBe(false));
  });
});
