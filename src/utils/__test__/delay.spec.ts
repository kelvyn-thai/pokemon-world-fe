import { faker } from "@faker-js/faker";
import { delay } from "@/utils";

describe("Test delay fnc", () => {
  it("Should delay correctly", async () => {
    const timeStart = new Date().getTime();
    const fakeMS = faker.number.int({ min: 100, max: 4000 });
    await delay(fakeMS);
    expect(new Date().getTime() - timeStart).toBeGreaterThanOrEqual(fakeMS);
  });

  it("Should return a promise", () => {
    const taskDelay = delay(100);
    expect(taskDelay).toBeInstanceOf(Promise);
  });

  it("Should resolve value correctly", async () => {
    const resolveValue = "resolved";
    const resolved = await delay(500).then(() => resolveValue);
    expect(resolved).toBe(resolveValue);
  });
});
