import { VAJ, VAJTYPES, checkVaj, extractVaj, isVaj } from "./vaj";

test("vaj must have 23 samet type", () => {
  expect(VAJ.filter((item) => item.type == VAJTYPES.samet).length).toBe(23);
});
test("vaj must have 6 mosavet type", () => {
  expect(
    VAJ.filter((item) =>
      [VAJTYPES.lowmosavet, VAJTYPES.highmosavet].includes(item.type)
    ).length
  ).toBe(6);
});
test("total vajs in farsi must be 29", () => {
  expect(VAJ.length).toBe(29);
});
test("ا must be a vaj", () => {
  expect(isVaj("ا")).toBe(true);
});
test("اب must be not be a vaj", () => {
  expect(isVaj("اب")).toBe(false);
});
test("check vaj for ا ", () => {
  const vajcheck = checkVaj("ا");
  expect(vajcheck).toEqual(expect.any(Object));
  expect(vajcheck.type).toEqual(VAJTYPES.highmosavet);
  expect(vajcheck.char).toEqual(expect.any(String));
});
test("check vaj test for ض ", () => {
  const vajcheck = checkVaj("ض");
  expect(vajcheck).toEqual(expect.any(Object));
  expect(vajcheck.type).toEqual(VAJTYPES.samet);
  expect(vajcheck.char).toEqual(expect.any(Array));
});
test("check vaj test for اب", () => {
  expect(checkVaj("اب")).toEqual(expect.any(Boolean));
});
test("extract هنرمند vaj extract length must be 9", () => {
  const extract = extractVaj("هُنَرمَند");
  const extract2 = extractVaj("هنرمند");
  expect(extract.length).toEqual(9);
  expect(extract2.length).toEqual(9);
});
